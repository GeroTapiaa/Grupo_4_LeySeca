var express = require('express');
var router = express.Router();
const { carrito, details, create, store } = require('../controllers/productsController');

// user

router
    .get('/carrito', carrito)
    .get('/productDetail', details)
    .get('/formCreate', create)
    .get('/formEdit', store)

module.exports = router;