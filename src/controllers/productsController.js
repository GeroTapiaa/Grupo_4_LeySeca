module.exports = {
    details: (req, res) => {
        res.render('productDetail')
    },
    carrito: (req, res) => {
        res.render('carrito')
    },
    create: (req ,res) =>{
         res.render('form-create')
    },
    store : (req ,res) =>{
        res.render('form-edit')
    }
}