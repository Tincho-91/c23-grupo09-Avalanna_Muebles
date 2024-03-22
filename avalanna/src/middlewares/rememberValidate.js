const {getJson} = require("../utility/jsonMethod");
const db = require("../database/models")

const rememberValidate = (req,res,next) =>{
    
    if (req.cookies.rememberMe && req.cookies.user){
           // const users = getJson("users.json");
           // let user = users.find(elemento => elemento.email == req.cookies.userEmail);
           // req.session.user = user;
        req.session.user = req.cookies.user
        }
            next(); 
    }

module.exports = rememberValidate;