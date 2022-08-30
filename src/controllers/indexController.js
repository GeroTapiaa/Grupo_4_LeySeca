const fs = require('fs');
const path = require('path');


const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    home: (req, res) => {
        let productsDiscount = products.filter(product => product.off === true)
        res.render('products/index', {
            productsDiscount,
            toThousand

        })

    },
    search: (req, res) => {

        let { keywords } = req.query;
        let results = products.filter(product => product.name.toLowerCase().includes(keywords.toLowerCase()));
        res.render('products/results', {
            results,

            keywords,
            toThousand
        });

    },

    terms: (req, res) => {
        res.render('user/terms')
    },

}