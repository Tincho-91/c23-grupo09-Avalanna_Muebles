const db = require("../../database/models");
const { op } =require("sequelize");
const { validationResult } = require("express-validator");
const path = require("path");

module.exports = {
    detail: async (req, res) => {
        try {
            const id = parseInt(req.params.id);//parseo el id y lo convierto en num entero
    
            if (!Number.isInteger(id)) {//verifico si el id es un num entero y si no mensaje de error
                throw new Error("Por favor ingrese un número entero");
            }
    //buscar el producto en la base de datos por su id
            const product = await db.Product.findByPk(id, {
                include: [{ association: "categories" }]
            });
        
            if (!product) {//Se verifica si se encontró un producto con el id y si no mensaje d error
                throw new Error("El ID ingresado no corresponde a ningun producto");
            }
        
            // Construye el objeto literal 
            const responseObject = {
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                extraDescription: product.extraDescription,
                categoryId: product.categoryId,
                discount: product.discount,
                height: product.height,
                width: product.width,
                depth: product.depth,
               
            
                // Array para las relaciones de uno a muchos
                categories:[product.categories]
            }
                // URL para la imagen del producto (puedes modificar esto según tu implementación)
                //imageUrl: /api/products/${product.id}/image
        
    
            // Envia la respuesta con el objeto literal
            return res.status(200).json(responseObject);
        } catch (error) {
         
            return res.status(400).send(error.message);
        
        }
    },

    list: async (req, res) => {

        let { page = 1 } = req.query;

       const limit = 10
        
        const offset = limit * (parseInt(page) - 1);
 
        const query = { limit, offset, include: { association: "categories" }, attributes: ['id', 'name', 'description', 'image'] };
    
        try {
            if (!Number.isInteger(parseInt(page))) {
                throw new Error("Debe ingresar un número entero")
          }

            const categories = await db.Category.findAndCountAll({include:{association:"products"}})

            if (!categories) {
                throw new Error("Categorias inexistentes")
            }
            
            let countByCategory = {}
           categories.rows.forEach(category => {
            countByCategory[category.name]= category.dataValues.products.length
           })

          const products = await db.Product.findAndCountAll(query);

          if (!products) {
            throw new Error ("Productos inexistentes")
          }
            
          const arrayProducts = products.rows
          arrayProducts.forEach( product=>{
            product.dataValues.detail = `localhost:3000/products/detail/${product.id}`
            product.dataValues.image = `http://localhost:3000/img/${product.image}`
            product.dataValues.associations = [{categories:product.dataValues.categories}]
            delete product.dataValues.categories
          })
          page == 1 ? previous = null : previous =`localhost:3000/api/products/?page=${parseInt(page) - 1}`
          offset < (products.count / parseInt(page)) ?  next = `localhost:3000/api/products/?page=${parseInt(page) + 1}` : next = null;

          return res.status(200).json({
            count: products.count,
            countByCategory,
            products:arrayProducts,
            next,
            previous,
          });
          

        } catch (error) {
          return res.status(400).send(error.message);
        }
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

    update: async (req,res)=>{
        
        console.log("req.body: ", req.body);
        try {
            const id = parseInt(req.params.id);
            if (!Number.isInteger(id)) {
                throw new Error (`${req.params.id} no es un término válido, debe ingresar un número entero`)
            }

            const product = await db.Product.findByPk(id);
            console.log("req.body: ", req.body);

            if (!product) {
                throw new Error (`Producto inexistente`);
            }
            const {name, price, description, extraDescription, categoryId, discount, height, width,depth} = req.body;
                await product.update({
                  name,
                  price,
                  description,
                  extraDescription, 
                  categoryId,
                  discount,
                  height,
                  width,
                  depth,
                  image: product.image ? product.image : "default.jpg"
                })

                return res.status(200).json(product);
            
        } catch (error) {
            return res.status(400).send(error.message);
        }
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
}