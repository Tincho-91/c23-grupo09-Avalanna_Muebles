const express = require('express');
const router = express.Router();
const productsController = require("../../controllers/api/productsController")

router.put("/formEdit/:id", productsController.update);

module.exports = router;