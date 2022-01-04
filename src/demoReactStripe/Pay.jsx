import { useState,useEffect } from "react"
import StripeCheckout from "react-stripe-checkout"
import axios from "axios"
import {useNavigate} from 'react-router-dom'

const KEY = process.env.REACT_APP_STRIPE

const Pay = () => {
    const [stripeToken, setStripeToken] = useState(null)
    const navigate = useNavigate();

    const onToken = (token) => {
        setStripeToken(token)
    }

    useEffect(()=> {
        const makeRequest = async () => {
            try{
                const res = await axios.post(
                    "http://localhost:5000/api/checkout/payment",
                    {
                        tokenId: stripeToken.id,
                        amount: 10000,
                    }
                )
                console.log(res.data);
                navigate('/success')
            } catch(err) {
                console.log(err)
            }
        }

        stripeToken && makeRequest();


        // USE FETCH
        // if(stripeToken){
        //     const requestOptions = {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(
        //             {
        //                 tokenId: stripeToken.id,
        //                 amount: 10000,
        //             }                
        //         )
        //     };
        //     fetch('http://localhost:5000/api/checkout/payment', requestOptions)
        //         .then(response => response.json())
        //         .then(data => console.log(data));        
        // }
    }, [stripeToken, navigate])

    return (
        <div>
            {stripeToken ? (<span>Processing. Please wait...</span>) : (
            <StripeCheckout 
                name="Figure shop"
                image="https://blog.logomyway.com/wp-content/uploads/2021/08/transformer-logo.jpg"
                billingAddress
                shippingAddress
                description="Your total amount is $100"
                amount={10000}
                token={onToken}
                stripeKey={KEY}
            >
                <button>Payment</button>
            </StripeCheckout>
            )}
        </div>
    )
}

export default Pay
