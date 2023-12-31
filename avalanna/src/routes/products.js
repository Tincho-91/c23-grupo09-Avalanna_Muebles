const express = require('express');
const router = express.Router();
const productController = require("../controllers/productsController")


/* GET home page. */

router.get('/detail/:id', productController.detail);
router.get('/formCreate', productController.formulario)
router.get('/productCart', productController.cart)

router.get('/formEdit/:id', productController.edform)
router.put('/formEdit/:id', productController.update)

router.get('/dashboard', productController.dashboard)

module.exports = router;
