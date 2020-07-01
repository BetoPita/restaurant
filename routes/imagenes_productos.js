const express = require('express');
const router = express.Router();

var fs = require('fs')
var path = require('path')
const auth = require('../middleware/auth');

var multer = require('multer')({
    dest: 'public/uploads/products'
  })

router.post('/', [auth,multer.single('attachment')], function (req, res) {
    if (!req.file) {
        res.status(400).send({msg:"Ingrese una imagen",error:true});
    } else {
        if (!req.file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            res.status(200).send({msg:"Formato de imagen no permitido:",error:true});
            
        }else{
            const{fileName} = storeWithOriginalName(req.file)
            res.status(200).send({msg:"Imagen guardada correctamente:",path:fileName,error:false});
        }
       
    }
})


function storeWithOriginalName (file) {
    const imagenType = file.mimetype.split('/');
    const extension = imagenType[imagenType.length-1];
    //var fullNewPath = path.join(file.destination, file.originalname)
    var fullNewPath = path.join(file.destination, file.filename+'.'+extension);
    fs.renameSync(file.path, fullNewPath)
    
    return {
        fileName: fullNewPath
    }
}
module.exports = router;