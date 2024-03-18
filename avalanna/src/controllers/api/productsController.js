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
    }
}