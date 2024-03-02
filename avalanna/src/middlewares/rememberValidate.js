<<<<<<< HEAD
const db = require("../database/models");
const { op } =require("sequelize");


// const {getJson} = require("../utility/jsonMethod");
=======
const {getJson} = require("../utility/jsonMethod");
const db = require("../database/models")
>>>>>>> 94a577553e16938b5d17acdda5054ba74d8bee83

const rememberValidate = (req,res,next) =>{
    
    if (req.cookies.rememberMe && req.cookies.userEmail){
<<<<<<< HEAD
            // const users = getJson("users.json");
            let user = users.find(elemento => elemento.email == req.cookies.userEmail);
            req.session.user = user;
=======
           // const users = getJson("users.json");
           // let user = users.find(elemento => elemento.email == req.cookies.userEmail);
           // req.session.user = user;
        db.User.findOne({where:{
            email:req.cookies.userEmail
        }}).then(resp=>{
            req.session.user=resp.dataValues
        })
        }else {
            next(); 
>>>>>>> 94a577553e16938b5d17acdda5054ba74d8bee83
        }
    }

module.exports = rememberValidate;