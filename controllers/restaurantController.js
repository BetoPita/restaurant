const Restaurant = require('../models/Restaurant');
const {validationResult}  = require('express-validator');

exports.crearRestaurant = async(req,res) => {
    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }
    const restaurant = new Restaurant(req.body);
    restaurant.userId = req.usuario.id;
    restaurant.save();
    res.status(200).send({msg:"restaurant guardado correctamente"})
    try {
        
    } catch (error) {
        res.status(500).send('Hubo un error'+error);
    }
}
exports.editarRestaurant = async(req,res) => {
    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }
    const {nombre,descripcion,activo} = req.body;
    const newRestaurant = {};
    if(nombre){
        newRestaurant.nombre = nombre;
    }
    if(descripcion){
        newRestaurant.descripcion = descripcion;
    }
    if(activo){
        newRestaurant.activo = activo;
    }
    try {
        //Validar que exista el restaurant
        const restaurant = await Restaurant.findById(req.params.id);
        
        if(!restaurant){
            return res.status(404).json({msg:'Restaurant no encontrado'});
        }
        //Validar que sea el dueño del restaurant
        
        if(restaurant.userId.toString() !== req.usuario.id){
            return res.status(404).json({msg:'No puedes actualizar por que el restaurant no te pertenece'});
        }
        //actualizar
        restaurant = await Restaurant.findByIdAndUpdate({_id:req.params.id},{$set:newRestaurant},{new:true});
        res.status(200).send({msg:"Restaurante actualizado correctamente"});
    } catch (error) {
        res.status(500).send('Hubo un error'+error);
    }
}
//Obtiene todas las categorías

exports.obtenerRestaurantes = async(req,res) =>{
    try {
        const restaurantes = await Restaurant.find();
        res.json({restaurantes});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}