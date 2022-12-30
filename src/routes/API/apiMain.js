// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const { getTotals } = require('../../controllers/API/apiMainController');

// /api

router
    .get('/totals', getTotals)

module.exports = router;