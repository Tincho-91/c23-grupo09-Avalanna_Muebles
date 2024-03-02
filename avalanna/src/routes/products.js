const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const productController = require("../controllers/productsController");
const sessionValidate = require("../middlewares/sessionValidate");

const adminValidation = require("../middlewares/adminValidation");

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null,path.join(__dirname, "../../public/img") )
    },
    filename: (req, file, cb)=>{

        cb(null, "group-" + Date.now() + path.extname(file.originalname))
    }

})

const upload = multer({ storage });

/* GET home page. */
router.get('/', productController.products);

router.get('/detail/:id', productController.detail);

router.get('/section/:category', productController.categories);

router.get('/formCreate', adminValidation, productController.formulario)
router.post('/formCreate',upload.single("image"), productController.store)

router.get('/productCart', sessionValidate, productController.cart)

router.get('/formEdit/:id', productController.edform)
router.put('/formEdit/:id',upload.single("image"), productController.processUpdate)

router.get('/dashboard', productController.dashboard)

router.delete('/delete/:id', productController.destroy)

module.exports = router;
