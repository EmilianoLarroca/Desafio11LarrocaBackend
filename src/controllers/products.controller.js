// const { ProductDaoMongo } = require("../daos/Mongo/productManagerMongo")
const { productService } = require("../repositories/servicesProduct")

class ProductController {
    constructor(){
        this.service = productService
    }
    
    //GET-PRODUCTS
    getProducts = async (req, res) => {
        try {
            const products = await this.service.getProducts()
            res.send({
                status: "success",
                payload: products
        })
        } catch (error) {
            res.status(500).send({message: error.message})
    }       
}
    //GET-PRODUCT-BY-ID
    getProduct = async (req, res) => {
        try {
            const {pid} = req.params
            const product = await this.service.getProduct({_id: pid})
                res.send({
                    status: 'sucess',
                    payload: product
            }) 
        } catch (error) {
            res.status(500).send({message: error.message})
    }  
}

    //CREATE
    createProduct = async (req, res) => {
        try {
            const newProduct = req.body
                if(!newProduct.title || !newProduct.price) {
                    return res.status(400).send({status: 'error', error: "Faltan datos"})
                }
                const result = await this.service.createProduct(newProduct)
                
                res.send({status: 'success', payload: result})
            } catch(error){
                res.status(500).send({message: error.message})
            }
    } 
    //UPDATE
    updateProduct = async  (req, res ) => {
        try {
            const pid = parseInt(req.params.pid)
            const actualizandoProduct = req.body
            const result = await this.service.updateProduct(pid, actualizandoProduct)
                res.send({status: 'success', payload: result})
        } catch (error) {
            res.status(500).send({message: error.message})
    }
} 
    //DELETE
    deleteProduct = async (req, res) => {
        try {
            const pid = parseInt(req.params.pid)
            const eliminandoProduct = await this.service.deleteProductsById(pid)
                res.send({
                    status: 'sucess',
                    payload: eliminandoProduct
            }) 
        } catch (error) {
            res.status(500).send({message: error.message})
    }
}

}

module.exports = ProductController