const { productModel } = require("../../models/products.model.js")

class ProductDaoMongo {
    constructor(){
        this.model = productModel
    }

    async getProducts(){
        return await this.model.find().lean()
    }

    async getProduct(pid){
        return await this.model.findById({_id: pid})
    }

    async addProduct(newProduct){
        return await this.model.create(newProduct)
    }

    async updateProduct(pid, productToUpdate){
        return this.model.findByIdAndUpdate({_id: pid, productToUpdate})
    }

    async deleteProduct(pid){
        return this.model.findByIdAndDelete(pid)
    }

}

module.exports = {
    ProductDaoMongo
}