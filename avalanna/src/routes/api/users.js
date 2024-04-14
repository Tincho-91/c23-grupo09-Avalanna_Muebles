const express = require('express');
const router = express.Router();
const usersController = require("../../controllers/api/usersController")
const editUserValidator = require("../../validations/editUserValidator");

router.put("/editar/:id",editUserValidator, usersController.update);

router.get("/all", usersController.listUsers);

router.get("/:id", usersController.getUserById);

module.exports = router;