const multer = require("multer");
const path = require("path");

const storageProducts = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/images/images_Ley-Seca");
    },
    filename: (req, file, callback) => {
        callback(null, `product-${Date.now()}${path.extname(file.originalname)}`);
    },
});

const fileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        req.fileValidationError = "Solo se permite imágenes jpg, jpeg, png, gif, webp";
        return callback(null, false, req.fileValidationError)
    }
    return callback(null, true)
}


const upload = multer({
    storage: storageProducts,
    fileFilter
});

module.exports = {
    upload,
};
