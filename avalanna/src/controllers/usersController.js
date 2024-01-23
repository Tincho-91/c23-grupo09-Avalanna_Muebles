const {setJson,getJson} = require("../utility/jsonMethod");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const userController = {
    login: (req,res)=>{
        res.render("users/login", {title:"Ingresar"});
    },
    processlogin: (req, res) => {
      const {email} = req.body;
      const users = getJson("users.json");
      const user = users.find(usuario => usuario.email == email);
      if(user){
        req.session.user = user;
        res.cookie('userEmail',user.email,{maxAge: 1000 * 60 * 15 });
        res.cookie('rememberMe',"true", {maxAge: 1000 * 60 * 15 });
        res.redirect('/');
      }else{
        res.render("users/login",{error:"No se encontro el usuario", title:"avalanna"});
      }
    },
 
    register:(req,res)=>{
        res.render("users/register", {title:"Registrarme"});
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
        const {id} = req.params;
        const {NameAndSurname,email,age,tel,date,rol} = req.body;
        const users = getJson("users.json");
        const usuarios = users.map(element => {
          if (element.id == id) {
            return {
              id,
              NameAndSurname,
              email,
              tel,
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
        res.cookie('user',(userUpdate))
        res.redirect(`/users/editar/${id}`);
      },
      dashboard:(req,res)=>{
        res.send(req.session.user)
      }
  }
module.exports = userController;