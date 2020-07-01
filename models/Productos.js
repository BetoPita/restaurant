const mongoose = require('mongoose');
const { text } = require('express');

const ProductosSchema = mongoose.Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    descripcion:{
        type:String,
        require:false,
        trim:true
    },
    cantidad:{
        type:Number,
        require:true,
        trim:true
    },
    cantidad_minima:{
        type:Number,
        require:true,
        trim:true
    },
    categoriaId:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Categorias' 
    },
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Usuario' 
    },
    created_at:{
        type:Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Productos',ProductosSchema);