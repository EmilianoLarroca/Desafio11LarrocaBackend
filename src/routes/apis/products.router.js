const { Router } = require('express')
const ProductManager = require('../../managers/productManager')

const router = Router()
const productsService = new ProductManager()

router
    //Buscando producto 
    .get('/', async (req, res) => {
        const products = await productsService.getProducts()
        res.send({
            status: "success",
            payload: products
        })
            
} )

    //Buscando producto por ID
    .get('/:pid', async (req, res) => {
        const pid = parseInt(req.params.pid)
        const product = await productsService.getProductsById(pid)
        res.send({
                status: 'sucess',
                payload: product
            }) 
        }
            
)

    //Enviando, creando producto por ID
    .post('/', async (req, res) => {
        const newProduct = req.body
            res.send(await productsService.addProduct(newProduct))      
} )

    //Modificando producto por ID
    .put('/:pid', async (req, res) => {
        const pid = parseInt(req.params.pid)
        const actualizandoProduct = req.body
        res.send(await productsService.updateProducts(pid, actualizandoProduct))
} )

    //Eliminando producto por ID
    .delete('/:pid', async (req, res) => {
        const pid = parseInt(req.params.pid)
        const eliminandoProduct = await productsService.deleteProductsById(pid)
        res.send({
                status: 'sucess',
                payload: eliminandoProduct
            }) 
        })

module.exports = router