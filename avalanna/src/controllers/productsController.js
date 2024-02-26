const db = require("../database/models");
const fs = require("fs");
const path = require("path");
const { getJson, setJson } = require("../utility/jsonMethod");
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

        res.render("products/crear-formulario", { title: "formulario", user: req.session.user })
    },

    store: (req, res) => {
        const producto = req.body;
        producto.id = Date.now();
        producto.image = req.file.filename;
        const products = getJson("products.json")
        products.push(producto)


        setJson(products, "products.json")
        res.redirect(`/products`);

    },


    edform: (req, res) => {
        const { id } = req.params;
        console.log("mostrar id edform", id)
        const products = getJson("products.json")
        const product = products.find(elemento => elemento.id == id);
        res.render("products/edform", { title: "edform", product, user: req.session.user })
    },
    update: (req, res) => {
        console.log("file:", req.file);
        /* Para multiples imagenes:
        const images = [];
        if(req.files){
         files.forEach (element => {
    images.push(element.filename);
            }); 
        }
    */
        const { id } = req.params;
        console.log("mostrar id", id)
        const { image, name, price, discount, description, extraDescription, height, width, depth, category } = req.body;
        const products = getJson("products.json")
        console.log("products...", products)
        const newArray = products.map(product => {
            if (product.id == id) {
                return {
                    id,
                    image: req.file ? req.file.filename : product.image,
                    name,
                    price: +price,
                    discount: +discount,
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
        console.log("ESTO es newArray", newArray)
        setJson(newArray, "products.json");
        res.redirect(`/products/detail/${id}`)



    },
    cart: (req, res) => {
        res.render("products/productCart", { title: "Carrito de compra", user: req.session.user });
    },
    dashboard: (req, res) => {
        const propiedades = ["id", "image", "name", "price"];
        const products = getJson("products.json")
        res.render("products/dashboard", { title: "Dashboard", products, propiedades, user: req.session.user })
    },

    delete: (req, res) => {
        const { id } = req.params;
        const productos = getJson("products.json");
        const nuevaLista = productos.filter(elemento => elemento.id != id);
        setJson(nuevaLista, "products.json");
        res.redirect("/products/dashboard");
    },

    destroy: (req, res) => {
        const { id } = req.params;
        const products = getJson("products.json");
        const product = products.find(producto => producto.id == id);
        const nuevoArray = products.filter(producto => producto.id != id);
        console.log("imagen:", product.image);
        fs.unlink(path.join(__dirname, `../../public/img/${product.image}`), (err) => {
            if (err) throw err;
            console.log(`archivo ${product.image}`);
        })
        setJson(nuevoArray, "products.json")
        res.redirect(`/products`);


    },
    products: (req, res) => {
        const products = getJson("products.json");
        res.render("products/products", { title: "Todos los productos", products, user: req.session.user });
    },
    categories: (req, res) => {
        const { category } = req.params;
        const products = getJson("products.json");
        const productsCategorized = products.filter(product => {
            return product.category == category.toLowerCase()
        });
        res.render("products/categories", { title: category, productsCategorized, category, user: req.session.user })
    },

    // create:(req, res) => {
    //     const producto = req.body;
    //     producto.id = uuidv4();
    //     const products = getJson("products");
    //     products.push(producto);
    //     setJson(products,"products");
    //     res.redirect("/products/dashboard");


    update: (req, res) => {
        const { text, category, height, width, depth, imagen, sticker } = req.body;
        db.User.update(


            productsModify = products.map(producto => {
                if (producto.id == id) {
                    return {
                        id,
                        name: text,
                        precio: text,
                        descuento: text,
                        descripcion: text,
                        extraDescripcion: text,
                        categoria: category,
                        medidas: height, width, depth,
                        imagen: (imagen ? imagen : producto.imagen),
                        sticker
                    }
                }
                return producto
           
            }))

        setJson(productsModify, "products");

        res.redirect(`/products/detail/${id}`);
    },
 
}



module.exports = (productsController)