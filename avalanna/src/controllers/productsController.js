const fs = require("fs");
const path = require("path");
const json = path.join(__dirname, "../","../data","/products.json");

const productController = {
    detail:(req,res) => {
        const id = req.params.id;        
        const productsJson = fs.readFileSync(json,"utf-8");
        const products = JSON.parse(productsJson);
        const product = products.find(elemento => elemento.id == id);
        res.render("productDetail", {title:product.name,product})
    },
    
}


module.exports = productController