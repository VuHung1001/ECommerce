import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import {useDispatch} from 'react-redux'
import {removeCart} from '../redux/cartRedux'

function Momo() {
  const [resultMessage, setResultMessage] = useState('')
  const [searchParams, setSearchParams] = useSearchParams();
  const accessKey = process.env.REACT_APP_MOMO_ACCESS_KEY;
  const secretKey = process.env.REACT_APP_MOMO_SECRET_KEY;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const crypto = require("crypto");
  
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
        
        setOrderId(res.data._id);
        dispatch(removeCart())

        // delete cart redux state if user reload page
        window.history.replaceState({}, '');
      } catch(err) {
        console.dir(err)
      }
    };
    searchParams.get('resultCode')*1 === 0 
      && cart?.total !== 0 
      && currentUser?._id
      && createOrder();
  }, [searchParams, signature, currentUser, cart, dispatch])

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
      <p>{resultMessage}</p>
      <p>{orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successful. Your order is being prepared...`}</p>
      <Link to="/">
        <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
      </Link>
    </div>
  );
}

export default Momo;
