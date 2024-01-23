const {body} = require('express-validator');
const {getJson} = require("../utility/jsonMethod");
const users= getJson('users.json')

module.exports = [
    body('name').notEmpty().withMessage('el campo no puede estar vacio').bail()
    .isLength({min:3,max:50}).withMessage('El valor ingresado debe tener almenos 3 caracteres y maximo 30').bail(),
    
    body('phoneNumber').notEmpty().withMessage('el campo no puede estar vacio').bail()
    .isLength({min:8,max:12}).withMessage('El valor ingresado debe tener almenos 8 caracteres y maximo 12').bail(),
    body('email').notEmpty().withMessage('el campo no puede estar vacio').bail()
    .isEmail().withMessage("debe ser un correo con formato valido").bail()
    .custom(value => { 
        console.log("value:",value);
        const user = users.find(elemento => elemento.email == value);
        return user ? false : true
    }).withMessage("el usuario ya existe,utilice otro correo electronico "),
    body("password1").notEmpty().withMessage("el campo no puede estar vacio").bail()
    .custom((value,{req})=>{
        console.log("value-password",value);
        console.log("value2",req.body.password2);
        return value == req.body.password2;   
    }).withMessage("los password no coinciden")
];