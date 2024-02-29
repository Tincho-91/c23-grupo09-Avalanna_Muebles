const db = require("../database/models");
const { op } =require("sequelize");


// const {getJson} = require("../utility/jsonMethod");

const rememberValidate = (req,res,next) =>{
    console.log("Estas son las cookies",req.cookies)
    if (req.cookies.rememberMe && req.cookies.userEmail){
            // const users = getJson("users.json");
            let user = users.find(elemento => elemento.email == req.cookies.userEmail);
            req.session.user = user;
        }
        next();
    }

module.exports = rememberValidate;