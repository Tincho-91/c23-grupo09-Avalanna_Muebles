const sessionValidator = (req, res, next)=>{
    if(!req.session.user){
        res.redirect("/users/ingresar");
    }
    next()
}

module.exports = sessionValidator;