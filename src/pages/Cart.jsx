import { Add, Remove } from '@material-ui/icons';
import styled from 'styled-components';
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from '../responsive';
import {useSelector} from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import {userRequest} from '../requestMethods'

const KEY = process.env.REACT_APP_STRIPE

const Container = styled.div`

`
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({padding: '10px'})}
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
`
const TopButton = styled.button`
    padding: 8px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === 'filled' && 'none'};
    background-color: ${props => props.type === 'filled' ? 'black' : 'transparent'};
    color: ${props => props.type === 'filled' && 'white'};
    transition: all 0.5s ease;
    &:hover{
        transform: scale(1.1);
    }
`
const TopTexts = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    ${mobile({display: 'none'})}
`
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
    padding-bottom: 5px;
`
const Bottom = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    @media only screen and (max-width: 800px){
        flex-direction: column;
    }
`
const Info = styled.div`
    flex: 3;
`

const Product = styled.div`
    display: flex;
    justify-content: center;
    @media only screen and (max-width: 950px){
        flex-direction: column;
    }
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
    max-height: 33vh;
`
const Image = styled.img`
    width: 33.3%;
    // height: 100%;
    object-fit: cover;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName = styled.span``
const ProductId = styled.span``
const ProductType = styled.span``
const ProductPrice = styled.span``

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ProductQuantityContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 15px 0px 10px 0px;
`
const ProductQuantity = styled.div`
    font-size: 24px;
    margin: 0px 10px;
    ${mobile({margin: '5px 30px'})}
`
const ProductAmount = styled.div`
    font-size: 30px;
    font-weight: 200;
    margin-bottom: 10px;
    ${mobile({marginBottom: '20px'})}
`

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
    margin: 10px 0px;
`
const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 55vh;
`
const SummaryTitle = styled.h1`
    font-weight: 200;
    font-size: 35px;
`
const SummaryItem = styled.div`
    margin: 20px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === "total" && "500"};
    font-size: ${props => props.type === "total" && "24px"};
`
const SummaryItemText = styled.span`
    flex: 3;
`
const SummaryItemPrice = styled.span`
    flex: 2;
`
const Button = styled.button`
    width: 100%;
    padding: 8px;
    background-color: black;
    color: white;
    font-weight: 600;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover{
        transform: scale(1.1);
    }
`

const Cart = () => {
    const cart = useSelector(state => state.cart)
    const [stripeToken, setStripeToken] = useState(null)
    const navigate = useNavigate();

    const onToken = (token)=> {
        setStripeToken(token)
    }

    useEffect(()=> {
        const makeRequest = async () => {
            try{
                const res = await userRequest.post(
                    "/checkout/payment",
                    {
                        tokenId: stripeToken.id,
                        amount: cart.total,
                    }
                )
                navigate('/success', {state: {
                    stripeData: res.data,
                    cart
                }})
            } catch(err) {
                console.log(err)
            }
        }

        stripeToken && makeRequest();

        // use fetch

        // if(stripeToken){
        //     const requestOptions = {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(
        //             {
        //                 tokenId: stripeToken.id,
        //                 amount: cart.total,
        //             }                
        //         )
        //     };
        //     fetch('http://localhost:5000/api/checkout/payment', requestOptions)
        //         .then(response => response.json())
        //         .then(data => {
        //             console.log(data)
        //             navigate('/success', {data})  
        //         }); 
        // }        
    }, [stripeToken, cart, navigate])

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag(2)</TopText>
                        <TopText>Your Wishlist(0)</TopText>
                    </TopTexts>
                    <TopButton type="filled">CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map(product => (
                        <div key={product._id}>
                        <Product >
                            <ProductDetail>
                                <Image src={product.img}/>
                                <Details>
                                    <ProductName><b>Product: </b>{product.title}</ProductName>
                                    <ProductId><b>ID: </b><p>{product._id}</p></ProductId>
                                    <ProductType><b>Type: </b>{product.category}</ProductType>
                                    <ProductPrice><b>Price: </b> {product.price}</ProductPrice>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductQuantityContainer>
                                    <Remove/>
                                    <ProductQuantity>{product.quantity}</ProductQuantity>
                                    <Add/>
                                </ProductQuantityContainer>
                                <ProductAmount>{product.price * product.quantity} VND</ProductAmount>
                            </PriceDetail>
                        </Product>
                        <Hr/>
                        </div>
                        ))}
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>{cart.total} VND</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>20000 VND</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>-20000 VND</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>{cart.total} VND</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout 
                            name="Figure shop"
                            image="https://blog.logomyway.com/wp-content/uploads/2021/08/transformer-logo.jpg"
                            billingAddress
                            shippingAddress
                            description={`Your total amount is ${cart.total} VND`}
                            amount={cart.total}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <Button>CHECKOUT NOW</Button>
                        </StripeCheckout>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart
