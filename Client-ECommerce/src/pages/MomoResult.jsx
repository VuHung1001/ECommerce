import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userRequest, publicRequest } from "../requestMethods";
import {useDispatch} from 'react-redux'
import {removeCart} from '../redux/cartRedux'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';

function Momo() {
  const [resultMessage, setResultMessage] = useState('')
  const [searchParams, setSearchParams] = useSearchParams();
  const accessKey = process.env.REACT_APP_MOMO_ACCESS_KEY;
  const secretKey = process.env.REACT_APP_MOMO_SECRET_KEY;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [amount, setAmount] = useState();
  const [orderId, setOrderId] = useState(null);
  const [isMailSended, setIsMailSended] = useState(false);
  const crypto = require("crypto");
  const navigate = useNavigate()
  
  // get raw signature from query parameters
  let params = '';
  searchParams.sort();
  searchParams.forEach((value, key, parent)=>{
    if(key !== 'signature'){
      params += key+'='+value+'&';
    }
  })
  params = 'accessKey='+accessKey+'&'
    +params.substring(0, params.length -1);
    
  // create our signature
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(params)
    .digest("hex");


  useEffect(()=> {
    // set result message by resultCode
    setResultMessage(
      searchParams.get('resultCode')*1 === 0
        ? 'Thanh toán thành công'
        : 'Thanh toán thất bại'
    )
    //compare our signature and received signature
    if(signature !== searchParams.get('signature')){
      setResultMessage('Thông tin request không hợp lệ')
    } 
    
    // decode address
    let address = Buffer.from(
      searchParams.get('extraData'), 'base64'
    ).toString('utf8')
      
    // create order, remove cart after creating order
    const createOrder = async () => {
      try {
        setAmount(cart.total)
        const res = await userRequest.post("/orders", {
          _id: searchParams.get('orderId'),
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          amount: cart.total + 20000,
          address: JSON.parse(address),
        });
        
        //send mail to user
        address = JSON.parse(address)
        let userMail = address?.email ? address.email : currentUser?.email;
        
        let mailText = `  \nHello ${address?.name}
Your order id: ${searchParams.get('orderId')}\n
Bill amount: ${cart.total + 20000}\n
Your delivery address: ${address?.address}\n
Your payment method: Momo QR code\n
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

        mailText = mailText+ '</tbody></table>'
          + 'Your products are preparing and will be delivered as soon as possible'
          +'\nSincere thanks\n'

        const emailRes = publicRequest.post('/mail', {userMail, mailText})
        
        if(res.data?._id) {
          setOrderId(res.data._id);
          dispatch(removeCart())
          
          // delete cart redux state if user reload page
          window.history.replaceState({}, '');
        }
        
        if(emailRes.data){
          setIsMailSended(true)

          const timeout = setTimeout(()=>{
            navigate('/')
            window.clearTimeout(timeout)
          }, 60000)   
        }         
      } catch(err) {
        console.dir(err)
      }
    };
    searchParams.get('resultCode')*1 === 0 
      && cart?.total !== 0 
      && currentUser?._id
      && createOrder();
  }, [searchParams, signature, currentUser, cart, dispatch, navigate])

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
      <p>{resultMessage}</p>
      <p>{orderId
        ? `Order has been created successfully. Your order number is ${orderId}.\n`
        : `Successful. Your order is being prepared...\n`}
      </p>
      {isMailSended && (<p>
        Order infors was sended to your email
      </p>)}
      {amount && (<p>
        Your total amount: {amount +20000} &#8363;
      </p>)}       
      <Link to="/">
        <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
      </Link>
    </div>
    <Footer/>
    </>
  );
}

export default Momo;
