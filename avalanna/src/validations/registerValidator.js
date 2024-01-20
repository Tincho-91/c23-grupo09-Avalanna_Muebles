const {body} = require('express-validator');
const {getJson} = require("../utility/jsonMethod");
const users= getJson('users')

module.exports = [
    body('name').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isLength({min:3,max:50}).withMessage('El valor ingresado debe tener un mínimo de 3 caracteres y un máximo de 30').bail(),
    
    body('phoneNumber').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isLength({min:8,max:12}).withMessage('El valor ingresado debe tener un mínimo de 8 caracteres y un máximo de 12').bail(),
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
    }).bail()
];