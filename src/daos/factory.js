const { configObject: {persistencia} } = require('../daos/config/configServer.js')
// const UserDaoMongo = require('./Mongo/userDaoMongo.js')

let UserDao
let ProductDao
console.log('La persistencia actual es:', persistencia)

switch (persistencia) {
    case 'MONGO':
        const ProductDaoMongo = require('./Mongo/productManagerMongo.js')
        ProductDao = ProductDaoMongo

        const UserDaoMongo = require('./Mongo/userDaoMongo.js')
        UserDao = UserDaoMongo
        break;
//--------------------------------------------------------------
    case 'MEMORY':
        
        break;
//--------------------------------------------------------------
    //NO EXISTE ESE ARCHIVO EN LA RUTA SELECCIONADA
    case 'FILE':
        const UserDaoManager = require('./File/userManager.js')
        UserDao = UserDaoManager

        const ProductDaoFile = require('./File/productManager.js')
        ProductDao = ProductDaoFile

        break;

    default:
        break;
}

module.exports = {
    ProductDao,
    UserDao
}