const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const { list, addItem, removeQuantity, removeAllItems, } = require('../../controllers/API/apiCartController');

// /api/carts

router
    .get('/', list)
    .post('/', addItem)
    .delete('/:id', removeQuantity)
    .delete('/all', removeAllItems)

module.exports = router;