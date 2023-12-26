const fs = require("fs");
const path = require("path");
const { getJson, setJson } = require("../utility/jsonMethod");


const productsController = {
    detail: (req, res) => {
        const id = req.params.id;
        const products = getJson("products.json")
        const product = products.find(elemento => elemento.id == id);
        const calc = product.price - ((product.price * product.discount) / 100)
        res.render("products/productDetail", { title: product.name, product, calc })
    },
    formulario: (req, res) => {

        res.render("products/crear-formulario", { title: "formulario" })
    },

    edform: (req, res) => {

        res.render("products/edform", { title: "edform" })
    },
    cart: (req, res) => {
        res.render("products/productCart", { title: "Carrito de compra" });
    },
    dashboard: (req, res) => {
        const propiedades = ["id", "image", "name", "price"];
        const products = getJson("products.json")
        res.render("products/dashboard", { title: "Dashboard", products, propiedades })
    },

    delete:(req,res)=>{
        const {id}=req.params;
        const productos=getJson("products.json");
        const nuevaLista=productos.filter(elemento => elemento.id != id);
        setJson(nuevaLista, "products.json");
        res.redirect("/products/dashboard")
    },

    destroy:(req,res)=>{
        const {id}=req.params;
        const products=getJson();
        const product=products.find(producto => producto.id != id);
        const nuevoArray=products.filter(producto => producto.id != id );
        const json=JSON.stringify(nuevoArray);
        // fs.unlink(`../../public/images/products/${product.image}`); borra una sola imagen
        // product.images.forEach(imagen =>{
        //     fs.unlink(`../../public/images/products/${imagen}`)
        // })
        console.log("imagen:",product.image);
        fs.unlink(path.join(__dirname,`../../public/images/products/${product.image}`),(err)=>{
            if(err) throw err;
            console.log(`archivo ${product.image}`);
        })
        fs.writeFileSync(productsFilePath,json,"utf-8");
        res.redirect(`/products`);

    }



}


module.exports = ( productsController )