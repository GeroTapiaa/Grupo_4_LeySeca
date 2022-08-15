var express = require('express');
var router = express.Router();
const { carrito, details } = require('../controllers/productsController');

// user

router
    .get('/carrito', carrito)
    .get('/productDetail', details)

module.exports = router;