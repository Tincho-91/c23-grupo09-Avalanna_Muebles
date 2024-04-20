const db = require("../database/models");
const { Op } =require("sequelize");

const indexController = {
    home: (req,res)=>{
        db.Category.findAll(
            

          )
          .then((categories) => {
            console.log("SESSION", req.session.user);
            res.render("index", {title:"Avalanna Muebles",categories:categories, usuario: req.session.user});
            })
        
        
          .catch((err) => {
            console.log(err);
          }); 
        
    },
   nosotros:(req,res)=>{
    res.render("nosotros",{title:"Nosotros", usuario: req.session.user})
   },
   search: async (req,res)=>{
    console.log("req", req);
    const products = await db.Product.findAll({where:{
      name:{[Op.substring]:`%${req.query.keyword}%`}
    }})
    res.render("products/searchResults", {title:"Búsqueda", usuario: req.session.user, products})
   },
   
}
module.exports = indexController