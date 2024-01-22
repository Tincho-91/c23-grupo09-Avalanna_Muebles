const userController = {
    login: (req,res)=>{
        res.render("users/login", {title:"Ingresar"});
    },
    
    register:(req,res)=>{
        res.render("users/register", {title:"Registrarme"});
    },
}

module.exports = userController;