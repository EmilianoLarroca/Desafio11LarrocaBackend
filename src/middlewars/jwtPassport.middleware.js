exports.authorizationJwt = role => {
    return async (req, res, next) => {
        if(!req.user) return res.status(401).send({error: 'Desautorizado'})
        if(req.user.role !== role) return res.status(401).send({error: 'No tienes permiso'})
        next()
    }
}