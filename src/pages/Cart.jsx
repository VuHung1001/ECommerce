import { Add, Remove } from '@material-ui/icons';
import styled from 'styled-components';
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from '../responsive';

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
    ${mobile({flexDirection: 'column'})}
`
const Info = styled.div`
    flex: 3;
`

const Product = styled.div`
    display: flex;
    justify-content: center;
    ${mobile({flexDirection: 'column'})}
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`
const Image = styled.img`
    width: 50%;
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
const ProductScale = styled.span``
const ProductType = styled.span``
const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({margin: '5px 30px'})}
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({marginBottom: '20px'})}
`

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
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
                        <Product>
                            <ProductDetail>
                                <Image src="https://thegioimohinh.vn/wp-content/uploads/2019/05/ed20ac7b42e0c479762510a0776c8483-800x800.jpg"/>
                                <Details>
                                    <ProductName><b>Product: </b> OPTIMUS PRIME</ProductName>
                                    <ProductId><b>ID: </b>12374192837</ProductId>
                                    <ProductScale><b>Scale: </b>1:30</ProductScale>
                                    <ProductType><b>Type: </b>Transformers</ProductType>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <Remove/>
                                    <ProductAmount>2</ProductAmount>
                                    <Add/>
                                </ProductAmountContainer>
                                <ProductPrice>$ 100</ProductPrice>
                            </PriceDetail>
                        </Product>
                        <Hr/>
                        <Product>
                            <ProductDetail>
                                <Image src="https://thegioimohinh.vn/wp-content/uploads/2019/05/ed20ac7b42e0c479762510a0776c8483-800x800.jpg"/>
                                <Details>
                                    <ProductName><b>Product: </b> OPTIMUS PRIME</ProductName>
                                    <ProductId><b>ID: </b>12374192837</ProductId>
                                    <ProductScale><b>Scale: </b>1:30</ProductScale>
                                    <ProductType><b>Type: </b>Transformers</ProductType>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <Remove/>
                                    <ProductAmount>2</ProductAmount>
                                    <Add/>
                                </ProductAmountContainer>
                                <ProductPrice>$ 100</ProductPrice>
                            </PriceDetail>
                        </Product>
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ 200</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ 5.0</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -5.0</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ 200</SummaryItemPrice>
                        </SummaryItem>
                        <Button>CHECKOUT NOW</Button>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart
