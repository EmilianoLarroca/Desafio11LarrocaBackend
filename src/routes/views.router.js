const { Router } = require('express') 
const ProductManager = require('../managers/productManager.js')

const router = Router()
const path = './src/mockDB/productos.json'
const product = new ProductManager(path);


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
