const {setJson,getJson} = require("../utility/jsonMethod");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

const usersController = {
    login: (req, res) => {
        res.render('users/login', { title: 'avalanna' });
      },
      
      processlogin: (req, res) => {
        const {email} = req.body;
        const users = getJson("users");
        const user = users.find(usuario => usuario.email == email);
        if(user){
          req.session.user = user;
          res.cookie('userEmail',user.email,{maxAge: 1000 * 60 * 15 });
          res.cookie('rememberMe',"true", {maxAge: 1000 * 60 * 15 });
          res.redirect('/');
        }else{
          res.render("/users/login",{error:"No se encontro el usuario", title:"avalanna"});
        }
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
          password: bcrypt.hashSync(password1,10),
          rol: rol ? rol : "user"
        }
        console.log(user);
        users.push(user);
        setJson(users,"users");
        res.redirect('/users/ingresar');
      }
  },
}


module.exports = usersController;