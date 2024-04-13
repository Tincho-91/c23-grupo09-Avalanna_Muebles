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
                throw new Error ($`{req.params.id} no es un término válido, debe ingresar un número entero`)
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
        
        try {

            const users = await db.User.findAll();

            return res.status(200).send(users);
        } catch (error) {
            return res.status(400).send(error.message);
        }

    },
    // Endpoint para obtener los detalles de un usuario por su id
getUserById: async (req, res) => {
    try {
        // Obtener el id del usuario de los parametros de la solicitud
        const userId = parseInt(req.params.id);

        // Verificar si el id es un numero entero
        if (!Number.isInteger(userId)) {
            throw new Error ("${req.params.id} no es un término válido, debe ingresar un número entero");
        }

        // Consultar el usuario en la base de datos por su id
        const user = await db.User.findByPk(userId);

        // Verificar si el usuario existe
        if (!user) {
            throw new Error ("Usuario inexistente");
        }

        // objeto literal de los detalles del usuario
        const responseObject = {
            id: user.id,
            name: user.nameAndSurname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            birthday:user.birthday,
            
            
            // URL para la imagen de perfil 
           // profileImageUrl: /api/users/${user.id}/profile-image
        };

        // Enviar la respuesta con los detalles del usuario
        return res.status(200).json(responseObject);
    } catch (error) {
        //  errores
        return res.status(400).send(error.message);
    }
}
};