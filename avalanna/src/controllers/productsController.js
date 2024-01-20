const fs = require("fs");
const path = require("path");
const {getJson, setJson} = require("../utility/jsonMethod");
const { Console } = require("console");


const productsController = {
    detail: (req, res) => {
        const id = req.params.id;
        const products = getJson("products")
        const product = products.find(elemento => elemento.id == id);
        const calc = product.price - ((product.price * product.discount) / 100)
        res.render("products/productDetail", { title: product.name, product, calc })
    },
    formulario: (req, res) => {

        res.render("products/crear-formulario", { title: "formulario" })
    },

    store:(req,res) =>{
    	const producto = req.body;
		producto.id = Date.now();
        producto.image = req.file.filename;
		const products = getJson("products")
		products.push(producto)
		

	   setJson(products,"products")
		res.redirect(`/products`);

    },


    edform:(req,res) => {
        const {id}= req.params;
        console.log("mostrar id edform",id)
        const products = getJson("products")
        const product = products.find(elemento => elemento.id == id);
        res.render("products/edform", {title:"edform", product})
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
        const products = getJson("products")
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
        setJson(newArray, "products");
        res.redirect(`/products/detail/${id}`)


        
    },
    cart: (req, res) => {
        res.render("products/productCart", { title: "Carrito de compra" });
    },
    dashboard: (req, res) => {
        const propiedades = ["id", "image", "name", "price"];
        const products = getJson("products")
        res.render("products/dashboard", { title: "Dashboard", products, propiedades })
    },

    delete:(req,res)=>{
        const {id}=req.params;
        const productos=getJson("products");
        const nuevaLista=productos.filter(elemento => elemento.id != id);
        setJson(nuevaLista, "products");
        res.redirect("/products/dashboard");
    },

    destroy:(req,res)=>{
        const {id}=req.params;
        const products=getJson("products");
        const product=products.find(producto => producto.id == id);
        const nuevoArray=products.filter(producto => producto.id != id );
        console.log("imagen:",product.image);
        fs.unlink(path.join(__dirname,`../../public/img/${product.image}`),(err)=>{
            if(err) throw err;
            console.log(`archivo ${product.image}`);
        })
        setJson(nuevoArray,"products")
        res.redirect(`/products`);

       
    },
    products:(req,res) =>{
        const products = getJson("products");
        res.render("products/products", {title: "Todos los productos", products});
    },
    categories:(req,res)=>{
        const {category} = req.params;
        const products = getJson("products");
        const productsCategorized = products.filter(product=>{
            return product.category == category.toLowerCase()
        });
        res.render("products/categories", {title: category, productsCategorized, category})
    }



}


module.exports = ( productsController )