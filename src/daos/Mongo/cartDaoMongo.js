const { cartModel } = require('../../models/carts.model.js')
const  { ProductDaoMongo } = require('./productManagerMongo.js')
const products = new ProductDaoMongo

class CartDaoMongo {
    constructor() {
    this.model = cartModel
    }

    
}

    
module.exports = {
    CartDaoMongo
}