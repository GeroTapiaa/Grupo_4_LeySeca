const { check, body } = require("express-validator");
const { loadUsers } = require("../data/db-module");
const bcryptjs = require('bcryptjs')
const db = require("../database/models");


module.exports = [
    check('user')
        .notEmpty().withMessage('Debes ingresar el nombre de usuario').bail()
        .custom((value, { req }) => {
            let user = db.User.findAll({ user }).then(
                (user) => user.user !== value || req.body.user
            );
            return user ? false : true;
        })
        .withMessage("El usuario no está registrado"),


    body('password')

        .notEmpty().withMessage('Debes ingresar tu contraseña').bail()
        // .custom((value, { req }) => {
        //     let password = loadUsers().find(user => user.user === req.body.user && bcryptjs.compareSync(value, user.password));
        //     return password ? true : false
        // })
        .custom((value, { req }) => {
            let password = db.User.findOne({ user }).then(
                (user) =>
                    user.user === req.body.user &&
                    bcryptjs.compareSync(value, user.password)
            );
            return password ? true : false;
        })
        .withMessage('Comprueba tu usuario y contraseña e inténtalo de nuevo')
]