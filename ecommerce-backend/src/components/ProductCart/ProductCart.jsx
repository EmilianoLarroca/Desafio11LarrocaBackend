import { Link } from "react-router-dom"

const ProductCart = ({product}) => {
  return (
    <div className="card w-25 m-3">
      <div className="card-body">
        <img src={product.thumbnail} className="card-img-top"alt="imagen" />
        <h3>{product.title}</h3>
        <p>Categoria: {product.category}</p>
        <p>Stock: {product.stock}</p>
        <p>Precio: {product.price}</p>
        <p>Descripción: {product.description}</p>
      </div>
      <div className="card-footer">
        <Link to={`/detalle/${product._id}`} className="btn btn-outline-dark w-100">Ver más</Link>
      </div>
    </div>
  )
}

export default ProductCart