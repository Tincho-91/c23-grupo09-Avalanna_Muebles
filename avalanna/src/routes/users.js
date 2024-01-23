var express = require('express');
const upload = require('../validations/uploadUser');
var router = express.Router();
const {login,register,createUser,processlogin,update,edform} = require("../controllers/usersController");
const loginValidator = require("../validations/loginValidator");
const registerValidator = require("../validations/registerValidator");


/* GET users listing. */

router.get('/ingresar', login)
router.post('/ingresar',loginValidator,processlogin)

router.get('/registrarme', register)
router.post('/registrarme', registerValidator, createUser)

router.get('/editar/:id', edform)
router.put('/editar/:id',upload.single('image'), update)

module.exports = router;
