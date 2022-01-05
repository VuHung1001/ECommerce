import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

function App() {
  const isAdmin = useSelector((state) => state?.user?.currentUser?.isAdmin);
  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const currentUser = user && JSON.parse(user).currentUser;
  const TOKEN = currentUser?.accessToken;

  if(!TOKEN && isAdmin){
    console.log('reload');
    window.location.reload()
  }

  return (
    <Router>
      {!isAdmin && (
        <Switch>
          <Route path="/login" exact element={<Login />}/>
          <Route path="*" exact element={<Navigate to="/login"/>}/>
        </Switch>
      )}
      {isAdmin && TOKEN && (
        <>
        <Topbar />
        <div className="container">
          <Sidebar />
          <Switch>
            <Route path="/" exact element={<Home />}/>
            <Route path="/users" exact element={<UserList />}/>
            <Route path="/user/:userId" exact element={ <User />}/>
            <Route path="/newUser" exact element={<NewUser />}/>
            <Route path="/products" exact element={<ProductList />}/>
            <Route path="/product/:productId" exact element={<Product />}/>
            <Route path="/newproduct" exact element={<NewProduct />}/>
            <Route path="*" exact element={<Home />}/>
          </Switch>
        </div>
        </>
      )}
    </Router>
  );
}

export default App;
