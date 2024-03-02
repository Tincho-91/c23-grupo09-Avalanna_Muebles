
const {body} = require('express-validator');
<<<<<<< HEAD
//const { sequelize } = require('../database/models');
//const db =require("../database/models");
//const {op}=require(sequelize);
=======
>>>>>>> 94a577553e16938b5d17acdda5054ba74d8bee83

module.exports = [
    body('nameAndSurname').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isLength({min:3,max:50}).withMessage('El valor ingresado debe tener al menos 3 caracteres y maximo 30').bail(),

    body('email').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isEmail().withMessage("Debe ser un correo con formato válido").bail(),
    
    
    body('phoneNumber').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isInt().withMessage("El valor ingresado debe ser un número").bail()
    .isLength({min:8,max:12}).withMessage('El valor ingresado debe tener al menos 8 caracteres y maximo 12').bail(),

    body("age").isInt().withMessage(`Debe escribir una edad en números`),

    body("birthday").notEmpty().withMessage("El campo no puede estar vacío").bail(),
   
   
];
