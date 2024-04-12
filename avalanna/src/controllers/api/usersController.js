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
        },
        listUsers: async (req,res) =>{

            let { page = 1 } = req.query;

       const limit = 10
        
        const offset = limit * (parseInt(page) - 1);
 
        const query = { limit, offset,  attributes: ['id', 'nameAndSurname', 'email', 'profileImage']  };
    
     try{
        if (!Number.isInteger(parseInt(page))) {
            throw new Error("Debe ingresar un número entero")
      }
            const users = await db.User.findAndCountAll(query);
    
            if (!users) {
                throw new Error ("Usuarios inexistentes")
            }
                
            const arrayUsers = users.rows
            arrayUsers.forEach( user=>{
                console.log("userImage", user.profileImage);
                user.dataValues.detail = `localhost:3000/users/editar/${user.id}`;
               if(user.profileImage != "default.jpg") {
                user.dataValues.profileImage = `http://localhost:3000/img/users/${user.profileImage}`
               }else{
                user.dataValues.profileImage = `http://localhost:3000/img/${user.profileImage}`
               }

            })
              
            page == 1 ? previous = null : previous =`localhost:3000/api/products/?page=${parseInt(page) - 1}`

            if (users.count > 10) {
                offset < (users.count / parseInt(page)) ?  next = `localhost:3000/api/products/?page=${parseInt(page) + 1}` : next = null;
            }else{
                next = null
            }
            console.log("hola pasaste por aca");

            return res.status(200).json({
                count: users.count,
                users: arrayUsers,
                next,
                previous
            });
   
            
    } catch (error) {
         return res.status(400).send(error.message);
    }
          },
        
    }

