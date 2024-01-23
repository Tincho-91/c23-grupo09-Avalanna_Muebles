var express = require('express');
var router = express.Router();
const {login,register,createUser,processlogin,update,edform} = require("../controllers/usersController");
const sessionValidate = require("../middlewares/sessionValidate");
const loginValidator = require("../validations/loginValidator");
const registerValidator = require("../validations/registerValidator");
const upload = require('../validations/uploadUser');


/* GET users listing. */

router.get('/ingresar', login)
router.post('/ingresar', loginValidator,processlogin)

router.get('/registrarme', register)
router.post('/registrarme', registerValidator, createUser)

router.get('/editar/:id',sessionValidate, edform)
router.put('/editar/:id',upload.single('image'), update)

module.exports = router;
