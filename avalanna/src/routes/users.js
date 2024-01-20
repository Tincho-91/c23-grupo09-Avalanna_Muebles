const express = require('express');
const router = express.Router();
const {login,register,createUser,processlogin} = require("../controllers/usersController");
const loginValidator = require("../validations/loginValidator");
const registerValidator = require("../validations/registerValidator");


/* GET users listing. */

router.get('/ingresar', login)
router.post('/ingresar',loginValidator,processlogin)

router.get('/registrarme', register)
router.post('/registrarme', registerValidator, createUser)

module.exports = router;
