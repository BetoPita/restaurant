const express = require("express");
const router = express.Router();
const {check} = require('express-validator');
const auth = require('../middleware/auth');
const uploadController = require("../controllers/imgProductsController");

router.post(
    "/multiple-upload",auth,
    uploadController.uploadImages,
    uploadController.resizeImages,
    uploadController.getResult
);


module.exports = router;