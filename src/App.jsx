import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Success from "./pages/Success";
import Momo from "./pages/MomoResult";
import { useSelector} from 'react-redux'
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate
} from "react-router-dom";
import './App.css'
import Account from "./pages/Account";
import AccountOrder from "./pages/AccountOrder";


const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Switch>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/products" element={<ProductList/>}/>
        <Route exact path="/products/:category" element={<ProductList/>}/>
        <Route exact path="/product/:id" element={<Product/>}/>
        <Route exact path="/login" element={
          user ? <Navigate to={-1} /> : <Login/>
        }/>
        <Route exact path="/register" element={
          user ? <Navigate to={-1} /> : <Register/>
        }/>
        <Route exact path="/logout" element={<Home/>}/>
        <Route exact path="/cart" element={<Cart/>}/>
        {user && (
          <Route exact path="/account/order/:orderId" element={<AccountOrder/>}/>
        )}
        {user && (
          <Route exact path="/account" element={<Account/>}/>
        )}
        {user && (
          <Route exact path="/success" element={<Success/>}/>
        )}
        {user && (
          <Route exact path="/resultMomo" element={<Momo/>}/>
        )}
        <Route exact path="/*" element={<Navigate to='/'/>}/>
      </Switch>
    </Router>
  )
};

export default App;