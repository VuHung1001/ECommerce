import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { userRequest } from "../requestMethods";
import {useDispatch} from 'react-redux'
import {removeCart} from '../redux/cartRedux'

const Success = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state?.stripeData;
  const cart = location.state?.cart
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  // create order, remove cart after creating order
  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          amount: cart.total +20000,
          address: data.billing_details.address,
        });
        
        setOrderId(res.data._id);
        dispatch(removeCart())

        // delete location state if user reload page
        window.history.replaceState({}, '');
      } catch(err) {
        console.dir(err)
      }
    };
    data && cart && createOrder();
  }, [cart, data, currentUser, dispatch]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>{orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successful. Your order is being prepared...`}</p>
      <Link to='/'>
      <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
      </Link>
    </div>
  );
};

export default Success;