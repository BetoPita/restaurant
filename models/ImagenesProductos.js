const mongoose = require('mongoose');
const { text } = require('express');

const ImagenesProductosSchema = mongoose.Schema({
    imagen:{
        type:String,
        require:true,
        trim:true
    },
    productoId:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Producto' 
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

module.exports = mongoose.model('ImagenesProductos',ImagenesProductosSchema);