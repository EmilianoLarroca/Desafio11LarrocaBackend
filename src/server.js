const express = require('express') 
const productsRouter = require('./routes/apis/products.router.js')
const cartsRouter = require('./routes/apis/carts.router.js')
const ordersRouter = require('./routes/apis/orders.router.js')
const viewsRouter = require('./routes/views.router.js')
const handlebars = require('express-handlebars')
const userRouter = require('./routes/apis/users.router.js')
const { Server } = require('socket.io')
// const ProductManager = require('./daos/File/productManager.js')
const { ProductDaoMongo } = require('./daos/Mongo/productManagerMongo.js')
const { connectDb } = require('./daos/config/configServer.js')


const app = express()
const PORT = 8080
const product = new ProductDaoMongo();
connectDb()


app.use(express.json())
app.use(express.urlencoded({extended: true}))

// app.use(express.static(__dirname + '/public'))
//Archivos staticos
// app.use('/', express.static(__dirname + "/public"))

//Handlebars (Motor de Plantilla)
 app.engine('hbs', handlebars.engine({
    extname: '.hbs'
 }))
 app.set('view engine', 'hbs')
 app.set('views', __dirname + '/views')

//Productos
app.use('/api/products', productsRouter)
//Views
app.use('/views', viewsRouter)
//Carrito
app.use('/api/carts', cartsRouter)
//Usuarios
app.use('/api/users', userRouter)
//Ordenes
app.use('/api/orders', ordersRouter)



app.use(( err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send('error de server')
})

const serverHttp = app.listen(PORT,err =>{
    if (err)  console.log(err)
    console.log(`Escuchando puerto http://localhost:${PORT}/views `)
})

// Servidor WebSocket
const socketServer = new Server(serverHttp)

socketServer.on('connection', async (socket) => {
    console.log("nuevo cliente conectado")
    const products = await product.getProducts()

    socketServer.emit('listaDeProductos', products)
    socket.on("realTimeProducts", async data => {
        await product.addProduct(data)
    })
})

