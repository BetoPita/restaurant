const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require ('express-validator'); 
const jwt = require('jsonwebtoken')

exports.autentificarUsuario = async(req,res) =>{
    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }
    //Extraer email y pass
    const {email,password} = req.body;
    try {
        //Revisar usuario registrado
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({msg:'El usuario no existe'});
        }
        //Revisar pass
        const passCorrecto = await bcryptjs.compare(password,usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg:'El password es incorrecto'});
        }
        //Si todo es correcto crear JWT
        const payload = {
            usuario:{
                id: usuario.id
            }
        }
        //firmar el token
        jwt.sign(payload,process.env.SECRETA,{
            expiresIn: 3600
        },(error,token) => {
            if(error) throw error;
            res.json({token});
        })

    } catch (error) {
        res.status(400).send('Hubo un error');
    }
}
