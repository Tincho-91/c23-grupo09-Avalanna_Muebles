const {setJson,getJson} = require("../utility/jsonMethod");
const userController = {
    login: (req,res)=>{
        res.render("users/login", {title:"Ingresar"});
    },
    register:(req,res)=>{
        res.render("users/register", {title:"Registrarme"});
    },
    edform:(req,res)=>{
        const {id} = req.params;
        const users = getJson("users.json");
        const user = users.find(elemento => elemento.id == id);
        res.render('./users/actualizar-datos-usuario', { title: 'Editar', user, usuario:req.session.user});
      },
      update:(req,res)=>{
        const {id} = req.params;
        const {NameAndSurname,email,age,tel,date,rol} = req.body;
        const users = getJson("users.json");
        const usuarios = users.map(element => {
          if (element.id == id) {
            return {
              id,
              NameAndSurname,
              email,
              tel,
              age,
              date,
              image: req.file ? req.file.filename : element.image, 
              password: element.password,
              rol: rol ? rol : "user"
            }
          }
          return element
        });
        setJson(usuarios,"users.json");
        const userUpdate = usuarios.find(elemento => elemento.id == id);
        req.session.user = userUpdate;
        delete userUpdate.password
        res.cookie('user',(userUpdate))
        res.redirect(`/users/editar/${id}`);
      },
      dashboard:(req,res)=>{
        res.send(req.session.user)
      }
  }
module.exports = userController;