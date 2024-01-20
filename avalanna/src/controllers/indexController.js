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
        req.session.user = {
            name: "mel",
            rol:"admin"
        }
        res.render("index", {title:"Avalanna Muebles", categories, user: req.session.user});
    },
}

module.exports = indexController