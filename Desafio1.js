// const fs = require('fs');

// class ProductManager {
//     constructor(){
//         this.products = [];
//     }

//     static id = 0

//     addProduct(title, description, price, thumbnail, code, stock){

//         for (let i = 0; i < this.products.length; i++){
//             if(this.products[i].code === code) {
//                 console.log(`El codigo "${code}" esta repetido`);
//                 break;
//             }
//         }


//         const newProduct = {
//             title, 
//             description, 
//             price, 
//             thumbnail, 
//             code, 
//             stock,
//         }

//         if(!Object.values(newProduct).includes(undefined)){
//             ProductManager.id++
//             this.products.push({
//                 ...newProduct, 
//                 id:ProductManager.id
//          });
//         } else {
//             console.log("Debes completar todos los campos obligatorios")
//         }
//     }

//     getProducts(){
//         return this.products;
//     }

//     existe(id) {
//         return this.products.find((producto)=> producto.id === id)
//     }

//     getProductById(id) {
//         !this.existe(id) ? console.log("Not Found") : console.log(this.existe(id)) 
//     }

//     consultarUsuarios(){
        
//     }
// }

// const productos = new ProductManager;

// //Productos agregados
// productos.addProduct('titulo1', 'descripcion1', 1000, "imagen1", "abc123", 13);
// productos.addProduct('titulo2', 'descripcion2', 1500, "imagen2", "abc1234", 25);

// //Ejemplo de codigo repetido
// productos.addProduct('titulo3', 'descripcion3', 3210, "imagen3", "abc1234", 22);

// //Ejemplo de campos imcompletos
// productos.addProduct('titulo4', 'descripcion4', 4500, "imagen4", 22);

// //Buscando por ID
// // productos.getProductById(1)

// //Llamado
// console.log(productos.getProducts());