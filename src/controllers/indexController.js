const db = require('../database/models');
const fs = require('fs');
const path = require('path');
const { Op } = db.Sequelize;



// const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
	home: (req, res) => {
		let productsDiscount = db.Product.findAll({

			order: [["discount", "DESC"]],
			limit: 4,



		});
		Promise.all([productsDiscount])
			.then(([productsDiscount]) => {
				return res.render("products/index", {
					productsDiscount,

					toThousand,
				});
			})
			.catch((error) => console.log(error));
		// let productsDiscount = products.filter(product => product.off === true)
		// res.render('products/index', {
		//     productsDiscount,
		//     toThousand

		// })

	},
	search: (req, res) => {

		let { keywords } = req.query;

		db.Product.findAll({
			where: {
				[Op.or]: [
					{
						nameProduct: {
							[Op.substring]: keywords,
						},
					},

				],
			},

		})
			.then((results) => {
				return res.render("products/results", {
					results,
					toThousand,
					keywords,
				});
			})
			.catch((error) => console.log(error));
	},



	terms: (req, res) => {
		res.render('user/terms')
	},

}