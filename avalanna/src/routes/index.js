const express = require('express');
const router = express.Router();
const indexController = require("../controllers/indexController")


/* GET home page. */
router.get('/', indexController.home)
router.get("/nosotros",indexController.nosotros)

module.exports = router;
