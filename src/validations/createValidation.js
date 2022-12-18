const { check } = require('express-validator');

module.exports = [
    check("nameProduct")
        .notEmpty().withMessage('El nombre obligatorio').bail(),

    check('price')
        .notEmpty().withMessage('Debe ingresar un valor').bail()
        .trim().isInt()
        .withMessage('Solo se permiten numeros positivos').bail()

        .trim().isInt({
            min: 0
        }).withMessage('El valor ingresado tiene que ser mayor que 0'),


    check('discount')
        .trim().isInt().withMessage('Solo se permiten numeros positivos')

        .trim().isInt({
            max: 100
        }).withMessage('El valor ingresado tiene que ser menor a 100'),


    check('category')
        .notEmpty().withMessage('Debes elegir una categoria').bail(),



    check('description')
        .notEmpty().withMessage('Debe ingresar una descipciòn del producto')
        .isLength({
            max: 300
        })
        .withMessage('Sueperó los caràcteres').bail()


]