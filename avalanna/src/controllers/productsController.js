/*const db = require("../database/models");
const { op } = require("sequelize");



const productsController = {
    detail: (req, res) => {
        const id = req.params.id;
       
         db.products.findByPk(id)
         .then((product) => {
            const calc = product.price - ((product.price * product.discount) / 100)
            res.render("products/productDetail", { title: product.name, product, calc, user: req.session.user })
         })
         .catch((err) =>{
            console.log(err);
          });
      }, 
    

    formulario: (req, res) => {

        res.render("products/crear-formulario", { title: "formulario", user: req.session.user });
    },

    store:(req,res) =>{
    	const producto = req.body;
		producto.id = Date.now();
        producto.image = req.file.filename;
        db.product.create(producto);
		res.redirect(`/products`);
    }
    .catch((err) =>{
        console.log(err);
      });
    }
    
    edform:(req,res) => {
        const {id}= req.params;
        console.log("mostrar id edform",id)
        const products =db.product.findByPk(id);
         res.render("products/edform", {title:"edform", product, user: req.session.user})
    }
    .catch((err) =>{
        console.log(err);
      });

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
       /* const {id}=req.params;
      const {image, name, price, discount, description, extraDescription, height, width, depth, category} = req.body;
       const product = db.product.findByPk(id);
              
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
                res.redirect("products/detail/${id}");
          
             }
           };
       
    cart: (req, res) => {
        res.render("products/productCart", { title: "Carrito de compra", user: req.session.user });
    },
    dashboard: (req, res) => {
        const propiedades = ["id", "image", "name", "price"];
        const products = db.product.findAll();
        res.render("products/dashboard", { title: "Dashboard", products, propiedades, user: req.session.user })
    
    .catch((err) =>{
        console.log(err);
      });
    }

    delete:(req,res)=>{
        const {id}=req.params;
        const productos= db.ptoduct.destroy({
            where:{id}
        });
        res.redirect("/products/dashboard");
        
        
    },

    destroy:(req,res)=>{
        const {id}=req.params;
        const products= db.product.findByPk(id);
    
            // if(err) throw err;
            // console.log(`archivo ${product.image}`);
        }
        res.redirect(`/products`);

        
      
    

    products:(req,res) =>{
        const products = db.product.findAll();
        res.render("products/products", {title: "Todos los productos", products, user: req.session.user});
    },
    

    categories:(req,res)=>{
        const {category} = req.params;
        const productsCategorized = db.products.findAll ({
            where: {category:category.toLowerCase() 
            },
        });
           
        res.render("products/categories", {title: category, productsCategorized, category, user: req.session.user})
    }
    

module.exports = ( productsController )*/