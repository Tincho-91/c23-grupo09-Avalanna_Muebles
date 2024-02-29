
const db = require("../database/models");
const { op } =require("sequelize");
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');


 /* const usersController = {
  login: (req,res)=>{
        res.render("users/login", {title:"Ingresar"});
    },
    logout:(req,res) =>{
      req.session.destroy();
       if (req.cookies) {
        res.clearCookie('user');
        res.clearCookie("userEmail")
        res.clearCookie('rememberMe');
      }
      res.redirect('/');
},
    processlogin: (req, res) => {
      const errores = validationResult(req);
  
      if (!errores.isEmpty()) {
        console.log("errores:", errores.mapped());
        res.render("./users/login", {
          errores: errores.errors,
          title: "avalanna",
          usuario: req.session.user,
        });
      } else {
        const { email } = req.body;
        db.User.findOne({
          attributes: { exclude: ["password1"] },
          where: {
            email,
          },
        })
          .then((user) => {
            req.session.user = user.dataValues;
  
            if (req.body.remember == "true") {
              res.cookie("user", user.dataValues, { maxAge: 1000 * 60 * 15 });
              res.cookie("rememberMe", "true", { maxAge: 1000 * 60 * 15 });
            }
  
            res.redirect("/");
          })
          .catch((err) => {
            console.log(err);
          });
      }
},
      
     register:(req,res)=>{
        res.render("users/register", {title:"Registrarme", user: req.session.user});
    },
    createUser: (req, res) => {
      const errores = validationResult(req);
      
      if(!errores.isEmpty()){
        console.log("ingrese en errores");
        res.render("users/register",{errores:errores.mapped(),old:req.body,title:"registro"})
      }
      else{ 
      
      const {NameAndSurname,email,phoneNumber,password1,rol} = req.body;
      
      const user = {
        id,
        NameAndSurname:NameAndSurname,
        email:email,
        phoneNumber:phoneNumber,
        password: bcrypt.hashSync(password1,10),
        rol: rol ? rol : "user",
        
      };
      }
      
      db.User.create(user)
        .then((user) => {
          res.redirect("/users/ingresar");
        })
        .catch((err) => {
          console.log(err);
        });
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

      dashboard:(req,res)=>{
        res.send(req.session.user)
      },

  }
module.exports = usersController;*/
