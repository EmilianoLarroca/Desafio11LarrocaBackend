const { Router } = require('express') 

const router = Router()

const productMock = [
    {id: "1", name: "Hamburguesa", price: "100"},
    {id: "2", name: "Panchos", price: "50"},
    {id: "3", name: "Papas fritas", price: "200"},
    {id: "4", name: "Hamburguesa completa", price: "175"},
    {id: "5", name: "Combo completo", price: "350"}
]

router.get('/', (req, res) => {
    res.render('index', {
        title: "Mercado Online",
        name: "Emiliano",
        style: "index.css"
    })
})

router.get('/prod', (req, res) => {
    const userMock = {
        title: "Productos",
        name: "Emiliano",
        role: "admin"
    }

    res.render('products', {
        title: userMock.title,
        name: userMock.name,
        isAdmin: userMock.role === 'admin',
        products: productMock,
        style: "products.css"
    })
})

module.exports = router
