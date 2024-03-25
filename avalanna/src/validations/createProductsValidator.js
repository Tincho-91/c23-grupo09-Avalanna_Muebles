
const {body} = require('express-validator');
const db = require("../database/models")

module.exports = [
    body('name').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isLength({min:3,max:50}).withMessage('El valor ingresado debe tener un mínimo de 3 caracteres y un máximo de 30').bail(),
    
    body('price').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isInt().withMessage("El valor ingresado debe ser un número entero").bail(),
    body('discount').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isInt().withMessage("El valor ingresado debe ser un número entero").bail(),

    body('description').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isLength({min:10,max:50}).withMessage('El valor ingresado debe tener un mínimo de 10 caracteres y un máximo de 250').bail(),

    body('extraDescription').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isLength({min:10,max:50}).withMessage('El valor ingresado debe tener un mínimo de 10 caracteres y un máximo de 250').bail(),

    body('categoryId').notEmpty().withMessage('Debe seleccionar una de las opciones').bail(),

    body('height').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isLength({min:1,max:10}).withMessage('El valor ingresado debe tener un mínimo de 1 caracter y un máximo de 10').bail(),

    body('width').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isLength({min:1,max:10}).withMessage('El valor ingresado debe tener un mínimo de 1 caracter y un máximo de 10').bail(),

    body('depth').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isLength({min:1,max:10}).withMessage('El valor ingresado debe tener un mínimo de 1 caracter y un máximo de 10').bail(),
    
];
