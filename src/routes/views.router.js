const { Router } = require('express') 
// const ProductManager = require('../daos/File/productManager.js')
const { ProductDaoMongo } = require('../daos/Mongo/productManagerMongo.js')
const { MessageManager } = require('../daos/Mongo/messagesManagerMongo.js')

const router = Router()
// const path = './src/mockDB/productos.json'
const product = new ProductDaoMongo()
const chat = new MessageManager()



//Trayendo productos con handlebars
router.get("/", async (req, res) => {
    let allProducts = await product.getProducts()
    res.render("index", {
    title: "Productos",
    productos: allProducts})
})

//Trayendo productos en tiempo real
router.get('/realtimeproducts', async (req, res)=> {
    let allProducts = await product.getProducts()

    res.render("realTimeProducts", {
        title: "Productos en Tiempo Real",
        allProducts})
})


module.exports = router
