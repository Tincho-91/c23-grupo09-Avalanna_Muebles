const db = require("../database/models");
const fs = require("fs");
const path = require("path");
const {getJson, setJson} = require("../utility/jsonMethod");
const { Console } = require("console");


const productsController = {
    detail: (req, res) => {
        const id = req.params.id;
        const products = getJson("products.json")
        const product = products.find(elemento => elemento.id == id);
        const calc = product.price - ((product.price * product.discount) / 100)
        res.render("products/productDetail", { title: product.name, product, calc, user: req.session.user })
    },
    formulario: (req, res) => {
        db.Category.findAll()
        .then((categories)=>{
            res.render("products/crear-formulario", { title: "formulario", categories:categories, user: req.session.user })
        })
       
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
        res.redirect(`/products/detail/${id}`)


        
    },
    cart: (req, res) => {
        res.render("products/productCart", { title: "Carrito de compra", user: req.session.user });
    },
    dashboard: (req, res) => {
        const propiedades = ["id", "image", "name", "price"];
        //const products = getJson("products.json")
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
            console.log(`archivo antes del err ${resp.dataValues.image}`);
            if(err) throw err;
            console.log(`archivo ${resp.dataValues.image}`);
            res.redirect(`/`);
       })
    }
       ).catch(err=>console.log(err))
       
    },
    products:(req,res) =>{
        const products = getJson("products.json");
        res.render("products/products", {title: "Todos los productos", products, user: req.session.user});
    },
    categories:(req,res)=>{
        const {category} = req.params;
        const products = getJson("products.json");
        const productsCategorized = products.filter(product=>{
            return product.category == category.toLowerCase()
        });
        res.render("products/categories", {title: category, productsCategorized, category, user: req.session.user})
    }



}


module.exports = ( productsController )