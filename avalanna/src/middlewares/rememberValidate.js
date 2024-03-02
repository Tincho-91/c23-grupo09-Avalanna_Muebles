const {getJson} = require("../utility/jsonMethod");
const db = require("../database/models")

const rememberValidate = (req,res,next) =>{
    console.log("Estas son las cookies",req.cookies)
    if (req.cookies.rememberMe && req.cookies.userEmail){
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
        }
    }

module.exports = rememberValidate;