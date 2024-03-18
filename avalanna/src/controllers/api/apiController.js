const db = require("../../database/models");
const { op } =require("sequelize");
const fs = require("fs");
const path = require("path");


const apiProductsController = {
    
    detail: async (req, res) => {
        try {
            const id = parseInt(req.params.id);

            if(!Number.isInteger(id)){
                throw new Error("Por favor ingrese un numero entero")
            }

            const product = await db.Product.findByPk(id,{
                include:{association:'categories'}
            })

            if(!product){
                throw new Error("El ID ingresado no corresponde a ningun producto")
            }

            return res.status(200).send(product);            
        } catch (error) {
            res.status(400).send(error.message)
        }
    },
    

    store: async (req,res) =>{
        
        const producto = req.body;

        producto.image = req.file.filename;

        db.Product.create(producto)
        .then((product)=>{
            res.redirect(`/products`);
        })

        .catch(err=> console.log(err))
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

    list: async (req,res) =>{

        let {limit = 10 , page = 1} = req.query;
        
        limit = parseInt(limit)
        const offset = limit * (parseInt(page)-1);
        try {
            const products = await db.Product.findAll({include:{association:"categories"},limit , offset });

            return res.status(200).send(products);
        } catch (error) {
            return res.status(400).send(error.message);
        }

    },

    processUpdate:async (req, res) => {
        const { id } = req.params;
        let avatar = ""
        await db.Product.findByPk(id).then(resp =>{
            if(resp.dataValues.image){
            avatar = resp.dataValues.image
        } else {avatar = "default.jpg"}
        })
        const {name, price, description,extradescription, discount} = req.body;
        db.Product.update(
          {
            name: name,
            price: +price ,
            description: description ,
            extradescripcion: extradescription ,
            discount: +discount ,
            image: req.file ? req.file.filename : avatar
        
          },
          {
            where: {
              id,
            },
            
          }
        )
          .then((resp) => {
            res.redirect(`/products/detail/${id}`);
          })
          .catch((err) => console.log(err));
 
}
}
    




module.exports = (apiProductsController)