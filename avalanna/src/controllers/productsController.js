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
            res.render("products/productDetail", { title: product.name, product, calc, user: req.session.user })
         })
         .catch((err) =>{
            console.log(err);
          });
      },
    

    formulario: (req, res) => {
        db.Category.findAll()
        .then((categories)=>{
            res.render("products/crear-formulario", { title: "formulario", categories:categories, user: req.session.user })
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


    edform:(req,res) => {
        const {id}= req.params;
        console.log("mostrar id edform",id)
        const products = getJson("products.json")
        const product = products.find(elemento => elemento.id == id);
        res.render("products/edform", {title:"edform", product, user: req.session.user})
    },
    update:(req,res) =>{
        console.log("file:",req.file); 
        /* Para multiples imagenes:
        const images = [];
        if(req.files){
         files.forEach (element => {
    images.push(element.filename);
            }); 
        }
    */
        const {id}=req.params;
        console.log("mostrar id",id)
        const {image, name, price, discount, description, extraDescription, height, width, depth, category} = req.body;
        const products = getJson("products.json")
        console.log("products...",products)
        const newArray = products.map(product=>{
            if (product.id == id) {
                return{
                    id,
                    image: req.file ? req.file.filename : product.image,
                    name,
                    price:+price,
                    discount:+discount,
                    description,
                    extraDescription,
                    height,
                    width,
                    depth,
                    category,
                }
            }
            return product
        });
        console.log("ESTO es newArray",newArray)
        setJson(newArray, "products.json");
        res.redirect("/products/detail/${id}")


        
    },
       
    cart: (req, res) => {
        res.render("products/productCart", { title: "Carrito de compra", user: req.session.user });
    },
    dashboard: (req, res) => {
        const propiedades = ["id", "image", "name", "price"];
        
        db.Product.findAll()
        .then((products)=>{
            res.render("products/dashboard", { title: "Dashboard", products, propiedades, user: req.session.user })
        })
        
    },

    
    delete:(req,res)=>{
        const {id}=req.params;
        const productos=getJson("products.json");
        const nuevaLista=productos.filter(elemento => elemento.id != id);
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
            res.render("products/products", {title: "Todos los productos", products, user: req.session.user});
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
                user: req.session.user,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }).catch((err) => {
            console.log(err);
          });
        
    }
}
    



module.exports = ( productsController )