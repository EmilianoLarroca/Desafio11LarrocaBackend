const { Router } = require('express')
const ProductController = require('../../controllers/products.controller')

const router = Router()
const productController = new ProductController

router
    //Buscando producto 
    .get('/', productController.getProducts)

    //Buscando producto por ID
    .get('/:pid', productController.getProduct)

    .post('/', productController.createProduct)

    //Modificando producto por ID
    .put('/:pid', productController.updateProduct)

    //Eliminando producto por ID
    .delete('/:pid', productController.deleteProduct)

module.exports = router