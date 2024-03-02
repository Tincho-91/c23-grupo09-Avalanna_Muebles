const db = require("../database/models");

const indexController = {
    home: (req,res)=>{
        db.Category.findAll(
            

          )
          .then((categories) => {
            res.render("index", {title:"Avalanna Muebles",categories:categories, user: req.session.user});
            })
        
        
          .catch((err) => {
            console.log(err);
          }); 
        
    },

}
module.exports = indexController