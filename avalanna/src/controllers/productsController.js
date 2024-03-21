const db = require("../database/models");
const { op } =require("sequelize");
const fs = require("fs");
const path = require("path");
const { Console } = require("console");


const productsController = {
    detail: (req, res) => {
        const id = req.params.id;
       
         db.Product.findByPk(id)
         .then((product) => {
            const calc = product.price - ((product.price * product.discount) / 100)
            res.render("products/productDetail", { title: product.name, product, calc, usuario: req.session.user })
         })
         .catch((err) =>{
            console.log(err);
          });
      },
    

    formulario: (req, res) => {
        db.Category.findAll()
        .then((categories)=>{
            res.render("products/crear-formulario", { title: "formulario", categories:categories, usuario: req.session.user })
        })
        .catch(err=>console.log(err))
       
    },

    store:(req,res) =>{
    	const producto = req.body;

        producto.image = req.file.filename;

        db.Product.create(producto)
        .then((product)=>{
            res.redirect(`/products`);
        })
        .catch(err=> console.log(err))
    },


    edform: (req, res) => {
        const { id } = req.params;
        db.Product.findByPk(id)
        .then((resp)=>{
          res.render('products/edform', { title: 'Editar', product: resp.dataValues});
        })

        
    },
    cart: (req, res) => {
        res.render("products/productCart", { title: "Carrito de compra", usuario: req.session.user });
    },
    dashboard: (req, res) => {
        const propiedades = ["id", "image", "name", "price"];
        
        db.Product.findAll()
        .then((products)=>{
            res.render("products/dashboard", { title: "Dashboard", products, propiedades, usuario: req.session.user })
        })
        
    },

    delete: (req, res) => {
        const { id } = req.params;
        const productos = getJson("products.json");
        const nuevaLista = productos.filter(elemento => elemento.id != id);
        setJson(nuevaLista, "products.json");
        res.redirect("/products/dashboard");
    },

    destroy:(req,res)=>{
        const {id}=req.params;
       db.Product.destroy({
        where:{
            id,
        }
       })
       db.Product.findOne({
        where:{
            id
        }
       }).then((resp)=>{
        fs.unlink(path.join(__dirname,`../../public/img/${resp.dataValues.image}`),(err)=>{
            
            if(err) throw err;
           
            res.redirect(`/`);
       })
    }
       ).catch(err=>console.log(err))
       
    },
    products:(req,res) =>{
        db.Product.findAll()
        .then((products) =>{
            res.render("products/products", {title: "Todos los productos", products, usuario: req.session.user});
        } )
       
        .catch(err=>console.log(err))
     },
    categories:(req,res)=>{
        const {category} = req.params;
       console.log("ES ESTE",category)
       console.log("REQQQQ",req)
        db.Category.findByPk(category)
        .then(resp => {
            const categories = resp.dataValues
            db.Product.findAll({ where:{categoryId:category} })
        
            .then((products) => {
              console.log("PRODUCTOSSSSSSSSSSSSS", products)
              res.render("products/categories", {
                categories,
                title: `Productos de la categoría `,
                productsCategorized:products,
                usuario: req.session.user,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }).catch((err) => {
            console.log(err);
          });
        
    },
    processUpdate:async (req, res) => {
        const { id } = req.params;
        let avatar = ""
        await db.Product.findByPk(id).then(resp =>{
            if(resp.dataValues.image){
            avatar = resp.dataValues.image
        } else {avatar = "default.jpg"}
        })
        const {name, price, description,extradescription, discount} = req.body;
        db.Product.update(
          {
            name: name,
            price: +price ,
            description: description ,
            extradescripcion: extradescription ,
            discount: +discount ,
            image: req.file ? req.file.filename : avatar
        
          },
          {
            where: {
              id,
            },
            
          }
        )
          .then((resp) => {
            res.redirect(`/products/detail/${id}`);
          })
          .catch((err) => console.log(err));
 
}

}
    




module.exports = (productsController)