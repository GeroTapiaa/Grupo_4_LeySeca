var express = require('express');
var router = express.Router();
const { carrito, details, create } = require('../controllers/productsController');

// user

router
    .get('/carrito', carrito)
    .get('/productDetail', details)
    .get('/formCreate', create)

module.exports = router;