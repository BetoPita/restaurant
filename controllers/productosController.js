const Productos = require('../models/Productos');
const {validationResult} = require('express-validator');
exports.crearProducto = async(req,res) => {
    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }
    try {
        //Crear producto
        const producto = new Productos(req.body);
        //Guardar el creador
        producto.userId = req.usuario.id;
        //Guardamos el producto
        producto.save();
        res.json(producto);
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}
exports.getProductos = async(req,res)=>{
    try {
        const productos = await Productos.find();
        res.status(200).send(productos);
    } catch (error) {
        res.status(500).send(error);
    }
}
