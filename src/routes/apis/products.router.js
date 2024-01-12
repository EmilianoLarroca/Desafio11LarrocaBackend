const { Router } = require('express')
const { ProductDaoMongo } = require('../../daos/Mongo/productManagerMongo.js')

//Esto era FS
// const ProductManager = require('../../daos/File/productManager')
// const productsService = new ProductManager() // manager viejo

const router = Router()
const productsService = new ProductDaoMongo()

router
    //Buscando producto 
    .get('/', async (req, res) => {
        try {
            const products = await productsService.getProducts()
            res.send({
                status: "success",
                payload: products
        })
        } catch (error) {
            console.log(error)
    }       
})

    //Buscando producto por ID
    .get('/:pid', async (req, res) => {
        try {
            const pid = parseInt(req.params.pid)
            const product = await productsService.getProductsById(pid)
                res.send({
                    status: 'sucess',
                    payload: product
            }) 
        } catch (error) {
            console.log(error)
    }  
}
            
)

    //Enviando, creando producto por ID
//     .post('/', async (req, res) => {
//         try {
//             const newProduct = req.body
//                 res.send(await productsService.addProduct(newProduct))

//             const result = await productsService.addProduct(newProduct)

//             res.send({status: 'success', payload: result})
//         } catch (error) {
//             console.log(error)
//         }
              
// } )

.post('/', async (req, res) => {
    try {
        const newProduct = req.body
            if(!newProduct.title || !newProduct.price) {
                return res.status(400).send({status: 'error', error: "Faltan datos"})
            }
            const result = await productsService.addProduct(newProduct)
            res.send({status: 'success', payload: result})
        } catch(error){
            console.log(error)
        }
} )

    //Modificando producto por ID
    .put('/:pid', async (req, res) => {
        try {
            const pid = parseInt(req.params.pid)
            const actualizandoProduct = req.body
                res.send(await productsService.updateProducts(pid, actualizandoProduct))
        } catch (error) {
            console.log(error)
    }
} )

    //Eliminando producto por ID
    .delete('/:pid', async (req, res) => {
        try {
            const pid = parseInt(req.params.pid)
            const eliminandoProduct = await productsService.deleteProductsById(pid)
                res.send({
                    status: 'sucess',
                    payload: eliminandoProduct
            }) 
        } catch (error) {
            console.log(error)
    }
})

module.exports = router