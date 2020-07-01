const mongoose = require('mongoose');

const RestaurantSchema = mongoose.Schema({
    nombre:{
        type: String,
        require:true,
        trim : true
    },
    descripcion:{
        type: String,
        require:true,
        trim : true
    },
    logo:{
        type: String,
        require:true,
        trim : true
    },
    activo:{
       type : Boolean,
       default:true
    },
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Usuario' 
    },
    created_at:{
        type: Date,
        default : Date.now()
    },
});
module.exports = mongoose.model('Restaurant',RestaurantSchema);
