//Rutas para crear restaurant
const express = require('express');
const router = express.Router();
const Restaurant = require('../controllers/restaurantController')
const {check} = require('express-validator');
const auth = require('../middleware/auth');

router.get('/',auth,
    Restaurant.obtenerRestaurantes
);
router.post('/',auth,
    [
        check('nombre','El nombre del producto es obligatorio').not().isEmpty()
    ],
    Restaurant.crearRestaurant
);
router.put('/:id',auth,
    [
        check('nombre','El nombre del restaurant es obligatorio').not().isEmpty()
    ],
    Restaurant.editarRestaurant
);
module.exports = router;