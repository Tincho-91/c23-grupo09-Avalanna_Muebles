
const db = require("../database/models");

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

const usersController = {
 /*   login: (req,res)=>{
        res.render("users/login", {title:"Ingresar"});
    },
    processlogin: (req, res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        console.log(errors)
        res.render("users/login",{errors: errors.mapped(), title:"avalanna" , old:req.body});
      }
      const {email} = req.body;
      const users = getJson("users.json");
      const user = users.find(usuario => usuario.email == email);
     
      req.session.user = user;
      delete user.password1;
        if (req.body.rememberMe) {
          res.cookie('userEmail',user.email,{maxAge: 1000 * 60 * 15 });
          res.cookie('rememberMe',"true", {maxAge: 1000 * 60 * 15 });
          console.log(req.cookies, "estas son las cookies");
        }
        res.redirect('/');
    },
      
    
 
    register:(req,res)=>{
        res.render("users/register", {title:"Registrarme", user: req.session.user});
    },
    createUser: (req, res) => {
      const errores = validationResult(req);
      console.log("errores:", errores);
      console.log("body:",req.body);

      if(!errores.isEmpty()){
        console.log("ingrese en errores");
        res.render("users/register",{errores:errores.mapped(),old:req.body,title:"registro"})
      }
      else{ 
      const users = getJson("users.json");
      const {NameAndSurname,email,phoneNumber,password1,rol} = req.body;
      const id = uuidv4();
      const user = {
        id,
        NameAndSurname:NameAndSurname,
        email:email,
        phoneNumber:phoneNumber,
        password: bcrypt.hashSync(password1,10),
        rol: rol ? rol : "user"
      }
      console.log(user);
      users.push(user);
      setJson(users,"users.json");
      res.redirect('/users/ingresar');
    }
},
    edform:(req,res)=>{
        const {id} = req.params;
        const users = getJson("users.json");
        const user = users.find(elemento => elemento.id == id);
        res.render('users/actualizar-datos-usuario', { title: 'Editar', user, usuario:req.session.user});
      },
      update:(req,res)=>{
        const errores = validationResult(req);
      console.log("errores:", errores);
      console.log("body:",req.body);

      if(!errores.isEmpty()){
        console.log("ingrese en errores");
        const {id} = req.params;
        const users = getJson("users.json");
        const user = users.find(elemento => elemento.id == id);
        res.render("users/actualizar-datos-usuario",{errores:errores.mapped(),old:req.body,title:"editar",usuario:req.session.user, user})
      }
      else{ 
        const {id} = req.params;
        const {NameAndSurname,email,age,phoneNumber,date,rol} = req.body;
        const users = getJson("users.json");
        const usuarios = users.map(element => {
          if (element.id == id) {
            return {
              id,
              NameAndSurname,
              email,
              phoneNumber,
              age,
              date,
              image: req.file ? req.file.filename : element.image, 
              password: element.password,
              rol: rol ? rol : "user"
            }
          }
          return element
        });
        setJson(usuarios,"users.json");
        const userUpdate = usuarios.find(elemento => elemento.id == id);
        req.session.user = userUpdate;
        delete userUpdate.password
        res.cookie('user',userUpdate)
        res.redirect(`/users/editar/${id}`);
      }},

 */     dashboard: (req, res) => {
        const propiedades = ["id", "nameAndSurname", "email", "phoneNumber"];
        
        db.User.findAll()
        .then((users)=>{
          
          res.render("users/dashboard", { title: "Dashboard", users, propiedades, user: req.session.user })
        })
        .catch(err=>console.log(err))
        
    },
    /*
      logout:(req,res) =>{
        req.session.destroy();
        console.log("estas son las cookies", req.cookies);
        if (req.cookies) {
          res.clearCookie('user');
          res.clearCookie("userEmail")
          res.clearCookie('rememberMe');
        }
        res.redirect('/');
},
*/
      destroy:(req,res)=>{
        const {id} = req.params;
        db.User.destroy({
          where:{
            id,
          }
        }).then((resp)=>{
          res.redirect("/");
        })
        .catch(err=>console.log(err))
      }
  }
module.exports = usersController;
