//PROBANDO REACT JS (FORMA DE TRAER LOS PRODUCTOS AL FRONT DESDE EL BACK)
const getProducts = async () => {
    const datosJson = await fetch('http://localhost:8080/api/products')
    const datos = await datosJson.json()
    console.log(datos.payload)
}

const divRoot = document.querySelector('#root')
getProducts()