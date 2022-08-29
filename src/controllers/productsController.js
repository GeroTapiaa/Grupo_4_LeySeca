const fs = require('fs');
const path = require('path');


const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8'));
const saveProducts = (products) => {
    fs.writeFileSync(path.join(__dirname, '../data/products.json'), JSON.stringify(products, 'utf-8'));
}

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
module.exports = {
    products: (req, res) => {
        res.render('products', {
            products,
            toThousand
        })
    },
    experience: (req, res) => {
        res.render('experienceDoms')
    },
    experienceTour: (req, res) => {
        res.render('experienceTour')
    },
    experiencePatagonia: (req, res) => {
        res.render('experiencePatagonia')
    },
    details: (req, res) => {
        let { id } = req.params;
        let productId = products.filter(product => product.id === +id);
        let productsStatus = products.filter(product => product.status === "te puede interesar")

        res.render('productDetail', {
            productId,
            productsStatus,
            toThousand

        })
    },
    carrito: (req, res) => {
        let productCart = products.filter(product => product.id === +req.params.id)
        
        res.render('shopping-cart',{
            
            productCart
        })
    },
    productos: (req, res) => {
        res.render('productos', {
            products,
            toThousand
        })
    },
    edit: (req, res) => {
        let { id } = req.params;
        let productEdit = products.find(product => product.id === +id);
        res.render('form-edit', {
            productEdit
        })


    },
    update: (req, res) => {


        let { id } = req.params;
        let { name, discount, price, category, description } = req.body;
        let productsModify = products.map(product => {
            if (product.id === +id) {
                return {
                    id: product.id,
                    name: name.trim(),
                    discount: +discount,
                    price: +price,
                    category,
                    description: description.trim(),
                    image: product.image
                }

            }
            return product;

        });
        saveProducts(productsModify);
        res.redirect('/products/productDetail/' + id);

    },
    destroy: (req, res) => {

        let { id } = req.params;
        let productsModify = products.filter(product => product.id !== +id)
        saveProducts(productsModify);
        res.redirect('/products/products');

    },


    create: (req, res) => {
        res.render('form-create')
    },
    store: (req, res) => {
        const {name, price,discount,description, category} =(req.body);
        const newProduct = {
            id : products[products.length -1 ].id +1,
			name : name.trim(),
			description : description.trim(),
			price : +price,
			discount : +discount,
			category,
        }
        productsModify = [...products, newProduct]
        saveProducts(productsModify)
        
        res.redirect('/products/products');
    }


}