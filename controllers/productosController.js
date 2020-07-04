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
        console.log(req.body);
        //Guardar el creador
        //producto.userId = req.usuario.id;
        //Guardamos el producto
        producto.save();
        res.json(producto);
    } catch (error) {
        console.log(error);
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
exports.updateProducto = async(req,res)=>{
    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }
    try {
        //const {nombre,descripcion,cantidad,cantidad_minima,categoriaId} = req.body;
        const {nombre,precio,descripcion} = req.body;
        const nuevoProducto = {
            nombre,
            precio,
            descripcion,
            // categoriaId
        }
        //Validar que existe producto
        const producto = await Productos.findById(req.params.id);
        if(!producto){
            return res.status(400).send({msg:"El producto que quieres editar no existe"});
        }
        //Validar sea el producto del usuario que lo creó
        // if(producto.userId.toString()!==req.usuario.id){
        //     return res.status(401).send({msg:"El producto no pertenece al usuario"});
        // }
        const producto_update = await Productos.findByIdAndUpdate({_id:req.params.id},{$set:nuevoProducto},{new:true})
       
        res.json({producto_update});
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}
exports.deleteProducto = async(req,res)=>{
     try {
         //Validar que existe producto
         const producto = await Productos.findById(req.params.id);
         if(!producto){
             return res.status(400).send({msg:"El producto que quieres eliminar no existe"});
         }
         //Validar sea el producto del usuario que lo creó
        //  if(producto.userId.toString()!==req.usuario.id){
        //      return res.status(401).send({msg:"El producto no pertenece al usuario"});
        //  }
         await Productos.findByIdAndRemove({_id:req.params.id});
        
         res.json({msg:'Producto eliminado correctamente'});
     } catch (error) {
         console.log(error);
         return res.status(500).send({msg:error})
     }
}
