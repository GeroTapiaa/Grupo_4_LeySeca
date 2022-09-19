var express = require('express');
var router = express.Router();
const { carrito, details, products, experience, create, store, edit, update, destroy, experienceTour, experiencePatagonia, shop } = require('../controllers/productsController');
const upload = require('../middleware/uploadFile');
const productValidation = require('../validations/createValidation')



// user

router
    .get('/shopping-cart/:id', carrito)
    .get('/productDetail/:id', details)
    .get('/products', products)
    .get('/shop', shop)
    .get('/experience', experience)
    .get('/patagonia', experiencePatagonia)
    .get('/tour', experienceTour)
    .get('/create', create)
    .post('/store',upload.array('images'),productValidation, store)
    .get('/edit/:id', edit)
    .put('/update/:id', update)
    .delete('/delete/:id', destroy)


module.exports = router;