const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {list} = require('../../controllers/API/apiCategoryController');

// /api/categories

router
    .get('/', list)

module.exports = router;