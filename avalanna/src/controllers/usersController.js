const {setJson,getJson} = require("../utility/jsonMethod");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

const userController = {
    login: (req,res)=>{
        res.render("users/login", {title:"Ingresar"});
    },
    processlogin: (req, res) => {
    },
    register: (req, res) => {
        res.render('./users/register', { title: 'avalanna' });

      },
      createUser: (req, res) => {
        const errores = validationResult(req);
        console.log("errores:", errores);
        console.log("body:",req.body);

        if(!errores.isEmpty()){
          console.log("ingrese en errores");
          res.render("./users/register",{errores:errores.mapped(),old:req.body,title:"registro"})
        }
        else{ 
        const users = getJson("users");
        const {name,surname,email,phoneNumber,password1} = req.body;
        const id = uuidv4();
        const user = {
          id,
          name: name,
          surname:surname,
          email:email,
          phoneNumber:phoneNumber,
          password: bcrypt.hashSync(password1,10)
        }
        console.log(user);
        users.push(user);
        setJson(users,"users");
        res.redirect('/users/ingresar');
      }
  },
}


module.exports = usersController;