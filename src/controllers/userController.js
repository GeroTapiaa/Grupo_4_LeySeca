module.exports = {
    login: (req, res) => {
        res.render('user/login')
    },
    register: (req, res) => {
        res.render('user/register')
    },
    profile: (req, res) => {
        res.render('user/profile')
    },
    update: (req, res) => {
        res.send(req.body)
    },
    edit: (req, res) => {
        res.render('user/profileEdit')
    }

}