const fs = require("fs");
const path = require("path");
const {getJson, setJson} = require("../utility/jsonMethod")


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
        
        res.render("products/edform", {title:"edform"})
    },
    cart:(req,res)=>{
        res.render("products/productCart", {title:"Carrito de compra"});
    },
    dashboard:(req,res) => {
        const propiedades = ["id", "image", "name", "price"];
        const products = getJson("products.json");
        res.render("products/dashboard", {title: "Dashboard", products, propiedades})
    },
    products:(req,res) =>{
        const products = getJson("products.json");
        res.render("products/products", {title: "Todos los productos", products});
    }
}


module.exports = productsController