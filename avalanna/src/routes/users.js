var express = require('express');
const userController = require('../controllers/usersController');
var router = express.Router();
const adminValidation = require("../middlewares/adminValidation");

/* GET users listing. */
router.get('/ingresar', userController.login);
router.get('/registrarme', userController.register);

module.exports = router;
