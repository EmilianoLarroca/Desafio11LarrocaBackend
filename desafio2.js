import {promises as fs} from "fs";

class ProductManager {
    constructor() {
        this.patch = "./productoss.json"
        this.productos = []
    }

    static id = 0

    //Agregando productos
    addProduct = async ( title, description, price, thumbnail, code, stock) => {
        ProductManager.id++
        let newProduct = {
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock,
            id: ProductManager.id
        }
        this.productos.push(newProduct)
        await fs.writeFile(this.patch, JSON.stringify(this.productos, null, 2))
    }

    readProducts = async () => {
        let mostrandoProductos = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(mostrandoProductos);
    }
    
    //Consultando productos
    getProducts = async () => {
        let mostrandoProductos2 = await this.readProducts()
    return console.log(mostrandoProductos2)
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
        let productoFiltrado = mostrandoProductosParaEliminar.filter(producto => producto.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productoFiltrado, null, 2))
        console.log("El producto seleccionado por ID fue eliminado")
    }

    //Modificar productos sin cambiar su ID
    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById(id);
        let productosEnBase = await this.readProducts();
        let productoModificado = [{... producto, id}, ... productosEnBase]
        await fs.writeFile(this.patch, JSON.stringify(productoModificado, null, 2))
    }

}

const productos = new ProductManager();

//Información de los productos que quiero agregar
// productos.addProduct("titulo1", "descripcion del titulo", 1200, "imagen1", "asb123", 10);
// productos.addProduct("titulo2", "descripcion del titulo2", 1200, "imagen2", "asb1234", 9);
// productos.addProduct("titulo3", "descripcion del titulo3", 1200, "imagen3", "asb1235", 5);
// productos.addProduct("titulo4", "descripcion del titulo4", 1200, "imagen4", "asb1236", 6);

//Mostrar los productos - Consultando
// productos.getProducts();

//Mostrar los productos - Consultando por ID (colocar un numero como parametro)
// productos.getProductsById();

//Eliminando el producto por ID (colocar un numero como parametro)
// productos.deleteProductsById();

//Modificando los productos sin cambiar su ID (eligiendo un ID para pisar el resto de datos)
// productos.updateProducts({
//     title: 'titulo10',
//     description: 'descripcion del titulo10',
//     price: 50000,
//     thumbnail: 'imagen2',
//     code: 'asb1234',
//     stock: 9,
//     id: 4
// });