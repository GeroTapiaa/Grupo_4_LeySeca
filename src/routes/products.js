var express = require('express');
var router = express.Router();
const { carrito, details, productos, experiencias } = require('../controllers/productsController');

// user

router
    .get('/carrito', carrito)
    .get('/productDetail', details)
    .get('/productos', productos)
    .get('/experiencias', experiencias)

module.exports = router;