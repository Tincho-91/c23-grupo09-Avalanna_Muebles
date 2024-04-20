const db = require("../database/models");
const { op } =require("sequelize");
const fs = require("fs");
const path = require("path");
const { Console, log } = require("console");
const { validationResult } = require("express-validator");


const productsController = {
    detail: async (req, res) => {
        const id = req.params.id;
       const product = await db.Product.findByPk(id);
       const calc = product.price - ((product.price * product.discount) / 100)
         db.Product.findByPk(id)

         const products = await db.Product.findAll()

         res.render("products/productDetail", { title: product.name, product, calc, usuario: req.session.user, products })
      },
    

    formulario: (req, res) => {
        db.Category.findAll()
        .then((categories)=>{
            res.render("products/crear-formulario", { title: "formulario", categories:categories, usuario: req.session.user })
        })
        .catch(err=>console.log(err))
       
    },

    store:(req,res) =>{
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log("req.body", req.body);
        db.Category.findAll()
        .then((categories)=>{
            res.render("products/crear-formulario", { title: "formulario", categories:categories, usuario: req.session.user, old: req.body, errores : errors.mapped() })
        })
        .catch(err=>console.log(err))
      }else{
        const producto = req.body;
        console.log("req.file", req.file);
        if (req.file) {
          producto.image = req.file.filename;
        }else{
          producto.image = "default.jpg"
        }
          
        db.Product.create(producto)
        .then((product)=>{
            res.redirect(`/products`);
        })
        .catch(err=> console.log(err))
      }

    },


    edform: (req, res) => {
        const { id } = req.params;
        db.Product.findByPk(id)
        .then((resp)=>{
          res.render('products/edform', { title: 'Editar', product: resp.dataValues, usuario: req.session.user});
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

    destroy: async (req,res)=>{
        const {id}=req.params;

        const productFound = await db.Product.findOne({
          where:{
              id
          }
         }).catch(err=>console.log(err))

         fs.unlink(path.join(__dirname,`../../public/img/${productFound.image}`),(err)=>{
            
          if(err) throw err;
         
     })

     await  db.Product.destroy({
        where:{
            id,
        }
       }).catch(err=>console.log(err))

       res.redirect(`/products/dashboard`);
       
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
        const errors = validationResult(req);
        const { id } = req.params;
      
        if (!errors.isEmpty()) {
          console.log(errors.mapped());
          db.Product.findByPk(id)
        .then((resp)=>{
          res.render('products/edform', { title: 'Editar', product: resp.dataValues, errores: errors.mapped(), usuario: req.session.user});
        })
        }else{
        const oldProduct = await db.Product.findByPk(id)  
        console.log("req.file", req.file);
        const {name, price, description,extradescription, discount} = req.body;
        db.Product.update(
          {
            name: name,
            price: +price ,
            description: description ,
            extradescripcion: extradescription ,
            discount: +discount ,
            image: req.file ? req.file.filename : oldProduct.image
        
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

}
    




module.exports = (productsController)