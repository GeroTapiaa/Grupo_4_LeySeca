module.exports = (req , res ,next) =>{
    if(req.cookies.userLeySeca){
        req.session.userLoggin = req.cookies.userLeySeca
    }

    next()
}