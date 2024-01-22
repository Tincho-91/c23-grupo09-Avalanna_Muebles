var express = require('express');
const userController = require('../controllers/usersController');
var router = express.Router();
const adminValidation = require("../middlewares/adminValidation");
const sessionValidate = require("../middlewares/sessionValidate");
const authValidate = require("../middlewares/authValidate");

/* GET users listing. */
router.get('/ingresar', authValidate, userController.login);
router.get('/registrarme', authValidate, userController.register);

router.get("/logout", usersController.logout);

module.exports = router;
