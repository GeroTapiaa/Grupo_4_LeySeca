const { check, body } = require("express-validator");
const { loadUsers } = require("../data/db-module");
const bcryptjs = require('bcryptjs')

module.exports = [
    check('user')
        .notEmpty().withMessage('Debes ingresar el nombre de usuario').bail(),
    body('password')
        .notEmpty().withMessage('Debes ingresar tu contraseña').bail()
        .custom((value, {req}) =>{
            let password = loadUsers().find(user => user.user === req.body.user && bcryptjs.compareSync(value, user.password));
            return password ? true : false
        }).withMessage('Comprueba tu email y contraseña e inténtalo de nuevo')
]