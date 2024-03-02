const db = require("../database/models");
const categories = [
    {
        image: "living-home.png",
        alt: "muebles para living",
        name: "LIVING" ,
    },
    {
        image: "cocina-home.png" ,
        alt: "muebles para cocina" ,
        name:"COCINA" ,
    },
    {
        image: "dormitorio-home.png",
        alt: "muebles para dormitorio" ,
        name:"DORMITORIO" ,
    },
    {
        image: "exterior-home.png",
        alt: "muebles para exterior" ,
        name:"EXTERIOR" ,
    },
    {
        image: "combos-home.png",
        alt: "muebles rojos" ,
        name: "COMBOS",
    },
    {
        image: "newIn-home.png",
        alt: "sillas y desayunador" ,
        name: "NEW IN",
    },
]

const indexController = {
    home: (req,res)=>{
        db.Category.findAll({
            
            include: [{ model: db.Product,as:'products' }],
          })
          .then((category) => {
            res.render("index", {title:"Avalanna Muebles",category, categories, user: req.session.user});
            });
        
        
          /*.catch((err) => {
            console.log(err);
          }); */
        
    },

}
module.exports = indexController