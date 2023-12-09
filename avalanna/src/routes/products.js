const express = require('express');
const router = express.Router();
const productController = require("../controllers/productsController")


/* GET home page. */

router.get('/detail/:id', productController.detail);
router.get('/crear-formulario', productController.formulario)
router.get('/productCart', productController.cart)
router.get('/edform', productController.edform)

module.exports = router;
