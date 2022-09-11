const { check } = require('express-validator');
module.exports = [
    check("name")
        .notEmpty().withMessage('Nombre obligatorio').bail(),

    check('price')
        .notEmpty().withMessage('Ingrese valor').bail()
        .isNumeric({
            no_symbols: true
        }).withMessage('Solo se permiten numeros positivos').bail()
        .isInt({
            min: 0
        }).withMessage('El valor ingresado tiene que ser mayor que 0'),
    check('discount')
        .isNumeric({
            no_symbols: true
        }).withMessage('Solo se permiten numeros positivos')
        .isInt({
            max: 100
        }).withMessage('El valor ingresado tiene que ser menor a 100'),
    check('category')
        .notEmpty().withMessage('Debes elegir una categoria').bail(),
        check('desciption')
        .isLength({
            max : 150
        })


]