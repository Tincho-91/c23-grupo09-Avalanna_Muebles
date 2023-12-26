const fs = require("fs");
const path = require("path");
const {getJson, setJson} = require("../utility/jsonMethod");
const { Console } = require("console");


const productsController = {
    detail:(req,res) => {
        const id = req.params.id;        
        const products = getJson("products.json")
        const product = products.find(elemento => elemento.id == id);
        const calc = product.price - ((product.price * product.discount) / 100)
        res.render("products/productDetail", {title: product.name, product, calc})
    },
    formulario:(req,res) => {
        
        res.render("products/crear-formulario", {title:"formulario"})
    },

    edform:(req,res) => {
        const {id}= req.params;
        console.log("mostrar id edform",id)
        const products = getJson("products.json")
        const product = products.find(elemento => elemento.id == id);
        res.render("products/edform", {title:"edform", product})
    },
    update:(req,res) =>{
        console.log("hola...")
        const {id}=req.params;
        console.log("mostrar id",id)
        const {image, name, price, discount, description, extraDescription, height, width, depth, category} = req.body;
        const products = getJson("products.json")
        console.log("products...",products)
        const newArray = products.map(product=>{
            if (product.id == id) {
                return{
                    id,
                    image: image ? image : product.image,
                    name:name,
                    price:+price,
                    discount:+discount,
                    description:description,
                    extraDescription:extraDescription,
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
    cart:(req,res)=>{
        res.render("products/productCart", {title:"Carrito de compra"});
    },
    dashboard:(req,res) => {
        const propiedades = ["id", "image", "name", "price"];
        const products = getJson("products.json")
        res.render("products/dashboard", {title: "Dashboard", products, propiedades})
    }
}


module.exports = productsController