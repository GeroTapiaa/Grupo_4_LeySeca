var express = require('express');
var router = express.Router();
const { login, register, update, profile, edit } = require('../controllers/userController')
    /* GET users listing. */
router
    .get('/login', login)
    .get('/register', register)
    .get('/profile', profile)
    .get('/profileEdit/:id', edit)
    .put('/update/:id', update)


module.exports = router;