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
        const {id}= req.params;
        const products = getJson("products.json")
        const product = products.find(elemento => elemento.id == id);
        res.render("products/edform", {title:"edform", product})
    },
    update:(req,res) =>{
        const {id}=req.params;
        const {image, name, price, discount, description, extraDescription, height, width, depth, category} = req.body;
        const products = getJson("products.json")
        const newArray = products.map(product=>{
            if (product.id == id) {
                return{
                    id,
                    image: image ? image : product.image,
                    name: name.trim(),
                    price: +price,
                    discount: +discount,
                    description: description.trim(),
                    extraDescription: extraDescription.trim(),
                    height,
                    width,
                    depth,
                    category,
                }
            }
            return product
        })
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