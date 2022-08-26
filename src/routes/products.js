var express = require('express');
var router = express.Router();
const { carrito, details, productos, experiencias, create, store } = require('../controllers/productsController');

// user

router
    .get('/carrito', carrito)
    .get('/productDetail', details)
    .get('/productos', productos)
    .get('/experiencias', experiencias)
    .get('/formCreate', create)
    .get('/formEdit', store)

module.exports = router;