const bd = require("../config/bd");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { transporter } = require('../config/nodemailer/mailer.js')

const getUsers = (req, res) => {
    bd.query(`SELECT * FROM usuarios`, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        if (result.length > 0) {
          res.status(200).json(result);
        } else {
          res.status(400).send('Datos no existentes');
        }
      }
    });
};


const getUser = (req, res) => {
    bd.query('SELECT * FROM usuarios WHERE id_usuario = ?', [req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        
        if (result.length === 0) {
            return res.status(404).json({ message: 'Usuario no existente en la base de datos' });
        }
        
        res.json(result[0]);
    });
};


const createUser = (req, res) => {
    const { nombre, apellido, correo, contrasenia, tipo_usuario } = req.body;

    //* Encriptar la contraseña
    bcrypt.hash(contrasenia, 10, (err, hash) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error al encriptar la contraseña' });
        }

        bd.query('INSERT INTO usuarios(nombre, apellido, correo, contrasenia, tipo_usuario) VALUES (?,?,?,?,?)', [nombre, apellido, correo, hash, tipo_usuario], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: err.message });
            }

            res.json({
                id: result.insertId,
                nombre,
                apellido,
                correo,
                tipo_usuario
            });
        });
    });
};

const updateUser = (req, res) => {
    bd.query('UPDATE usuarios SET ? WHERE id_usuario = ?', [req.body, req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: err.message });
        }
        
        res.json(result);
    });
};

const deleteUser = (req, res) => {
    bd.query('DELETE FROM usuarios WHERE id_usuario = ?', [req.params.id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: err.message });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no existente en la base de datos' });
        }
        
        res.sendStatus(204);
    });
};

const signup = (req, res) => {
    const { nombre, apellido, correo, contrasenia } = req.body;

    bd.query('SELECT * FROM usuarios WHERE correo = ?', [correo], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: err.message });
        }

        if (result.length > 0) {
            return res.status(409).json({ message: "El correo ya existe en la base de datos" });
        }

        //* Encriptar la contraseña
        bcrypt.hash(contrasenia, 10, (err, hash) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error al encriptar la contraseña' });
            }

            bd.query('INSERT INTO usuarios(nombre, apellido, correo, contrasenia, tipo_usuario) VALUES (?,?,?,?,2)', [nombre, apellido, correo, hash], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: err.message });
                }

                res.json({
                    id: result.insertId,
                    nombre,
                    apellido,
                    correo
                })
            })
        })
    });
}

const login = (req, res) => {
    const { correo, contrasenia } = req.body;

    bd.query('SELECT * FROM usuarios WHERE correo = ?', [correo], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: err.message });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "El correo no existe en la base de datos" });
        }

        if(result[0].tipo_usuario === 1){
            if (result[0].contrasenia !== contrasenia) {
                return res.status(401).json({ message: "Credenciales incorrectas" });
            }
        } else {
            //* Comparar contrasenias encriptadas
            bcrypt.compare(contrasenia, result[0].contrasenia, (errorComparar, comparar) => {
                if (errorComparar) {
                    console.error(errorComparar);
                    return res.status(500).json({ message: 'Error al comparar contraseñas' });
                }

                if (!comparar) {
                    return res.status(401).json({ message: "Credenciales incorrectas" });
                }

                
            });
        }
        //? Contraseña válida
        res.json(result[0]);
    });
};

//* Recuperar contraseña

const generateResetToken = () => {
    return crypto.randomBytes(20).toString('hex');
  };
  
  const sendResetEmail = (email, token) => {
  
    const resetLink = `http://localhost:3000/reset-password/${token}`;
    const mailOptions = {
        from: 'empleos.jobhub@gmail.com',
        to: email,
        subject: 'Restablecer Contraseña',
        text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${resetLink}`,
    };
    return transporter.sendMail(mailOptions);
  };

  const initiatePasswordReset = async (req, res) => {
    const { email } = req.body;
  
    //? Generar token
    const resetToken = generateResetToken();
  
    //? Establecer la expiración del token
    const resetTokenExpiresAt = new Date();
    resetTokenExpiresAt.setHours(resetTokenExpiresAt.getHours() + 1);
  
    try {
      //? Actualizar la base de datos con el token y su expiración
      await bd.query(
        'UPDATE usuarios SET reset_token = ?, reset_token_expires_at = ? WHERE correo = ?',
        [resetToken, resetTokenExpiresAt, email]
      );
  
      //? Enviar el correo electrónico con el enlace de restablecimiento
      await sendResetEmail(email, resetToken);
  
      res.status(200).json({ message: 'Se ha enviado un enlace de restablecimiento a tu correo electrónico.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al iniciar el restablecimiento de contraseña.' });
    }
  };

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      // Verificar si el token es válido y aún no ha expirado
      const result = await bd.query(
        'SELECT * FROM usuarios WHERE reset_token = ? AND reset_token_expires_at > NOW()',
        [token]
      );
  
      if (result.length === 0) {
        // Si no se encuentra un usuario con ese token o el token ha expirado
        return res.status(400).json({ message: 'El enlace de restablecimiento no es válido o ha expirado.' });
      }
  
      // Actualizar la contraseña del usuario
      await bd.query('UPDATE usuarios SET contrasenia = ? WHERE reset_token = ?', [newPassword, token]);
  
      // Limpiar el token y la fecha de expiración en la base de datos
      await bd.query('UPDATE usuarios SET reset_token = NULL, reset_token_expires_at = NULL WHERE reset_token = ?', [token]);
  
      return res.status(200).json({ message: 'Contraseña restablecida exitosamente.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al restablecer la contraseña.' });
    }
  };
  

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    signup,
    login,
    initiatePasswordReset,
    resetPassword
};
