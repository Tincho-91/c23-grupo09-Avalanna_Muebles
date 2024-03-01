
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
      if (resp.dataValues.addresses) {
        const direcciones = []
        resp.dataValues.addresses.forEach(address => {
          direcciones.push(address.dataValues)
          
        });     
        
        res.render('users/actualizar-datos-usuario', { title: 'Editar', user: resp.dataValues, addresses:direcciones, usuario: req.session.user });
      }else {
        direcciones = null
        res.render('users/actualizar-datos-usuario', { title: 'Editar', user: resp.dataValues, addresses:direcciones, usuario: req.session.user });
      }   
      
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

  */update: async (req, res) => {
    const { id } = req.params;
    const { nameAndSurname, email, phoneNumber, password, rol, birthday, country, province, number, streetName, postalCode, locality } = req.body;
    let avatar = ""
    await db.User.findByPk(id).then(user=> user.dataValues.profileImage ? avatar = user.dataValues.profileImage : avatar = "default.jpg")
   
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
          db.User.findByPk(id, {include:[
            { association: "addresses" },
          ]})
          .then((resp)=>{
            const direcciones = []
          resp.dataValues.addresses.forEach(address => {
            direcciones.push(address.dataValues)
            
          });     
          res.render("users/actualizar-datos-usuario", {title: "Editar", user:resp.dataValues, addresses:resp.dataValues.addresses, usuario: req.session.user});
          
          })}).catch(err=>console.log(err))

  },
  /*

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
        }).catch(err=>console.log(err))
        db.Product.findOne({
          where:{
              id
          }
         }).then((resp)=>{
          fs.unlink(path.join(__dirname,`../../public/img/users/${resp.dataValues.image}`),(err)=>{
              console.log(`archivo antes del err ${resp.dataValues.image}`);
              if(err) throw err;
              console.log(`archivo ${resp.dataValues.image}`);
              res.redirect(`/`);
         })
        }
        ).catch(err=>console.log(err))
        
      },

      address:(req,res)=>{
        const id = req.params.id;
        const addressId = req.params.address;
        console.log("este es el Id:",id);
        console.log("este es el addressid",addressId);
        console.log("esta es la query ",req.params);
      const findUser =db.User.findByPk(id).catch(err=>console.log(err))
      const findAddress = db.Address.findByPk(addressId).catch(err=>console.log(err))

      Promise.all([findUser, findAddress])
        .then(([findUser, findAddress])=>{
          console.log("findUser", findUser.dataValues);
          console.log("findAddress", findAddress.dataValues);
          res.render("users/addressDetail",{title:"Domicilio", user:findUser.dataValues, addresses:findAddress.dataValues})

        }).catch(err=>console.log(err));
      },

      updateAddress:(req,res)=>{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          const id = req.params.id;
        const addressId = req.params.address;
        const findUser =db.User.findByPk(id).catch(err=>console.log(err))
        const findAddress = db.Address.findByPk(addressId).catch(err=>console.log(err))

      Promise.all([findUser, findAddress])
        .then(([findUser, findAddress])=>{
          res.render("users/addressDetail",{title:"Domicilio", user:findUser.dataValues, addresses:findAddress.dataValues, errores:errors.mapped(), old:req.body})

        }).catch(err=>console.log(err));
        }else {

        const {id, address} = req.params;
        const {country, province, number, streetName, postalCode, locality} = req.body;
        console.log("esto es addressId",address);
        console.log("esto es req.params", req.params);
        console.log("esto es country", country);
        db.Address.update({
          country, 
          province, 
          number: +number, 
          streetName, 
          postalCode: +postalCode, 
          locality,
          userId:id
        },{
          where:{
            id:address
          }
        }).then(resp=>{
          console.log("este es el resp");
          res.redirect("/")
        }).catch(err=>console.log(err))
      }
      },
      

      formAddress:(req,res)=>{
        const {id}=req.params;
        db.User.findByPk(id)
        .then(resp=>{
          res.render("users/registerAddress",{title:"registrar address", user:resp.dataValues})
        }).catch(err=> console.log(err))
      },

      registerAddress:(req,res)=>{
        const errors = validationResult(req);
        const {id} = req.params;

        if (!errors.isEmpty()) {
          db.User.findByPk(id)
        .then(resp=>{
          res.render("users/registerAddress",{title:"registrar address", user:resp.dataValues, old:req.body, errores:errors.mapped()})
        }).catch(err=> console.log(err))

        }else {
        
        const {country, province, number, streetName, postalCode, locality} = req.body;
        console.log("este es el req.body", req.body);
        console.log("este es el country", country);
        db.Address.create({
          country, 
          province, 
          number: +number, 
          streetName, 
          postalCode: +postalCode, 
          locality,
          userId:id
        }).then(resp=>{
          console.log("este es el country", country);
          res.redirect("/")
        }).catch(err=>console.log(err))
      }
    }

  }
module.exports = usersController;

