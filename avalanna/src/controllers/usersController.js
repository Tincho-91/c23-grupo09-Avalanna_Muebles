const userController = {
    login: (req,res)=>{
        res.render("users/login", {title:"Ingresar"});
    },
    register:(req,res)=>{
        res.render("users/register", {title:"Registrarme"});
    },
    logout:(req,res) =>{
            req.session.destroy();
            if (req.cookies.user) {
              res.clearCookie('user');
              res.clearCookie('remember');
            }
            res.redirect('/');
    }
}

module.exports = userController;