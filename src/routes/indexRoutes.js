const { Router } = require('express')
const userRouter = require('./apis/users.router.js')
const sessionRouter = require('./apis/session.router.js')
const productsRouter = require('./apis/products.router.js')
const cartsRouter = require('./apis/carts.router.js')
const ordersRouter = require('./apis/orders.router.js')
const viewsRouter = require('./views.router.js')
const emailRouter = require('./apis/mail.router.js')

const router = Router()

router.use('/', viewsRouter) //Views
router.use('/api/products', productsRouter) //Productos
router.use('/api/carts', cartsRouter) //Carrito
router.use('/api/users', userRouter) //Usuarios (CRUD de user)
router.use('/api/orders', ordersRouter) //Ordenes
router.use('/api/sessions', sessionRouter) //Cookies (Login - Register - Logout)
router.use('/api/', emailRouter)

//Cualquier ruta que no este definida, te lleva a esta ruta (COMODIN se le llama a este ruteo)
router.use('*', (req, res)=>{
    res.status(404).send('¡No existe la ruta buscada! "Ingrese nuevamente o corrobore los datos"')
})

router.use(( err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send('error de server')
})


module.exports = router