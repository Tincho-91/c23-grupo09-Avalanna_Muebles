const fs = require("fs");
const path = require("path");
const json = path.join(__dirname, "../../data","/products.json");

const productsController = {
    detail:(req,res) => {
        const id = req.params.id;        
        const productsJson = fs.readFileSync(json,"utf-8");
        const products = JSON.parse(productsJson);
        const product = products.find(elemento => elemento.id == id);
        res.render("products/productDetail", {title: product.name, product})
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
        const productsJson = fs.readFileSync(json,"utf-8");
        const products = JSON.parse(productsJson);
        res.render("products/dashboard", {title: "Dashboard", products, propiedades})
    }
}


module.exports = productsController