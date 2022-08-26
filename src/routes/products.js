var express = require('express');
var router = express.Router();
const { carrito, details, products, experiencias, create, store, edit, update, destroy } = require('../controllers/productsController');

// user

router
    .get('/shopping-cart', carrito)
    .get('/productDetail/:id', details)
    .get('/products', products)
    .get('/experience', experiencias)
    .get('/create', create)
    .get('/edit/:id', edit)
    .put('/update/:id', update)
    .delete('/delete/:id', destroy)


module.exports = router;