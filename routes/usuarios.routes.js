const express = require('express');
const router = express.Router();
const userController = require('../controllers/usuarios.controller.js');


router.get('/users', userController.getUsers); //* Solicitar la informacion de todos los usuarios

router.get("/users/:id", userController.getUser); //* Solicitar datos de un solo usuario

router.post("/users", userController.createUser); //* Crear un usuario

router.put("/users/:id", userController.updateUser); //* Actualizar un usuario

router.delete("/users/:id", userController.deleteUser); //* Eliminar un usuario

router.post('/signup', userController.signup); //*  Corroborrar que el correo no exista en la BD

router.post("/login", userController.login); //* Validar que el correo y la contraseña coincidan

module.exports = router;
