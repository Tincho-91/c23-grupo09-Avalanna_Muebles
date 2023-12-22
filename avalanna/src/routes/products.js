const express = require('express');
const router = express.Router();
const productController = require("../controllers/productsController")


/* GET home page. */

router.get('/detail/:id', productController.detail);
router.get('/formCreate', productController.formulario)
router.get('/productCart', productController.cart)
router.get('/formEdit', productController.edform)

router.get('/dashboard', productController.dashboard)

router.post('/formCreate', productController.store)

module.exports = router;
