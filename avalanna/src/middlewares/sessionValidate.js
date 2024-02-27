const sessionValidator = (req, res, next)=>{
    if(!req.session.user){
        res.redirect("/users/ingresar");
    }else {
        next()
    }
   
}

module.exports = sessionValidator;