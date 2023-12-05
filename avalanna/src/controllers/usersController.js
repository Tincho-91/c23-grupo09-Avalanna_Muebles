const userController = {
    login: (req,res)=>{
        res.render("login", {title:"Ingresar"});
    },
    register:(req,res)=>{
        res.render("register", {title:"Registrarme"});
    },
}

module.exports = userController;