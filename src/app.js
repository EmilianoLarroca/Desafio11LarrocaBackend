const cluster = require('cluster')
const { cpus } = require('os')
const { appListen } = require("./server.js")
const { logger } = require('./utils/logger.js')


console.log('Process is primary: ',cluster.isPrimary)

const numeroDeProcesadores = cpus().length
// console.log(numeroDeProcesadores)



if (cluster.isPrimary) {
    logger.info('Proceso primario, que va a generar workers')
    //Vamos a crear un proceso por cada hilo de nuestro cpu
    for (let i = 0; i < numeroDeProcesadores; i++) {
        cluster.fork()
    }

    cluster.on('message', worker => {
        console.log(`Mensaje recibido de el worker ${worker.process.pid}`)
    })
} else {
    logger.info('El ser un workers, no cuento como primario, por lo tanto process.isPrimary = falso')
    logger.info(`Soy un proceso worker con el id ${process.pid}`)

    appListen()
}












// import express from "express";
// import ProductManager from "./components/ProductManager.js";

// const app = express();
// app.use(express.urlencoded({ extended : true }));

// const productos = new ProductManager();
// const traerProducts = productos.readProducts();

// //Buscando productos y filtrando por limite
// app.get('/products', async (req, res)=> {
//     let limit = parseInt(req.query.limit)
//     if(!limit) {
//         return res.send(await traerProducts)
//     }
//     let todosLosProductos = await traerProducts
//     let productoLimit = todosLosProductos.slice(0, limit)
//     res.send(await productoLimit)
// })

// //Buscando productos por ID
// app.get('/products/:id', async (req, res)=> {
//     let id = parseInt(req.params.id)
//     let todosLosProductos = await traerProducts
//     let productsById = todosLosProductos.find(prod => prod.id === id)
//     res.send(productsById)
// })




