const {body} = require('express-validator');

module.exports = [
    body('country').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isLength({min:3,max:50}).withMessage('El valor ingresado debe tener un mínimo de 3 carácteres y un máximo 30').bail(),
    
    body('province').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isLength({min:3,max:50}).withMessage('El valor ingresado debe tener un mínimo de 3 carácteres y un máximo 50').bail(),

    body('locality').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isLength({min:3,max:50}).withMessage('El valor ingresado debe tener un mínimo de 3 carácteres y un máximo 50').bail(),
    
    body('streetName').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isLength({min:3,max:50}).withMessage('El valor ingresado debe tener un mínimo de 3 carácteres y un máximo 50').bail(),
    
    body('number').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isInt().withMessage("El valor ingresado debe ser un número").bail(),

    body('postalCode').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isInt().withMessage("El valor ingresado debe ser un número").bail()
    .isLength({min:4}).withMessage('El valor ingresado debe tener al menos 8 caracteres y maximo 12').bail(),

    
];