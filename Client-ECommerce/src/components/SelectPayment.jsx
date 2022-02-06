import "./select-payment.css";
import { CloseRounded } from "@material-ui/icons";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import DeliveryDetail from "./DeliveryDetail";
import { useState, useEffect } from "react";

const KEY = process.env.REACT_APP_STRIPE;

const SelectPayment = (props) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const setStripeToken = props.setStripeToken;
  const navigate = useNavigate();
  const [displayDelivery, setDisplayDelivery] = useState(false)
  const [address, setAddress] = useState(null)
  const [clickedPayment, setClickedPayment] = useState(null)

  const useStripePayment = (token) => {
    if (!user.currentUser?._id) {
      window.alert("Please login before checkout, redirecting to login page");
      navigate("/login");
    }
    if (cart.total <= 0){
      window.alert("Your cart is empty, please buy some our products first")
    }
    else {
      setStripeToken(token);
    }
  };

  const useMomoPayment = () => {
    if (!user.currentUser?._id) {
      window.alert("Please login before checkout, redirecting to login page");
      navigate("/login");
    }
    if (cart.total <= 0){
      window.alert("Your cart is empty, please buy some our products first")
    }
    else{
      setDisplayDelivery(true)
      document.querySelector(".payment-container").style.display = "none";
      setClickedPayment(true)
    }
  };

  const disableCheckout = () => {
    document.querySelector(".payment-container").style.display = "none";
  };

  useEffect(()=>{
    if(address && clickedPayment){
      const callMomoApi = async()=>{
        try {
          const res = await userRequest.post("/checkout/momo", {
            amount: cart.total + 20000,
            address
          });
          window.location.href = JSON.parse(res.data).payUrl;
        } catch (err) {
          console.dir(err);
          if(err.response.data === 'Token is not valid!'){
            window.alert('You was not login or your login session was expired, redirecting to login page')
            navigate('/login')
          }
          setClickedPayment(false);
        }
      }

      callMomoApi();
    }
  }, [address, cart, navigate, user, clickedPayment])

  return (
    <>
    <DeliveryDetail 
      displayDelivery={displayDelivery} 
      setDisplayDelivery={setDisplayDelivery}
      setAddress={setAddress}  
    />
    <div className="payment-container">
      <div className="paragraph">
        <p className="mb-0 fw-bold h4">
          <b>Select Payment Method</b>
        </p>
        <CloseRounded onClick={disableCheckout} />
      </div>
      <div className="row">
        <div className="col-lg-4 mb-lg-0 mb-3">
          <div className="card p-3">
            <div className="img-box">
              <StripeCheckout
                name="Figure shop"
                image="https://blog.logomyway.com/wp-content/uploads/2021/08/transformer-logo.jpg"
                billingAddress
                shippingAddress
                description={`Your total amount is ${cart.total + 20000} &#8363;`}
                amount={cart.total + 20000}
                token={useStripePayment}
                stripeKey={KEY}
                currency="VND"
              >
                <button className="btn stripe">
                  <img
                    src="https://logos-world.net/wp-content/uploads/2021/03/Stripe-Emblem-700x394.png"
                    alt=""
                  />
                </button>
              </StripeCheckout>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-lg-0 mb-3">
          <div className="card p-3">
            <div className="img-box">
              <button onClick={useMomoPayment} className="btn momo">
                <img src="/img/momo_icon_square_pinkbg_RGB.png" alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SelectPayment;
