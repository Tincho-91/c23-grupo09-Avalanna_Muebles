const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const productController = require("../controllers/productsController");
const sessionValidate = require("../middlewares/sessionValidate");

const adminValidation = require("../middlewares/adminValidation");

const createProductValidator = require("../validations/createProductsValidator");
const uploadImage = require("../validations/uploadProduct");


/* GET home page. */
router.get('/', productController.products);

router.get('/detail/:id', productController.detail);

router.get('/section/:category', productController.categories);

router.get('/formCreate', adminValidation, productController.formulario)
router.post('/formCreate',uploadImage.single("image"), createProductValidator, productController.store)

router.get('/productCart', sessionValidate, productController.cart)

router.get('/formEdit/:id',adminValidation, productController.edform)
router.put('/formEdit/:id',uploadImage.single("image"), createProductValidator, productController.processUpdate)

router.get('/dashboard',adminValidation, productController.dashboard)


router.delete('/delete/:id', productController.destroy)

module.exports = router;
