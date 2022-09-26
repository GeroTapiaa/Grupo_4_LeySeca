const multer = require('multer');
const path = require('path'); 

const storage = multer.diskStorage({
    destination : (req ,file ,callback) =>{
        callback(null, './public/images/storage')
    },
    filename : (req, file , callback)=>{
        callback(null, `product-${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({
    storage
});
module.exports = upload