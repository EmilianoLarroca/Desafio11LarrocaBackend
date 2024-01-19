const express = require('express') 
const productsRouter = require('./routes/apis/products.router.js')
const cartsRouter = require('./routes/apis/carts.router.js')
const ordersRouter = require('./routes/apis/orders.router.js')
const viewsRouter = require('./routes/views.router.js')
const handlebars = require('express-handlebars')
const userRouter = require('./routes/apis/users.router.js')
const sessionRouter = require('./routes/apis/session.router.js')
const { Server } = require('socket.io')
// const ProductManager = require('./daos/File/productManager.js')
const { ProductDaoMongo } = require('./daos/Mongo/productManagerMongo.js')
const { connectDb } = require('./daos/config/configServer.js')
//Cookies - Session - Store
const cookieParser = require('cookie-parser')
const session = require('express-session')
//Session
const FileStore = require('session-file-store')
const MongoStore = require('connect-mongo')
//Passport
const passport = require('passport')
const { initializePassport } = require('./daos/config/passport.config.js')


const app = express()
const PORT = 8080
const product = new ProductDaoMongo();
connectDb()


app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Persistencia de session con MONGO
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://emixlarroca05:pxKdSVcgNezuW7xd@cluster0.jdsonmm.mongodb.net/ecommerce?retryWrites=true&w=majority',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        ttl: 1500000000
    }),
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true
}))

//middlewars de passport
initializePassport
app.use(passport.initialize())
app.use(passport.session())

// app.use(express.static(__dirname + '/public'))
//Archivos staticos
// app.use('/', express.static(__dirname + "/public"))

//Handlebars (Motor de Plantilla)
 app.engine('hbs', handlebars.engine({
    extname: '.hbs'
 }))
 app.set('view engine', 'hbs')
 app.set('views', __dirname + '/views')


app.use('/api/products', productsRouter) //Productos
app.use('/views', viewsRouter) //Views
app.use('/api/carts', cartsRouter) //Carrito
app.use('/api/users', userRouter) //Usuarios (CRUD de user)
app.use('/api/orders', ordersRouter) //Ordenes
app.use('/api/sessions', sessionRouter) //Cookies (Login - Register - Logout)
app.use(cookieParser('p4l4br4S3cr3t4'))


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

