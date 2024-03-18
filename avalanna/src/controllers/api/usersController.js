const db = require("../database/models");
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
    
                const user = await db.User.findByPk(id);
                console.log("req.body: ", req.body);
    
                if (!user) {
                    throw new Error (`Usuario inexistente`);
                }
                const {nameAndSurname, email, phoneNumber, password, rolId, birthday} = req.body;
                    await user.update({
                      nameAndSurname,
                      email,
                      phoneNumber,
                      password: password ? password.hashSync() : user.password,
                      rolId,
                      birthday,
                      profileImage: user.profileImage ? user.profileImage : "default.jpg"
                    })
    
                    return res.status(200).json(user);
                
            } catch (error) {
                return res.status(400).send(error.message);
            }
        }
    }

