var express = require('express');
const upload = require('../validations/uploadUser');
var router = express.Router();
const {login,register,createUser,processlogin} = require("../controllers/usersController");
const loginValidator = require("../validations/loginValidator");
const registerValidator = require("../validations/registerValidator");


/* GET users listing. */

router.get('/ingresar', login)
router.post('/ingresar',loginValidator,processlogin)

router.get('/registrarme', register)
router.post('/registrarme', registerValidator, createUser)

router.get('/editar/:id', userController.edform)
router.put('/editar/:id',upload.single('image'), userController.update)

module.exports = router;
