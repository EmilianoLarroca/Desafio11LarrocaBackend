import ProductCart from "../ProductCart/ProductCart.jsx"

export const ProductsList = ({products}) => {
  return (
    <div>
        {(products.map(product => <ProductCart key={product._id} product={product}/>))}
    </div>
  )
}
