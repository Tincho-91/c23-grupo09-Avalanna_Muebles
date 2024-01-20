const userController = {
    login: (req, res) => {
        res.render("users/login", { title: "Ingresar" });
    },
    register: (req, res) => {
        res.render("users/register", { title: "Registrarme" });
    },
    // login: (req, res) => {
    //     return res.render("login");
    // },
    processLogin: function (req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let usersJSON = fs.readFileSync('users.json', { errors });
            let users;
            if (usersJSON == "") {
                users = [];
            } else {
                users = JSON.parse(usersJSON)
            }
            for (let i = 0; i < users.length; i++) {
                if (users[i].email == req.body.email) {
                    if (bcrypt.compareSync(req.body.password, users[i].password)) {
                        let usuarioALoguearse = users[i];
                        break;
                    }
                    req.session.usuarioLogueado = usuarioALoguearse;
                }else{
                    return res.renderr('login',{errors:errors.errors});
                }
            }
            if (usuarioALoguearse == undefined) {
                return res.render('login', { errors: [{ msg: 'datos invalidos' }] })
            }

        }
    }

}
   
module.exports = userController