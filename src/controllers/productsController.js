module.exports = {
    details: (req, res) => {
        res.render('productDetail')
    },
    carrito: (req, res) => {
        res.render('carrito')
    },
    productos: (req, res) => {
        res.render('productos')
    },
    experiencias: (req, res) => {
        res.render('experiencias')
    }


}