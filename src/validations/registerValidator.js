const { check, body } = require("express-validator");
const moment = require("moment");
const { loadUsers } = require("../data/db-module");

module.exports = [
    // name
    check("name")
        .notEmpty()
        .withMessage("Debes ingresar un nombre")
        .bail()

        .isLength({
            min: 3,
        })
        .withMessage("El nombre debe tener un mínimo de 3 caracteres")
        .bail()

        .isAlpha("es-ES", { ignore: " " })
        .withMessage("El nombre debe contener sólo caracteres alfabéticos"),

    // last name

    check("surname")
        .notEmpty()
        .withMessage("Debes ingresar un apellido")
        .bail()

        .isLength({
            min: 2,
        })
        .withMessage("El apellido debe tener un mínimo de 2 caracteres")
        .bail()

        .isAlpha()
        .withMessage("El apellido debe contener sólo caracteres alfabéticos"),

    // user

    check("user")
        .notEmpty()
        .withMessage("Debes ingresar un usuario")
        .bail()

        .isLength({
            min: 5,
        })
        .withMessage("El usuario debe tener un mínimo de 5 caracteres")
        .bail()

        .custom((value, { req }) => {
            const users = loadUsers().find((user) => user.user === value);
            if (users) {
                return false;
            } else {
                return true;
            }

        })
        .withMessage("El usuario ya se encuentra registrado"),

    // date

    check("date")
        .isBefore(moment().subtract(18, "year").format("Y-M-D"))
        .withMessage("Debes ser mayor de 18 años"),

    // address

    body("address")
        .notEmpty()
        .withMessage("Debes ingresar una dirección")
        .bail()

        .isLength({
            min: 3,
        })
        .withMessage("El usuario debe tener un mínimo de 5 caracteres"),

    // email

    body("email")
        .notEmpty()
        .withMessage("Debes ingresar un email")
        .bail()

        .isEmail()
        .withMessage("El mail no es válido ")
        .bail()

        .custom((email, { req }) => {
            const users = loadUsers().find((user) => user.email === email);
            if (users) {
                return false;
            } else {
                return true;
            }
        })
        .withMessage("El mail ya se encuentra registrado"),

    // password
    check("password")
        .notEmpty()
        .withMessage("Debes ingresar una contraseña")
        .bail()

        .isLength({
            min: 6,
            max: 12,
        })
        .withMessage("La contraseña debe tener entre 6 y 12 caracteres")
        .bail(),

    // password verify
    body("confirmPassword")
        .notEmpty()
        .withMessage("Debes confirmar la contraseña")
        .bail()

        .custom((confirmPassword, { req }) => {
            const password = req.body.password;

            if (password !== confirmPassword) {
                return false;
            }

            return true;
        })
        .withMessage("La contraseña ingresada no coincide"),

    // terms
    check("terms")
        .isString("on")
        .withMessage("Debes aceptar los términos y condiciones"),
];