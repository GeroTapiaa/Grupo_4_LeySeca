var express = require('express');
var router = express.Router();
const { login, register, update, profile, edit, userRegister } = require('../controllers/userController');
const registerValidator = require('../validations/registerValidator');

router
    .get('/login', login)
    .get('/register', register)
    .post('/register', registerValidator, userRegister)
    .get('/profile', profile)
    .get('/profileEdit/:id', edit)
    .put('/update/:id', update)


module.exports = router;