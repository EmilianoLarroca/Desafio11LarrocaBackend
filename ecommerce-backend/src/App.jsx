import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes ,Route} from 'react-router-dom'
import './App.css'
import { ProductsPage } from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {

  return (
    <Router>
      <h1>Bienvenidos a "Ecommerce Backend"</h1>
      <Routes>
        <Route path='/' element={<ProductsPage />}/>
        <Route path='/detalle/:pid' element={<ProductDetailPage />}/>
      </Routes>
    </Router>
  )
}

export default App
