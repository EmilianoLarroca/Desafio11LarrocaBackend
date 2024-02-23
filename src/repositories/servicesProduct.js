const { ProductDaoMongo } = require("../daos/Mongo/productManagerMongo");
const { ProductRepository } = require("./products.repository");


const productService = new ProductRepository(new ProductDaoMongo)

module.exports = {
    productService
}