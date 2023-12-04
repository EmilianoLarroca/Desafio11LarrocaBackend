const fs = require('node:fs')
const ProductManager = require('./productManager.js')
// import {promises as fs} from 'fs'

const path = './src/mockDB/carts.json'
const todosLosProductos = new ProductManager

class CartManager {
    constructor() {
        this.path = path
    }

        ///Leyendo Productos
        readCarts = async () => {
            let mostrandoCarrito = await fs.promises.readFile(this.path, "utf-8")
            return JSON.parse(mostrandoCarrito);
        }
        
        //Escribiendo los productos
        writeCarts = async (carts) => {
            await fs.promises.writeFile(this.path, JSON.stringify(carts))
        }

        exist = async (id) => {
            let carts = await this.readCarts()
            return carts.find(cart => cart.id === id)
        }

        addCarts = async () => {
            let cartsOld = await this.readCarts()
            let cartsConcat = [{id : cartsOld.length+1, products : []}, ...cartsOld]
            await this.writeCarts(cartsConcat)
            return "Carrito agregado"
        }

            //Consultando productos por ID
        getCarritoById = async (id) => {
            let mostrandoCarritoPorId = await this.readCarts()
            if (mostrandoCarritoPorId.find(cart => cart.id === id)){
                console.log(mostrandoCarritoPorId.find(cart => cart.id === id))
            } else {
                console.log("¡Producto no encontrado!")
            }
        }

        addProductInCart = async(cartPid, productPid) => {
            let cartById = await this.exist(cartPid)
            if(!cartById) return "Carrito No encontrado"
            let productById = await todosLosProductos.exist(productPid)
            if(!cartById) return "Producto No encontrado"
            let cartsAll = await this.readCarts()
            let cartFilter = cartsAll.filter(cart => cart.id != cartPid)

            if(cartById.products.some(prod => prod.id === productPid)){
                let productEnElCarrito = cartById.products.find(prod => prod.id === productPid)
                productEnElCarrito.cantidad++
                let cartsConcat = [productEnElCarrito, ...cartFilter]
                await this.writeCarts(cartsConcat)
                return "Producto sumado agregado al carrito"
            }

            cartById.products.push({id : productById.id, cantidad: 1})

            let cartConcat = [cartById, ...cartFilter]
            await this.writeCarts(cartConcat)
            return "Producto agregado al carrito"
        }

}


module.exports = CartManager
