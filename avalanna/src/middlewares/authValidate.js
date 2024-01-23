const authValidate = (req, res, next)=>{
    if(req.session.user){
        res.redirect(`/`);
        //res.redirect(`/user/profile/${req.session.user.id}`);
    }
    next()
}

module.exports = authValidate;