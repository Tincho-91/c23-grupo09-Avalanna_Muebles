
const {body} = require('express-validator');

module.exports = [
    body('nameAndSurname').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isLength({min:3,max:50}).withMessage('El valor ingresado debe tener al menos 3 caracteres y maximo 30').bail(),

    body('email').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isEmail().withMessage("Debe ser un correo con formato válido").bail(),
    
    
    body('phoneNumber').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isInt().withMessage("El valor ingresado debe ser un número").bail()
    .isLength({min:8,max:12}).withMessage('El valor ingresado debe tener al menos 8 caracteres y maximo 12').bail(),

    body("birthday").notEmpty().withMessage("El campo no puede estar vacío").bail(),
   
    body('image').custom((value, { req }) => {
        if (req.errorValidationImage) {
            return false;
        };
        return true;
    }).withMessage("Debe ingresar un formato de imagen válido")

];
