const { Error } = require('../../services/errores/enums.js')

exports.handleError = (err, req, res, next ) => {
    switch (err.code) {
        case Error.INVALID_TYPES_ERROR:
            return res.status(400).send({status: 'error', error: err.message})
            break;

            default:
                return res.send(500).send()
            break;
    }
}