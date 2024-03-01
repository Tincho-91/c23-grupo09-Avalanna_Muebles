var express = require('express');
var router = express.Router();
const {login,register,createUser,processlogin,update,edform, logout, dashboard, destroy, address, updateAddress, formAddress, registerAddress} = require("../controllers/usersController");
const adminValidation = require("../middlewares/adminValidation");
const sessionValidate = require("../middlewares/sessionValidate");
const authValidate = require("../middlewares/authValidate");
const loginValidator = require("../validations/loginValidator");
const registerValidator = require("../validations/registerValidator");
const editUserValidator = require("../validations/editUserValidator");
const upload = require('../validations/uploadUser');
const addressValidator = require("../validations/addressValidator");




/* GET users listing. */

//router.get('/ingresar', authValidate, login)
//router.post('/ingresar', loginValidator,processlogin)

//router.get('/registrarme', register)
//router.post('/registrarme', registerValidator, createUser)

router.get('/editar/:id', edform)
router.put('/editar/:id',upload.single('image'), editUserValidator, update)

router.get("/editar/:id/address/:address", address)
router.put("/editar/:id/address/:address", addressValidator, updateAddress)

router.get("/editar/:id/registrarDomicilio", formAddress)
router.post("/editar/:id/registrarDomicilio", addressValidator, registerAddress)

//router.get("/logout", logout);

router.delete("/delete/:id", destroy)

router.get('/dashboard',  dashboard)

module.exports = router;
