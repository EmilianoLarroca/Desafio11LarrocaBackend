const { Router } = require('express')
const { orderModel } = require('../../daos/Mongo/models/orders.model')


const router = Router()

router.get('/', async(req, res) => {
    // const orders = await orderModel.find({})
    const orders = await orderModel.aggregate([
        //Buscar por tamaño
        {$match: {size: "medium"}},
        //Agrupar por nombre y sumar cantidad del mismo
        {$group: {_id: "$name", totalQuantity: {$sum: "$quantity"}}},
        //Ordenar
        {$sort: {totalQuantity: -1}},
        //Guardando todo dentro de un array dentro de orders
        {$group: {_id: 1, orders: {$push: "$$ROOT"}}},
        //
        {$project: {"_id": 0, orders: "$orders"}},
        //Guardar en una colección, que en este caso se llama "reports"
        {$merge: {into: "reports"}}
    ])
    res.send({
        orders
    })
})



module.exports = router
