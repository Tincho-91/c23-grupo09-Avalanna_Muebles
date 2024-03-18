const db = require("../../database/models");
const { op } =require("sequelize");
const { validationResult } = require("express-validator");
const path = require("path");

module.exports = {
    update: async (req,res)=>{
        console.log("req.body: ", req.body);
        try {
            const id = parseInt(req.params.id);
            if (!Number.isInteger(id)) {
                throw new Error (`"${id}" no es un término válido, debe ingresar un número entero`)
            }

            const product = await db.Product.findByPk(id);
            console.log("req.body: ", req.body);

            if (!product) {
                throw new Error (`Producto inexistente`);
            }

                await product.update({
                  name: req.body.name,
                  price: req.body.price,
                  description: req.body.description,
                  extraDescription: req.body.extraDescription,
                  categoryId: req.body.categoryId,
                  discount: req.body.discount,
                  height: req.body.height,
                  width: req.body.width,
                  depth: req.body.depth,
                  image: product.image ? product.image : "default.jpg"
                })

                return res.status(200).json(product);
            
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }
}