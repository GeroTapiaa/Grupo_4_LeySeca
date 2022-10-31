module.exports = (req , res ,next) =>{
    if(req.cookies.userLeySeca){
        req.session.userLogin = req.cookies.userLeySeca
    }

    next()
}