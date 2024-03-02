var express = require('express');
var router = express.Router();
const {login,register,createUser,processlogin,update,edform, logout, dashboard, destroy} = require("../controllers/usersController");
const sessionValidate = require("../middlewares/sessionValidate");
const adminValidation = require("../middlewares/adminValidation");
const authValidate = require("../middlewares/authValidate");
const loginValidator = require("../validations/loginValidator");
const registerValidator = require("../validations/registerValidator");
const editUserValidator = require("../validations/editUserValidator");
const upload = require('../validations/uploadUser');




/* GET users listing. */

router.get('/ingresar', authValidate, login)
router.post('/ingresar',processlogin)

router.get('/registrarme', register)
router.post('/registrarme',  createUser)

//router.get('/editar/:id',sessionValidate, edform)
router.put('/editar/:id',upload.single('image'), editUserValidator, update)

router.get("/logout", logout);

//router.delete("/delete/:id", destroy)

//router.get('/dashboard',  dashboard)

module.exports = router;
