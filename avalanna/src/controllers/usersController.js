
const db = require("../database/models");
const { op } =require("sequelize");
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const {parse} = require("@formkit/tempo")
const usersController = {
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
        res.render("users/login", {
          errores: errores.mapped(),
          title: "avalanna",
          usuario: req.session.user,old:req.body,errors:errores.mapped()
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
  
            if (req.body.rememberMe == "on") {
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
createUser: (req, res) => {
  const errores = validationResult(req);
  
  if(!errores.isEmpty()){
    console.log("ingrese en errores");
    res.render("users/register",{errores:errores.mapped(),old:req.body,title:"registro"})
  }
  else{ 
  
  const {NameAndSurname,email,phoneNumber,password1,rol} = req.body;
  
  const user = {
    nameAndSurname:NameAndSurname,
    email:email,
    phoneNumber:phoneNumber,
    password: bcrypt.hashSync(password1,10),
    rolId: rol ? rol : 1,
    
  };
  db.User.create(user)
  .then((user) => {
    res.redirect("/users/ingresar");
  })
  .catch((err) => {
    console.log(err);
  });
  }
  
  
},
      
     register:(req,res)=>{
        res.render("users/register", {title:"Registrarme", usuario: req.session.user});
    },
  
  edform: (req, res) => {
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
  }, 

  update: async (req, res) => {
    const errors = validationResult(req);
    const { id } = req.params;
if (!errors.isEmpty()) {
  db.User.findByPk(id, {include:[
    { association: "addresses" },
  ]})
  .then((resp)=>{
    if (resp.dataValues.addresses) {
      const direcciones = []
      resp.dataValues.addresses.forEach(address => {
        direcciones.push(address.dataValues)
        
      });     
      
      res.render('users/actualizar-datos-usuario', { title: 'Editar', user: resp.dataValues, addresses:direcciones, usuario: req.session.user, old:req.body, errores:errors.mapped() });
    }else {
      direcciones = null
      res.render('users/actualizar-datos-usuario', { title: 'Editar', user: resp.dataValues, addresses:direcciones, usuario: req.session.user, old:req.body, errores:errors.mapped()  });
    }   
    
  }).catch(err=>console.log(err))
}else {
    const { nameAndSurname, email, phoneNumber, password, rol, birthday } = req.body;
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
        const {id} = req.params
          db.User.findByPk(id, {include:[
            { association: "addresses" },
          ]})
          .then((resp)=>{
            const direcciones = []
          resp.dataValues.addresses.forEach(address => {
            direcciones.push(address.dataValues)
            
          }); 
          req.session.user = resp.dataValues    
          res.render("users/actualizar-datos-usuario", {title: "Editar", user:resp.dataValues, addresses:resp.dataValues.addresses, usuario: req.session.user});
          
          })}).catch(err=>console.log(err))
        }
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

 


      dashboard: (req, res) => {
        const propiedades = ["id", "nameAndSurname", "email", "phoneNumber"];
        
        db.User.findAll()
        .then((users)=>{
          
          res.render("users/dashboard", { title: "Dashboard", users, propiedades, usuario: req.session.user })
        })
        .catch(err=>console.log(err))
        
    },

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
        
      const findUser =db.User.findByPk(id).catch(err=>console.log(err))
      const findAddress = db.Address.findByPk(addressId).catch(err=>console.log(err))

      Promise.all([findUser, findAddress])
        .then(([findUser, findAddress])=>{
          console.log("findUser:", findUser.dataValues);
          console.log("findAddress:", findAddress);
          res.render("users/addressDetail",{title:"Domicilio", user:findUser.dataValues, addresses:findAddress.dataValues,  usuario: req.session.user})

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
          res.render("users/addressDetail",{title:"Domicilio", user:findUser.dataValues, addresses:findAddress.dataValues, errores:errors.mapped(), old:req.body, usuario: req.session.user})

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
        }).catch(err=>console.log(err))
      }
      },
      

      formAddress:(req,res)=>{
        const {id}=req.params;
        db.User.findByPk(id)
        .then(resp=>{
          res.render("users/registerAddress",{title:"registrar address", user:resp.dataValues, usuario: req.session.user})
        }).catch(err=> console.log(err))
      },

      registerAddress:(req,res)=>{
        const errors = validationResult(req);
        const {id} = req.params;

        if (!errors.isEmpty()) {
          db.User.findByPk(id)
        .then(resp=>{
          res.render("users/registerAddress",{title:"registrar address", user:resp.dataValues, old:req.body, errores:errors.mapped(), usuario: req.session.user})
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
        }).catch(err=>console.log(err))
      }
    },

    destroyAddress:(req,res)=>{
      const {address, id} = req.params
      db.Address.destroy({where:{
        id:address
      }}).then(resp=>{
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
      }).catch(err=>console.log(err))
    }

  }
module.exports = usersController;
