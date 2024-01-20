var express = require('express');
const userController = require('../controllers/usersController');
var router = express.Router();
const {check} = require('express-validator');

/* GET users listing. */
router.get('/ingresar', userController.login);
router.get('/registrarme', userController.register);
router.get('/login', userController.login);

router.post('/login', [
    check('usuario').isEmail().withMessage('Usuario invalido'),
    check('contraseña').isLength({min:8}).withMessage('Contraseña incorrecta')
], userController.login);

module.exports = router;
