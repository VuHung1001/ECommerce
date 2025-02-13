import { Add, DeleteForeverOutlined, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userRequest } from "../requestMethods";
import SelectPayment from "../components/SelectPayment";
import { addProduct, removeProduct } from "../redux/cartRedux";
import Notification from "../components/Notification";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;
const TopButton = styled.button`
  padding: 8px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.1);
  }
`;
const TopTexts = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
  padding-bottom: 5px;
`;
const Bottom = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`;
const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 950px) {
    flex-direction: column;
  }
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  max-height: 33vh;
  justify-content: space-between;
`;
const Image = styled.img`
  width: 33.3%;
  // height: 100%;
  object-fit: cover;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const DeleteContainer = styled.div`
    display: flex;
    align-items: center;
`

const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  ${'' /* overflow: auto; */}
  transition: all 0.5s ease;
  &:hover {
    cursor: pointer;      
    transform: scale(1.1);
  }
  ${mobile({ display: "none" })}
`;

const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductType = styled.span``;
const ProductPrice = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductQuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0px 10px 0px;
`;

const DeleteButtonMobile = styled.div`
  display: none;
  align-items: center;
  overflow: auto;
  margin-right: 20px;
  transition: all 0.5s ease;
  &:hover {
      cursor: pointer;
      transform: scale(1.1);
  }
  ${mobile({ display: "flex" })}
`;

const ProductQuantity = styled.div`
  font-size: 24px;
  margin: 0px 10px;
  ${mobile({ margin: "5px 30px" })}
`;
const ProductAmount = styled.div`
  font-size: 30px;
  font-weight: 200;
  margin-bottom: 10px;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin: 10px 0px;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 100%;
  display: block;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
  font-size: 35px;
`;
const SummaryItem = styled.div`
  margin: 20px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span`
  flex: 3;
`;
const SummaryItemPrice = styled.span`
  flex: 2;
`;
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
  &:hover {
    transform: scale(1.1);
  }
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user)
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('')
  const [type, setType] = useState('info')
  const [title, setTitle] = useState('')

  const checkout = () => {
    if(!user.currentUser?._id){
        setMessage('Please login before checkout, redirecting to login page')
        setType('warning')
        setTitle('Notice')
        const timeout = setTimeout(()=>{
          navigate('/login', { state: { from: location.pathname } })
          window.clearTimeout(timeout)
        }, 3000)
    }
    document.querySelector(".payment-container").style.display = "block";
  };

  const handleQuantity = (type, id) => {
    const quantity = 1;
    const product = cart.products.find((element) => element._id === id);
    if (type === "asc") {
      dispatch(addProduct({ ...product, quantity }));
    }
    if (type === "desc") {
      dispatch(removeProduct({ ...product, quantity }));
    }
  };

  const removeFromCart = (id) => {
    const product = cart.products.find((element) => element._id === id);
    const quantity = product.quantity;
    if(window.confirm('Are you sure you want to remove this product'))
        dispatch(removeProduct({ ...product, quantity }));
  };

  useEffect(() => {
    const makeStripeRequest = async () => {
      try {
        const res = await userRequest().post("/checkout/stripe", {
          tokenId: stripeToken.id,
          amount: cart.total + 20000,
        });
        
        navigate("/success", {
          state: {
            stripeData: res.data,
            cart,
          },
        });
      } catch (err) {
        console.dir(err);
      }
    };

    stripeToken && makeStripeRequest();
  }, [stripeToken, cart, navigate]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Notification title={title} message={message} type={type} />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag({cart.quantity})</TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>
          <TopButton onClick={checkout} type="filled">
            CHECKOUT NOW
          </TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <div key={product._id}>
                <Product>
                  <ProductDetail>
                    <Image src={product.img[0]} />
                    <Details>
                      <ProductName>
                        <b>Product: </b>
                        {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID: </b>
                        <p style={{wordBreak: 'break-all', whiteSpace: 'normal'}}>{product._id}</p>
                      </ProductId>
                      <ProductType>
                        <b>Type: </b>
                        {product.category}
                      </ProductType>
                      <ProductPrice>
                        <b>Price: </b> {product.price} &#8363;
                      </ProductPrice>
                    </Details>
                    <DeleteContainer>
                        <DeleteButton onClick={()=>removeFromCart(product._id)}>
                            <DeleteForeverOutlined color="error" />
                        </DeleteButton>
                    </DeleteContainer>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductQuantityContainer>
                        <DeleteContainer>
                            <DeleteButtonMobile onClick={()=>removeFromCart(product._id)}>
                                <DeleteForeverOutlined color="error" />
                            </DeleteButtonMobile>
                        </DeleteContainer>
                      <Remove
                        onClick={() => handleQuantity("desc", product._id)}
                      />
                      <ProductQuantity>{product.quantity}</ProductQuantity>
                      <Add onClick={() => handleQuantity("asc", product._id)} />
                    </ProductQuantityContainer>
                    <ProductAmount>
                      {product.price * product.quantity} &#8363;
                    </ProductAmount>
                  </PriceDetail>
                </Product>
                <Hr />
              </div>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>{cart.total} &#8363;</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>20000 &#8363;</SummaryItemPrice>
            </SummaryItem>
            {/* <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>-20000 &#8363;</SummaryItemPrice>
            </SummaryItem> */}
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{cart.total + 20000} &#8363;</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={checkout}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <SelectPayment setStripeToken={setStripeToken} />
      <Footer />
    </Container>
  );
};

export default Cart;
