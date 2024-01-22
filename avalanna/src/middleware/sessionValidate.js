const {getJson} = require("../utility/jsonMethod");

const sessionValidate = (req,res,next) =>{
    
    if (req.cookies.rememberMe && req.cookies.userEmail){
            const users = getJson("users");
            let user = users.find(elemento => elemento.email == req.cookies.userEmail);
            req.session.user = user;
        }
        next();
    }

module.exports = sessionValidate;