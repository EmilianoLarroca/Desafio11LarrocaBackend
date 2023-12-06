const express = require('express') 
const productsRouter = require('./routes/apis/products.router.js')
const cartsRouter = require('./routes/apis/carts.router.js')
const viewsRouter = require('./routes/views.router.js')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')
const ProductManager = require('./managers/productManager')



const app = express()
const PORT = 8080
const product = new ProductManager();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

//Handlebars (Motor de Plantilla)
 app.engine('hbs', handlebars.engine({
    extname: '.hbs'
 }))
 app.set('view engine', 'hbs')
 app.set('views', __dirname + '/views')

//Archivos staticos
app.use('/', express.static(__dirname + "/public"))

//Productos
app.use('/api/products', productsRouter)

//Views
app.use('/views', viewsRouter)

//Carrito
app.use('/api/carts', cartsRouter)



//Levantando Servidor-este es antiguo-
// const serverHttp = app.listen(8080, () => {
//     console.log('Servidor Funcionando!')
// })

app.use(( err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send('error de server')
})

const serverHttp = app.listen(PORT,err =>{
    if (err)  console.log(err)
    console.log(`Escuchando en el puerto ${PORT}`)
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




// const productosWebSocket = new ProductManager
// socketServer.on('connection', io => {
//     console.log('nuevo cliente conectado')



    // socket.on('recibirMensajeCliente', data => {
    //     console.log(data)
    // })

    // socket.emit('solo-para-el-actual', 'Este lo debe recibir solo el actual')

    // socket.broadcast.emit('para-todos-menos-el-actual', 'Este evento lo vera todos los conectados')

    //ESTE SIRVE PARA ENVIAR PRODUCTOS
    // socketServer.emit('todosLosProductos', 'es para todos')

// })