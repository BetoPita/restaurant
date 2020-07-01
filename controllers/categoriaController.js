const Categoria = require('../models/Categorias')
const {validationResult} = require('express-validator');
exports.crearCategoria = async(req,res) => {
    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }
    try {
        //Crear categoria
        const categoria = new Categoria(req.body);
        //Guardamos el categoria
        categoria.save();
        res.status(200).send({msg:"categoría guardada correctamente"})
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}

//Obtiene todas las categorías

exports.obtenerCategorias = async(req,res) =>{
    try {
        const categorias = await Categoria.find();
        res.json({categorias});
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}

//Actualizar categoría

exports.actualizarCategoria = async(req,res)=>{
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }
    //Extraer información del proyecto
    const {nombre} = req.body;
    const nuevaCategoria = {};
    if(nombre){
        nuevaCategoria.nombre = nombre;
    }

    try {
        //Revisar el ID
        let categoria = await Categoria.findById(req.params.id);
        //Si la categoría existe o no
        if(!categoria){
            return res.status(404).json({msg:'La categoría no existe'});
        }
        
        //actualizar
        categoria_update = await Categoria.findByIdAndUpdate({_id:req.params.id},{$set : nuevaCategoria},{new:true});
        res.json({categoria_update});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}
exports.eliminarCategoria = async(req,res) =>{
    try {   
        //Revisar el ID
        let categoria = await Categoria.findById(req.params.id);
        //Si la categoría existe o no
        if(!categoria){
            return res.status(404).json({msg:'La categoría no existe'});
        }
        
        //eliminar categoría
        await Categoria.findOneAndRemove({_id:req.params.id})
        res.json({msg:'Categoría eliminada'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}