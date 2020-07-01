//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const Categoria = require('../controllers/categoriaController')
const {check} = require('express-validator');
const auth = require('../middleware/auth');
//crear usuario
router.post('/',auth,
    [
        check('nombre','El nombre de la categoría es obligatorio').not().isEmpty()
    ],
    Categoria.crearCategoria
);
router.put('/:id',auth,
    [
        check('nombre','El nombre de la categoría es obligatorio').not().isEmpty()
    ],
    Categoria.actualizarCategoria
);
router.delete('/:id',auth,
    Categoria.eliminarCategoria
);
router.get('/',auth,
    Categoria.obtenerCategorias
);
module.exports = router;