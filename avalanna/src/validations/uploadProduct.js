const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null,path.join(__dirname, "/../../public/img") )
    },
    filename: (req, file, cb)=>{

        cb(null, "group-" + Date.now() + path.extname(file.originalname))
    }

})

const fileFilter = (req,file,cb)=>{
    const filtro =   /\.(jpg|jpeg|png|gif)$/
    if(filtro.test(file.originalname)){
     // To accept this file pass `false`, like so:
     cb(null, true)
    }else{    
     // To reject the file pass `true`, like so:
     req.errorValidationImage = "No es un tipo de archivo valido"
     cb(null, false)
    }
 }
 
 module.exports = multer({storage,fileFilter})