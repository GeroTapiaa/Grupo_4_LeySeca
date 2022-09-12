var express = require('express');
var router = express.Router();
const { login, register, update, profile, edit, userRegister , loginRegister,logout } = require('../controllers/userController');
const userSessionCheck = require('../middleware/userSessionCheck');
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');

router
    .get('/login', login)
    .post('/login',loginValidator ,loginRegister)
    .get('/register', register)
    .post('/register', registerValidator, userRegister)
    .get('/profile',userSessionCheck, profile)
    .get('/profileEdit/:id', edit)
    .put('/update/:id', update)
    .get('/logout', logout)


module.exports = router;