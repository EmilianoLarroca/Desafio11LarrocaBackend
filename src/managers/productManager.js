const fs = require('node:fs')
// import {promises as fs} from 'fs'

const path = './src/mockDB/productos.json'

class ProductManager {
    constructor() {
        this.path = path
    }

    ///Leyendo Productos
    readProducts = async () => {
        let mostrandoProductos = await fs.promises.readFile(this.path, "utf-8")
        return JSON.parse(mostrandoProductos);
    }
    
    //Escribiendo los productos
    writeFile = async (product) => {
        await fs.promises.writeFile(this.path, JSON.stringify(product, null, 2))
    }

    //Agregando productos
    addProduct = async (product) => {
        let productOld = await this.readProducts()
        let productAll = [...productOld, product]
        await this.writeFile(productAll)
        return "Producto Agregado"
}
    //Consultando productos
    getProducts = async () => {
        try {
            let mostrandoProductos2 = await this.readProducts()
            return await mostrandoProductos2
        } catch (error) {
            return ("No se encontraron productos", error)
        }
        
}

    //Consultando productos por ID
    getProductsById = async (id) => {
        let mostrandoProductosPorId = await this.readProducts()
            if (mostrandoProductosPorId.find(producto => producto.id === id)){
                console.log(mostrandoProductosPorId.find(producto => producto.id === id))
            } else {
                console.log("¡Producto no encontrado!")
            }
        }

    //Eliminando productos por ID
    deleteProductsById = async (id) => {
        let mostrandoProductosParaEliminar = await this.readProducts();
        let productoExistente = mostrandoProductosParaEliminar.some(producto => producto.id === id)
        if (productoExistente) {
        let productoFiltrado = mostrandoProductosParaEliminar.filter(producto => producto.id != id)
        await fs.promises.writeFile(this.path, JSON.stringify(productoFiltrado, null, 2))
        return "El producto seleccionado por ID fue eliminado"
        }  return "El producto a eliminar no existe"
    }

    //Modificar productos sin cambiar su ID
    // updateProducts = async ({id, ...producto}) => {
    //     await this.deleteProductsById(id);
    //     let productosEnBase = await this.readProducts();
    //     let productoModificado = [{... producto, id}, ... productosEnBase]
    //     await fs.promises.writeFile(this.path, JSON.stringify(productoModificado, null, 2))
    // }


    exist = async (id) => {
        let productosPorID = await this.readProducts()
        return productosPorID.find(producto => producto.id === id)
    }

    updateProducts = async (id, producto) => {
        let productoById = await this.exist(id)
        if(!productoById) return "Producto no encontrado"
        await this.deleteProductsById(id);
        let productOld = await this.readProducts();
        let productoModificado = [{...producto, id : id}, productOld]
        await this.writeFile(productoModificado)
        return "Producto actualizado"
    }
}


module.exports = ProductManager