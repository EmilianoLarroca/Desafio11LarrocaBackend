const express = require('express') 
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')
// const ProductManager = require('./daos/File/productManager.js')
const { ProductDaoMongo } = require('./daos/Mongo/productManagerMongo.js')
const { connectDb, configObject } = require('./daos/config/configServer.js')
//Cookies - Session - Store
const cookieParser = require('cookie-parser')
const session = require('express-session')
//Session
const FileStore = require('session-file-store')
const MongoStore = require('connect-mongo')
//Passport
const passport = require('passport')
const { initializePassport } = require('./daos/config/passport.config.js')
//Routes
const appRouter = require('./routes/indexRoutes.js')
const cors = require('cors')

const app = express()
const PORT = configObject.PORT

const product = new ProductDaoMongo();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser('p4l4br4S3cr3t4'))
app.use(cors())

//middlewars de passport
initializePassport()
app.use(passport.initialize())
//Inicio de sesion con GITHUB
app.use(session({
    secret: 'p4l4br4S3cr3t4'
}))


// app.use(express.static(__dirname + '/public'))
//Archivos staticos
// app.use('/', express.static(__dirname + "/public"))

//Handlebars (Motor de Plantilla)
 app.engine('hbs', handlebars.engine({
    extname: '.hbs'
 }))
 app.set('view engine', 'hbs')
 app.set('views', __dirname + '/views')
 connectDb()

app.use(appRouter)



const serverHttp = app.listen(PORT,err =>{
    if (err)  console.log(err)
    console.log(`Escuchando puerto http://localhost:${PORT}/ `)
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

