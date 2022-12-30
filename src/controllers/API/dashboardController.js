const db = require("../../database/models");
const { literal } = require("sequelize");

module.exports = {
    list: async (req, res) => {
        try {
            let products = await db.Product.findAll();

            return res.status(200).json({
                ok: true,
                data: products
            });
        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || "Comunicate con el administrador",
            });
        }
    },

    last: async (req, res) => {
        try {
            let product = await db.Product.findAll({

                limit: 1,
                order: [[
                    'createdAt', 'DESC'
                ]],
                attributes: {

                    include: [

                        [literal(`CONCAT('${req.protocol}://${req.get('host')}/api/products/',Product.image)`), 'urlImage']
                    ]
                },

            });

            return res.status(200).json({
                ok: true,
                data: product
            });
        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || "Comunicate con el administrador",
            });
        }
    },

    userList: async (req, res) => {
        try {
            let users = await db.User.findAll({

            });

            return res.status(200).json({
                ok: true,
                data: users
            });
        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || "Comunicate con el administrador",
            });
        }
    },
};