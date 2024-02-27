/*
const {body} = require('express-validator');
const {getJson} = require("../utility/jsonMethod");
const users= getJson('users.json')

module.exports = [
    body('NameAndSurname').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isLength({min:3,max:50}).withMessage('El valor ingresado debe tener al menos 3 caracteres y maximo 30').bail(),
    
    body('phoneNumber').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isInt().withMessage("El valor ingresado debe ser un número").bail()
    .isLength({min:8,max:12}).withMessage('El valor ingresado debe tener al menos 8 caracteres y maximo 12').bail(),
    body('email').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isEmail().withMessage("Debe ser un correo con formato válido").bail()
    .custom(value => { 
        console.log("value:",value);
        const user = users.find(elemento => elemento.email == value);
        return user ? false : true
    }).withMessage("El usuario ya existe, utilice otro correo electronico"),
    body("password1").notEmpty().withMessage("El campo no puede estar vacío").bail()
    .custom((value,{req})=>{
        console.log("value-password",value);
        console.log("value2",req.body.password2);
        return value == req.body.password2;   
    }).withMessage("Las contraseñas no coinciden")
];
*/