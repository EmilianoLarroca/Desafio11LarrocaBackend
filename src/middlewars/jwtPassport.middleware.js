//PRIMER MIDDLEWARE
exports.authorizationJwt = role => {
    return async (req, res, next) => {
        if(!req.user) return res.status(401).send({error: 'Desautorizado'})
        if(req.user.role !== role) return res.status(401).send({error: 'No tienes permiso'})
        next()
    }
}


//Nuevo middleware de autorizacion hecho en la clase 24 (de momento no funciona)
// exports.authorizationJwt = roleArray => {
//     return async (req, res, next) => {
//         try {
//             if(!req.user) return res.status(401).send({error: 'Desautorizado'})
//             // if(req.user.role.toUpperCase === role) return res.status(403).send({status: 'error', error: 'No tienes permiso'})
//             // if(roleArray[0] === 'PUBLIC') return next()
//             if(!roleArray.includes(req.user.role.toUpperCase === roleArray)) return res.status(403).send({status: 'error', error: 'No tienes permiso'})
//             next()
//         } catch (error) {
//             next(error)
//         }
//     }
// }