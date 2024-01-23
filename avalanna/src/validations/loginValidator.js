const {body} = require('express-validator');
const {getJson} = require("../utility/jsonMethod");
const bcrypt = require('bcryptjs');
const users= getJson('users.json')

module.exports = [
    body('email').notEmpty().withMessage('el campo no puede estar vacio').bail()
    .isEmail().withMessage('El valor ingresado debe tener el formato de un correo electronico').bail()
    .custom(value => { 
        const user = users.find(elemento => elemento.email == value);
        return user ? true : false
    }).withMessage("el usuario no existe"),
    body("password1").notEmpty().withMessage("el campo no puede estar vacio").bail()
    .custom((value,{req})=>{
        const user = users.find(elemento => elemento.email == req.body.email)
        return bcrypt.compareSync(value, user.password);
    }).withMessage("la contraseña no es correcta")
]