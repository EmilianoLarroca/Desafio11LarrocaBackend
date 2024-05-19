const { Router } = require('express') 
// const ProductManager = require('../daos/File/productManager.js')
const { ProductDaoMongo } = require('../daos/Mongo/productDaoMongo.js')
const { MessageManager } = require('../daos/Mongo/messagesManagerMongo.js')
const { usersModel } = require('../daos/Mongo/models/users.model.js')
const { productModel } = require('../daos/Mongo/models/products.model.js')
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

//Trayendo UN producto 
router.get("/product/:uid", async (req, res) => {
    let products = await product.getBy(req.params)
    console.log(products)
    res.render("product", {
    title: "Producto",
    productos: products})
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

//VISTA DE REGISTRO (SI LA PERSONA ENTRE A /REGISTER)
router.get('/register', async (req, res)=> {
    //CON EL RES(RESPUESTA) RENDERIZAMOS Y MOSTRAMOS LA VISTA REGISTER
    res.render('register', {
        title: "Registrarse"})
})

router.get('/login', async (req, res)=> {
    res.render('login', {
        title: "Iniciar Sesión"})
})

router.get('/logout', async (req, res)=> {
    res.render('/', {
        title: "Sesión Cerrada"})
})

router.get('/panel', async (req, res)=> {
    console.log(req.body)
    let allProducts = await product.get()
    res.render('formAgregarProductos', {
        title: "Panel de Administrador",
        productos: allProducts})
})

router.post('/panel/add', async (req, res)=> {
    const addProduct = await product.create(req.body)
    console.log(addProduct)
    res.render('formAgregarProductos', {
        title: "Panel de Administrador"})
})

router.post('/panel/update', async (req, res)=> {
    const addProduct = await product.create(req.body)
    console.log(addProduct)
    res.render('formAgregarProductos', {
        title: "Panel de Administrador"})
})

router.post('/panel/delete', async (req, res)=> {
    console.log(req.body)
    // const deleteProduct = await product.create(req.body)
    // console.log(deleteProduct)
    res.render('formAgregarProductos', {
        title: "Panel de Administrador"})
})

router.get('/carts', async (req, res)=> {
    res.render('cart', {
        title: "Carrito"})
})



module.exports = router
