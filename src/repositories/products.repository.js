class ProductRepository {
    constructor(dao){
        this.dao = dao

    }

    getProducts    = async () => await this.dao.get()
    getProduct     = async (filter) => await this.dao.getBy(filter)
    createProduct  = async (newProduct) => await this.dao.create(newProduct)
    updateProduct  = async (pid, productToUpdate) => await this.dao.updateProduct(pid, productToUpdate)
    deleteProduct  = async (pid) => await this.dao.deleteProduct(pid)
} 

module.exports = {
    ProductRepository
}