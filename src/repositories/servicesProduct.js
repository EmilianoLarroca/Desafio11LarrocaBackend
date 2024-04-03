const { ProductDaoMongo } = require("../daos/Mongo/productDaoMongo");
const { ProductRepository } = require("./products.repository");


const productService = new ProductRepository(new ProductDaoMongo)

module.exports = {
    productService
}