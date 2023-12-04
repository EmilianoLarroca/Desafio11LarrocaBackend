const express = require('express') 
const productsRouter = require('./routes/apis/products.router.js')
const cartsRouter = require('./routes/apis/carts.router.js')
const viewsRouter = require('./routes/views.router.js')
const handlebars = require('express-handlebars')


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))
// app.use('/', viewsRouter)

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

//Levantando Servidor
app.listen(8080, () => {
    console.log('Servidor Funcionando!')
})