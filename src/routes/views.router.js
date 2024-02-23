const { Router } = require('express') 
// const ProductManager = require('../daos/File/productManager.js')
const { ProductDaoMongo } = require('../daos/Mongo/productManagerMongo.js')
const { MessageManager } = require('../daos/Mongo/messagesManagerMongo.js')
const { usersModel } = require('../models/users.model.js')
const { authetication } = require('../middlewars/atuh.middlewars.js')

const router = Router()
// const path = './src/mockDB/productos.json'
const product = new ProductDaoMongo()
const chat = new MessageManager()


//Trayendo productos con handlebars
router.get("/", async (req, res) => {
    let allProducts = await product.get()
    res.render("index", {
    title: "Productos",
    productos: allProducts})
})

//Trayendo productos en tiempo real
router.get('/realtimeproducts', async (req, res)=> {
    let allProducts = await product.getBy()

    res.render("realTimeProducts", {
        title: "Productos en Tiempo Real",
        allProducts})
})

//Vistas de Usuarios HBS
router.get('/users', authetication, async(req, res)=>{
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

router.get('/register', async (req, res)=> {
    res.render('register')
})

router.get('/login', async (req, res)=> {
    res.render('login')
})


module.exports = router
