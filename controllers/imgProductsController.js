//ref https://bezkoder.com/node-js-upload-resize-multiple-images/
const multer = require("multer");
const sharp = require("sharp");
const ImagenesProductos = require('../models/ImagenesProductos');
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    return res.status(400).send({msg:"Sólamente se pueden ingresar imagenes"});
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

const uploadFiles = upload.array("images", 5);

const uploadImages = (req, res, next) => {
  //if (!req.files) return res.status(400).send({msg:"Es necesario ingresar la imagen"});
  uploadFiles(req, res, err => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).send({msg:"Sólamente se pueden subir 5 imagenes"});
      }
    } else if (err) {
      return res.status(400).send({msg:error})
    }
    next();
  });
};

const resizeImages = async (req, res, next) => {
  if (!req.files) return next();

  req.body.images = [];
  await Promise.all(
    req.files.map(async file => {
      const filename = file.originalname.replace(/\..+$/, "");
      const newFilename = `sohex-${filename}-${Date.now()}.jpeg`;

      await sharp(file.buffer)
        //.resize(640, 320)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`upload/products/${newFilename}`);
      req.body.images.push(newFilename);
    })
  );

  next();
};

const getResult = async (req, res) => {
  
  if (!req.body.images) {
    return res.status(400).send({msg:"Debes ingresar por lo menos una imagen"});
  }
  
  const productId = req.params.id;
  
  //req.body.images.forEach(saveImageDb);
  // const images = req.body.images
  //   .map(image => "" + image + "")
  //   .join("");
  req.body.images.forEach( function(valor) {
    const newImageProduct = {
      imagen:valor,
      productoId:req.params.id,
      userId : req.usuario.id
    }
    const imagenes_productos = new ImagenesProductos(newImageProduct);
    imagenes_productos.save();
});
  
  return res.status(200).send({msg:"Imagenes subidas con éxito",images:req.body.images});
};

module.exports = {
  uploadImages: uploadImages,
  resizeImages: resizeImages,
  getResult: getResult
};