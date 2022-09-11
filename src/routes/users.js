var express = require('express');
var router = express.Router();
const { login, register, update, profile, edit, userRegister , loginRegister } = require('../controllers/userController');
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');

router
    .get('/login', login)
    .post('/login',loginValidator ,loginRegister)
    .get('/register', register)
    .post('/register', registerValidator, userRegister)
    .get('/profile', profile)
    .get('/profileEdit/:id', edit)
    .put('/update/:id', update)


module.exports = router;