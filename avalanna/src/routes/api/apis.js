const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {list,detail,store,destroy,processUpdate} = require("../../controllers/api/apiController");
const sessionValidate = require("../../middlewares/sessionValidate");

const adminValidation = require("../../middlewares/adminValidation");

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null,path.join(__dirname, "../../../public/img") )
    },
    filename: (req, file, cb)=>{

        cb(null, "group-" + Date.now() + path.extname(file.originalname))
    }

})

const upload = multer({ storage });

/* GET home page. */
router.get('/', list);

router.get('/detail/:id', detail);

router.post('/create',upload.single("image"), store)

router.put('/edit/:id',upload.single("image"), processUpdate)

router.delete('/delete/:id', destroy)

module.exports = router;
