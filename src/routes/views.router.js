const { Router } = require('express') 
// const ProductManager = require('../daos/File/productManager.js')
const { ProductDaoMongo } = require('../daos/Mongo/productManagerMongo.js')
const { MessageManager } = require('../daos/Mongo/messagesManagerMongo.js')
const { usersModel } = require('../models/users.model.js')

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

//Vistas de Usuarios HBS
router.get('/users', async(req, res)=>{
    const { numPage, limit=10 } = req.query
    const {
        docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page
    } = await usersModel.paginate({}, {limit, page: numPage, lean: true})
    res.render('users', {
        users: docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page
    })
})


module.exports = router
