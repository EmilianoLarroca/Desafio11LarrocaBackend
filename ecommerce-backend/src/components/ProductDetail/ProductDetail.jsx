

 function ProductDetail({product}) {
  return (
    <div>
        <h1>{product.title}</h1>
        <p>Descripción: {product.description}</p>
        <p>Precio: {product.price}</p>
        <p>Stock: {product.stock}</p>
        <p>{product.thumbnail}</p>
    </div>
  )
}

export default ProductDetail