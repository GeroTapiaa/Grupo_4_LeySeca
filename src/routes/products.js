var express = require('express');
var router = express.Router();
const { carrito, details, products, experience, create, store, edit, update, destroy, experienceTour, experiencePatagonia, shop } = require('../controllers/productsController');
const {upload }= require('../middleware/uploadFile');
const productValidation = require('../validations/createValidation');
const isAdmin = require('../middleware/adminCheck')



// user

router
    .get('/shopping-cart/:id', carrito)
    .get('/productDetail/:id', details)
    .get('/products', products)
    .get('/shop', shop)
    .get('/experience', experience)
    .get('/patagonia', experiencePatagonia)
    .get('/tour', experienceTour)
    .get('/create',isAdmin, create)
    .post('/store',upload.single('images'),productValidation,isAdmin,store)
    .get('/edit/:id',isAdmin, edit)
    .put('/update/:id',upload.single('images'),productValidation,isAdmin, update)
    .delete('/delete/:id',isAdmin, destroy)


module.exports = router;