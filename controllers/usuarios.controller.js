const bd = require("../config/bd");

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
    
    bd.query('INSERT INTO usuarios(nombre,apellido,correo,contrasenia, tipo_usuario) VALUES (?,?,?,?,2)', [nombre, apellido, correo, contrasenia], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: err.message });
        }
        
        res.json({
            id: result.insertId,
            nombre,
            apellido,
            correo,
            contrasenia
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

        if (result[0].contrasenia !== contrasenia) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        res.json(result[0]);
    });
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    login
};
