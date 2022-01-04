import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Success from "./pages/Success";
import { useSelector} from 'react-redux'
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate
} from "react-router-dom";

//demo react stripe
// import Pay from "./demoReactStripe/Pay";
// import Success from "./demoReactStripe/Success";

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
          user ? <Navigate to="/" /> : <Login/>
        }/>
        <Route exact path="/register" element={
          user ? <Navigate to="/" /> : <Register/>
        }/>
        <Route exact path="/cart" element={<Cart/>}/>
        <Route exact path="/success" element={<Success/>}/>
        <Route path="*" element={<Navigate to='/'/>}/>
      </Switch>
    </Router>


    // <>
    // <h1>Demo React Stripe</h1>
    // <Router>
    //   <Switch>
    //     <Route path="/pay" element={<Pay/>}/>
    //     <Route path="/success" element={<Success/>}/>
    //   </Switch>
    // </Router>
    // </>
  )
};

export default App;