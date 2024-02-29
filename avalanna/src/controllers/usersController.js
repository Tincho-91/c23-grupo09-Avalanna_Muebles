
const db = require("../database/models");
//const {setJson,getJson} = require("../utility/jsonMethod");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

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

    req.session.user = user;
    delete user.password1;
    if (req.body.rememberMe) {
      res.cookie('userEmail', user.email, { maxAge: 1000 * 60 * 15 });
      res.cookie('rememberMe', "true", { maxAge: 1000 * 60 * 15 });
      console.log(req.cookies, "estas son las cookies");
    }
    res.redirect('/');
  },



  register: (req, res) => {
    res.render("users/register", { title: "Registrarme", user: req.session.user });
  },
  createUser: (req, res) => {
    const errores = validationResult(req);
    console.log("errores:", errores);
    console.log("body:", req.body);

    if (!errores.isEmpty()) {
      console.log("ingrese en errores");
      res.render("users/register", { errores: errores.mapped(), old: req.body, title: "registro" })
    }
    else {
      const users = getJson("users.json");
      const { NameAndSurname, email, phoneNumber, password1, rol } = req.body;
      const id = uuidv4();
      const user = {
        id,
        NameAndSurname: NameAndSurname,
        email: email,
        phoneNumber: phoneNumber,
        password: bcrypt.hashSync(password1, 10),
        rol: rol ? rol : "user"
      }
      console.log(user);
      users.push(user);
      setJson(users, "users.json");
      res.redirect('/users/ingresar');
    }
  },
*/  edform: (req, res) => {
    const { id } = req.params;
    db.User.findByPk(id, {include:[
      { association: "addresses" },
    ]})
    .then((resp)=>{
      console.log("direccion aca:",resp.dataValues.addresses[0].dataValues);
      const direcciones = []
      resp.dataValues.addresses.forEach(address => {
        direcciones.push(address.dataValues)
        
      });     
      
      res.render('users/actualizar-datos-usuario', { title: 'Editar', user: resp.dataValues, addresses:direcciones, usuario: req.session.user });
    }).catch(err=>console.log(err))
  }, /*
  // update: (req, res) => {
  //   // const errores = validationResult(req);
  //   // console.log("errores:", errores);
  //   // console.log("body:", req.body);

  //   // if (!errores.isEmpty()) {
  //   //   console.log("ingrese en errores");
  //   //   const { id } = req.params;
  //   //   const users = getJson("users.json");
  //   //   const user = users.find(elemento => elemento.id == id);
  //   //   res.render("users/actualizar-datos-usuario", { errores: errores.mapped(), old: req.body, title: "editar", usuario: req.session.user, user })
  //   // }
  //   // else {
  //   //   const { id } = req.params;
  //     const { NameAndSurname, email, age, phoneNumber, date, rol } = req.body;
  //     // const users = getJson("users.json");
  //     // const usuarios = users.map(element => {
  //     //   if (element.id == id) {
  //     //     return {
  //           id,
  //           NameAndSurname,
  //           email,
  //           phoneNumber,
  //           age,
  //           date,
  //           image: req.file ? req.file.filename : element.image,
  //           password: element.password,
  //           rol: rol ? rol : "user"
  //         }

  //   //     return element
  //   //   });
  //   //   setJson(usuarios, "users.json");
  //   //   const userUpdate = usuarios.find(elemento => elemento.id == id);
  //   //   req.session.user = userUpdate;
  //   //   delete userUpdate.password
  //   //   res.cookie('user', userUpdate)
  //   //   res.redirect(`/users/editar/${id}`);
  //   // }
  // },

  */update: (req, res) => {
    const { id } = req.params;
    const { nameAndSurname, email, phoneNumber, password, rol, birthday, country, province, number, streetName, postalCode, locality } = req.body;
    const avatar = ""
    db.User.findByPk(id)
    .then((resp)=>{
      if (resp.dataValues.profileImage) {
        avatar = resp.dataValues.profileImage
      }else{
        avatar = "default.webp"
      }
    }).catch(err=>console.log(err));
    db.User.update(
      {
        nameAndSurname: nameAndSurname,
        email: email,
        phoneNumber: +phoneNumber,
        password: password,
        rolId: rol ? +rol : 1,
        birthday: birthday,
        profileImage: req.file ? req.file.filename : avatar,
      },
      {
        where: {
          id,
        },
      }
    )
      .then((resp) => {
        console.log("este es el resp con usuario actualizado",resp[0]);
        
       db.Address.upsert({
          userId: resp[0],
          country,
          province,
          number:+number,
          streetName,
          postalCode,
          locality,
       })
          .then((response) => {
            db.User.findByPk(id, {include:[
              { association: "addresses" },
            ]})
            .then((resp)=>{
              const direcciones = []
              resp.dataValues.addresses.forEach(address => {
                direcciones.push(address.dataValues)
                
              });     
              
              res.render('users/actualizar-datos-usuario', { title: 'Editar', user: resp.dataValues, addresses:direcciones, usuario: req.session.user });
            }).catch(err=>console.log(err))

          }).catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
   

  },/*

  dashboard: (req, res) => {
    res.send(req.session.user)
  },
  logout: (req, res) => {
    req.session.destroy();
    console.log("estas son las cookies", req.cookies);
    if (req.cookies) {
      res.clearCookie('user');
      res.clearCookie("userEmail")
      res.clearCookie('rememberMe');
    }
    res.redirect('/');
  },

 


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

