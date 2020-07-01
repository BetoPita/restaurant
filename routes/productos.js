//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const Producto = require('../controllers/productosController')
const {check} = require('express-validator');
const auth = require('../middleware/auth');
//crear usuario
router.post('/',auth,
    [
        check('nombre','El nombre del producto es obligatorio').not().isEmpty(),
        check('descripcion','La descripción del producto obligatoria').not().isEmpty(),
        check('cantidad','La cantidad del producto obligatoria').not().isEmpty().isNumeric(),
        check('cantidad_minima','La cantidad del producto obligatoria').not().isEmpty().isNumeric(),
        check('categoriaId','La categoría es obligatoria').not().isEmpty()
        

    ],
    Producto.crearProducto
);

module.exports = router;