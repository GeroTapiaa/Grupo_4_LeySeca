var express = require('express');
var router = express.Router();
const { carrito, details, products, experience, create, store, edit, update, destroy, experienceTour, experiencePatagonia } = require('../controllers/productsController');

// user

router
    .get('/shopping-cart', carrito)
    .get('/productDetail/:id', details)
    .get('/products', products)
    .get('/experience', experience)
    .get('/patagonia', experiencePatagonia)
    .get('/tour', experienceTour)
    .get('/create', create)
    .get('/edit/:id', edit)
    .put('/update/:id', update)
    .delete('/delete/:id', destroy)


module.exports = router;