const mongoose = require('mongoose');

const CategoriasSchema = mongoose.Schema({
    nombre:{
        type: String,
        require:true,
        trim : true
    },
    activo:{
       type : Boolean,
       default:true
    },
    created_at:{
        type: Date,
        default : Date.now()
    },
});
module.exports = mongoose.model('Categorias',CategoriasSchema);
