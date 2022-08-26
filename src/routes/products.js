var express = require('express');
var router = express.Router();
const { carrito, details, productos, experiencias, create, store, edit, update, destroy } = require('../controllers/productsController');

// user

router
    .get('/carrito', carrito)
    .get('/productDetail/:id', details)
    .get('/productos', productos)
    .get('/experiencias', experiencias)
    .get('/create', create)
    .get('/edit/:id', edit)
    .put('/update/:id', update)
    .delete('/delete/:id', destroy)


module.exports = router;