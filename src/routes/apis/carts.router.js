const { Router } = require('express')
const { cartModel } = require('../../models/carts.model.js')
const { CartDaoMongo } = require('../../daos/Mongo/cartDaoMongo.js')
// const CartManager = require("../../daos/File/cartsManager.js") 

const router = Router()
const carrito = new CartDaoMongo

router
    .get('/', async (req, res) => {
        const carts = await carrito.getCarts()
        res.send({
            status: "succes",
            carts: carts
    })
})

// .get('/', async (req, res) => {
//     let { populate } = req.query;
//     populate = populate || true
//     const resp = await carrito.getCarts(null, populate);
  
//     if (typeof resp === 'string') {
//       res.status(400).json({
//         status: 'error',
//         data: resp,
//       });
//     } else {
//       res.status(200).json({
//         status: 'ok',
//         data: resp,
//       });
//     }
//   })

    //Llamar carrito de productos
    .get('/:pid', async (req, res)=> {
        const {pid} = req.params
        const cart = await cartModel.find({_id: pid})
        res.send({
            status: 'success',
            payload: cart
        })
    })

    .post('/', async (req, res)=> {
        const newCart = req.body
        console.log(req)
        const result = await cartModel.create(newCart)
        res.send({
            status: 'success',
            payload: result
        })
    })

    .put('/', async (req, res)=> {

    })

    .delete('/:cid'), async (req, res)=> {
        
    }


module.exports = router