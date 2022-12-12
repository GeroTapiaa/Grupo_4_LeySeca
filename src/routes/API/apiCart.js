const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {list, addItem, removeItem, removeAllItems, } = require('../../controllers/API/apiCartsController');

// /api/carts

router
    .get('/', list)
    .post('/', addItem)
    .delete('/:id', removeItem)
    .delete('/all', removeAllItems)

module.exports = router;