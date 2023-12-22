import express from "express";
import ProductManager from "./components/ProductManager.js";

const app = express();
app.use(express.urlencoded({ extended : true }));

const productos = new ProductManager();
const traerProducts = productos.readProducts();

//Buscando productos y filtrando por limite
app.get('/products', async (req, res)=> {
    let limit = parseInt(req.query.limit)
    if(!limit) {
        return res.send(await traerProducts)
    }
    let todosLosProductos = await traerProducts
    let productoLimit = todosLosProductos.slice(0, limit)
    res.send(await productoLimit)
})

//Buscando productos por ID
app.get('/products/:id', async (req, res)=> {
    let id = parseInt(req.params.id)
    let todosLosProductos = await traerProducts
    let productsById = todosLosProductos.find(prod => prod.id === id)
    res.send(productsById)
})

