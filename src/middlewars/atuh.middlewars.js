function authetication(req, res, next) {
    if(!req.session.user.admin) {
        return res.status(401).send('error de autentificacion')
    }
    next()

}


module.exports = {
    authetication
}