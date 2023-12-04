const { Router } = require('express')
const CartManager = require("../../managers/cartsManager.js") 

const router = Router()
const carts = new CartManager

router.post("/", async (req, res) => {
    res.send(await carts.addCarts())
})

router.get("/", async (req, res) => {
    res.send(await carts.readCarts())
})

router.get("/:pid", async (req, res) => {
    const pid = parseInt(req.params.pid)
    res.send(await carts.getCarritoById(pid))
})

router.post("/:cid/products/:pid", async (req, res) => {
    const cartPid = parseInt(req.params.cid)
    const productPid = parseInt(req.params.pid)
    res.send(await carts.addProductInCart(cartPid, productPid))
})

module.exports = router