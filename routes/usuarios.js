//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioControlller')

const {check} = require('express-validator');
//crear usuario
router.post('/',
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email','Agrega un email válido').isEmail(),
        check('password','El password debe ser mínimo de 6 caracteres').isLength({min:6})
    ],
    usuarioController.crearUsuario
);

module.exports = router;