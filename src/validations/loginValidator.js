const { check, body } = require("express-validator");
const { loadUsers } = require("../data/db-module");
const bcryptjs = require('bcryptjs')
const db = require("../database/models");
const { Op } = require("sequelize");


module.exports = [
    check('user')
    .notEmpty().withMessage('Debes ingresar un usuario.').bail(),
    
    



    check('password')
    .notEmpty().withMessage('Debes ingresar una contraseña.')
   
    .custom((value, { req }) => {
        return db.User.findOne({
          where: {
            user: req.body.user,
          },
        })
          .then((user) => {
            if (!bcryptjs.compareSync(req.body.password, user.password)) {
              return Promise.reject();
            }
          })
          .catch((error) => {
            return Promise.reject("El usuario o contraseña son incorrectos");
          });
      })
       
    
    
]