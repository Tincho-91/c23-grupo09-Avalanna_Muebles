const {body} = require('express-validator');
const {getJson} = require("../utility/jsonMethod");
const bcrypt = require('bcryptjs');
const users= getJson('users.json')

module.exports = [
    body('email').notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isEmail().withMessage('El valor ingresado debe tener el formato de un correo electrónico').bail()
    .custom(value => { 
        const user = users.find(elemento => elemento.email == value);
        return user ? true : false
    }).withMessage("El usuario no existe"),
    body("password1").notEmpty().withMessage("El campo no puede estar vacío").bail()
    .custom((value,{req})=>{
        const user = users.find(elemento => elemento.email == req.body.email)
        return bcrypt.compareSync(value, user.password);
    }).withMessage("La contraseña no es correcta")
]