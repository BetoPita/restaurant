//Rutas para iniciar sesión
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController')
//Iniciar sesión
router.post('/',
    [
        check('email','Agrega un email válido').isEmail(),
        check('password','El password debe ser mínimo de 6 caracteres').isLength({min:6})
    ],
    authController.autentificarUsuario
);

module.exports = router;