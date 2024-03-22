const db = require("../database/models");

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

}
module.exports = indexController