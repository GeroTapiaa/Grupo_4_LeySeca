var express = require('express');
const router = require("express").Router();

const { list, last, userList } = require('../../controllers/API/dashboardController')



router
    .get('/', list)
    .get('/userList', userList)
    .get('/last', last)

module.exports = router