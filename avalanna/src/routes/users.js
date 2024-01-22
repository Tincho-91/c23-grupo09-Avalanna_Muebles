var express = require('express');
const userController = require('../controllers/usersController');
const upload = require('../validations/uploadUser');
var router = express.Router();

/* GET users listing. */
router.get('/ingresar', userController.login);
router.get('/registrarme', userController.register);

router.get('/editar/:id', userController.edform)
router.put('/editar/:id',upload.single('image'), userController.update)

module.exports = router;
