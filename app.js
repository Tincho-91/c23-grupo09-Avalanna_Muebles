const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
   return res.sendFile(path.join(__dirname, "/views/index.html"));
})

app.get("/detalleDelProducto", (req, res) => {
   return res.sendFile(path.join(__dirname, "/views/productDetail.html"));
})

app.get("/footer", (req, res) => {
   return res.sendFile(path.join(__dirname, "/views/footer.html"));
})

app.get("/registrarme", (req, res) => {
   return res.sendFile(path.join(__dirname, "/views/register.html"));
})

app.get("/ingresar", (req, res) => {
   return res.sendFile(path.join(__dirname, "/views/login.html"));
})

app.get("/productCart", (req, res) => {
   return res.sendFile(path.join(__dirname, "/views/productCart.html"));
})


app.listen(3000, () => console.log("corriendo en el puerto 3000"));


app.use(express.static("public"));