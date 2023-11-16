const bd = require("../config/bd");
const bcrypt = require('bcrypt');

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
    const { nombre, apellido, correo, contrasenia } = req.body;

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

        //* Comparar contrasenias encriptadas
        bcrypt.compare(contrasenia, result[0].contrasenia, (errorComparar, comparar) => {
            if (errorComparar) {
                console.error(errorComparar);
                return res.status(500).json({ message: 'Error al comparar contraseñas' });
            }

            if (!comparar) {
                return res.status(401).json({ message: "Credenciales incorrectas" });
            }

            //? Contraseña válida
            res.json(result[0]);
            console.log(result[0])
        });
    });
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    signup,
    login
};
