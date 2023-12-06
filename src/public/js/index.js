const socket = io()

socket.emit('recibirMensajeCliente', 'estoy usando scoket')

let productPost = document.getProductsById("productPost")
let productInputTitle = document.getProductsById("productInputTitle")
let productInputPrice = document.getProductsById("productInputPrice")
let btnProduct = document.getProductsById("btnProduct")

btnProduct.addEventListener("click", function () {
    socket.emit("realTimeProducts", {
        title: productInputTitle.value,
        price: productInputPrice.value,
        description: "Este producto es de prueba",
        thumnbail: "Sin imagen",
        code: "abcde112323",
        stock: 100
    })

})


socket.on("listaDeProductos", (data) => {
    nuevaListaDeProd(data)
})

function nuevaListaDeProd(listadoProductos) {
    const listProducts = document.getProductsById("listProducts")
let li = ""
listadoProductos.forEach((el)=> {
    li += `<li>
    <h2>${el.title}</h2>
    <h3>precio: ${el.price}</h3>
    <p>${el.description}</p>
    </li>`
})
listProducts.innerHTML = li
}


