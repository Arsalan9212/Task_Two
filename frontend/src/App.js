import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Cart from './component/cart';
import Product from './component/home';
import CreateOrder from './component/createOrder';
import Navb from './component/navBar';
import NotFound from './component/notfound';

import Products from './component/admin/product';
import CreateProduct from './component/admin/createProduct';
import EditForm from './component/admin/editProduct';
import Order from './component/admin/order';
import SignIn from './component/signUp';
import LogIn from './component/login';

import ProtectedRoute from './protected';
import PublicRoute from './publicRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Navb />
        <Routes>
          <Route path="/signup" element={<PublicRoute component={SignIn} />} />
          <Route path="/login" element={<PublicRoute component={LogIn} />} />
          {/* <Route path="/login" element={<ProtectedRoute Component={LogIn} />} /> */}

          {/*admin route */}

          <Route
            path="/admin"
            element={<ProtectedRoute component={Products} />}
          />
          {/* <Route path="/admin" element={<Products />} /> */}
          <Route path="/order" element={<Order />} />
          <Route path="/createProduct" element={<CreateProduct />} />
          <Route path="/editProduct/:id" element={<EditForm />} />

          {/*public route */}
          <Route path="/" element={<ProtectedRoute component={Product} />} />

          {/* <Route path="/" element={<Product />} /> */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/createOrder" element={<CreateOrder />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
