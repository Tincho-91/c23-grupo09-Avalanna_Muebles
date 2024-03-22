const db = require("../../database/models");
const { op } =require("sequelize");
const { validationResult } = require("express-validator");
const path = require("path");
const bcrypt = require('bcryptjs');

module.exports = {
        update: async (req,res)=>{
            console.log("req.body: ", req.body);
            try {
                const errors = validationResult(req);
                const id = parseInt(req.params.id);
                if (!Number.isInteger(id)) {
                    throw new Error (`${req.params.id} no es un término válido, debe ingresar un número entero`)
                }

                if (errors.isEmpty()) {
                    const user = await db.User.findByPk(id);
                    if (!user) {
                        throw new Error (`Usuario inexistente`);
                    }
                    
                const {nameAndSurname, email, phoneNumber, password, rolId, birthday} = req.body;
                await user.update({
                  nameAndSurname,
                  email,
                  phoneNumber,
                  password: password ? bcrypt.hashSync(password,10) : user.password,
                  rolId,
                  birthday,
                  profileImage: user.profileImage ? user.profileImage : "default.jpg"
                })

                return res.status(200).json(user);
                }else{
                    const errorsMapped = errors.mapped()
                    for (const key in errorsMapped){
                        delete errorsMapped[key].type;
                        delete errorsMapped[key].location;
                        delete errorsMapped[key].path;
                    }

                    const errorsJson = JSON.stringify(errorsMapped)
           
                    throw new Error (errorsJson);
                }

            } catch (error) {
                
                return res.status(400).send(error.message);
            }
        }
    }

