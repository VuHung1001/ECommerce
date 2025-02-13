import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userRequest, publicRequest } from "../requestMethods";
import {useDispatch} from 'react-redux'
import {removeCart} from '../redux/cartRedux'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';

const Success = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state?.stripeData;
  const cart = location.state?.cart
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const [amount, setAmount] = useState();
  const [isMailSended, setIsMailSended] = useState(false);
  const navigate = useNavigate()

  // create order, remove cart after creating order
  useEffect(() => {
    const createOrder = async () => {
      try {
        setAmount(cart.total)
        const res = await userRequest().post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          amount: cart.total +20000,
          address: data.billing_details.address,
        });
        
        if(res.data?._id) {
          //send mail to user
          let mailText = `
\nYour order id: ${res.data._id}\n
Bill amount: ${cart.total + 20000}\n
Your delivery address: ${data.billing_details.address?.line1}\n
Your payment method: Stripe\n
Products that you have purchased: \n
  <table style='border: 1px solid; border-collapse: collapse;'>
  <thead>
    <tr>
      <td style='border: 1px solid; border-collapse: collapse;'>Name</td>
      <td style='border: 1px solid; border-collapse: collapse;'>Quantity</td>
      <td style='border: 1px solid; border-collapse: collapse;'>Price</td>
    </tr>
  </thead>
  <tbody>`

          for(let item of cart.products) {
            mailText += `<tr>
                <td style='border: 1px solid; border-collapse: collapse;'>${item.title}</td>
                <td style='border: 1px solid; border-collapse: collapse;'>${item.quantity}</td>
                <td style='border: 1px solid; border-collapse: collapse;'>${item.price} &#8363;</td>
              </tr>`
          }

          mailText = mailText+ '</tbody></table>\n'
            + 'Your products are preparing and will be delivered as soon as possible'
            +'\nSincere thanks\n'

          const emailRes = publicRequest.post('/mail', {userMail: currentUser?.email, mailText})
          
          setOrderId(res.data._id);
          dispatch(removeCart())
          
          // delete cart redux state if user reload page
          window.history.replaceState({}, '');

          if(emailRes){
            setIsMailSended(true)

            const timeout = setTimeout(()=>{
              navigate('/')
              window.clearTimeout(timeout)
            }, 60000)   
          }      
        }
      } catch(err) {
        console.dir(err)
      }
    };
    data && cart && createOrder();
  }, [cart, data, currentUser, dispatch, navigate]);

  return (
    <>
    <Navbar/>
    <Announcement/>
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: 'linear-gradient('
          +'rgba(255, 255, 255, 0.5), '
          +'rgba(255, 255, 255 ,0.5)'
          +'),'
          +'url("https://images2.alphacoders.com/424/thumb-1920-42470.jpg") '
          +'center',
        backgroundSize: 'cover',   
        fontSize: '20px',
        fontBold: '600'
      }}
    >
      <p>{orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `You have not pay yet`}
      </p>
      {isMailSended && (<p>
        Order infors was sended to your email
      </p>)}
      {amount && (<p>
        Your total amount: {amount +20000} &#8363;
      </p>)} 
      <Link to='/'>
      <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
      </Link>
    </div>
    <Footer/>
    </>
  );
};

export default Success;