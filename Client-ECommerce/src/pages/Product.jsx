import { Add, Remove } from '@material-ui/icons'
import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import { addProduct } from '../redux/cartRedux'
import { publicRequest } from '../requestMethods'
import { mobile } from '../responsive'
import {useDispatch} from 'react-redux'

const Container = styled.div`

`
const Wrapper= styled.div`
    padding: 50px;
    display: flex;
    ${mobile({padding: '10px' , flexDirection: 'column'})}
`
const ImgContainer = styled.div`
    flex: 1;
`
const Image= styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${mobile({height: '40vh'})}
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({ padding: '10px'})}
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Title = styled.h1`
    font-weight: 200;
`
const Desc = styled.p`
    margin: 10px 0px;
`
const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`

const OptionContainer = styled.div`
    width: 100%; 
    // margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`
// const FilterContainer = styled.div`
//     display: flex;
//     align-items: center;
//     flex: 1;
// `
// const FilterTitle = styled.span`
//     font-size: 20px;
//     font-weight: 200;
// `
// const FilterSelect= styled.select`
//     cursor: pointer;
//     margin-left: 10px;
//     padding: 5px;
// `
// const FilterOption= styled.option`

// `

const AddContainer= styled.div`
    // margin: 20px 0px;
    display: flex;
    align-items: center;
    flex:1;
    flex-wrap: wrap;
    justify-content: center;
`
const AmountContainer= styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
    padding: 15px 5px 15px 0px;
    @media only screen and (max-width: 700px){
        padding: 15px 0px;
    }
`
const Amount= styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`
const Button= styled.button`
    padding: 5px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.5s ease;
    &:hover{
        transform: scale(1.1);
        background-color: lightgray;
    }
`

const Product = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2]
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch();

    useEffect(()=> {
        const getProduct = async() => {
            try{
                const res = await publicRequest.get('/products/find/'+id)
                setProduct(res.data)
            } catch(err) {
                console.dir(err)
            }
        }
        getProduct()
    }, [id])

    const handleQuantity = (type) =>{
        if(type === 'asc')
            setQuantity(quantity +1)
        if(type === 'desc')
            quantity > 1 && setQuantity(quantity -1)
    }

    const addToCart = ()=>{
        dispatch(addProduct({...product, quantity}))
    }

    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img}/>
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>
                        {product.desc}
                    </Desc>
                    <Price>{product.price} VND</Price>

                    <OptionContainer>
                        {/* <FilterContainer>
                            <FilterTitle>Scale</FilterTitle>
                            <FilterSelect>
                                <FilterOption>1:10</FilterOption>
                                <FilterOption>1:20</FilterOption>
                                <FilterOption>1:30</FilterOption>
                                <FilterOption>1:50</FilterOption>
                            </FilterSelect>
                        </FilterContainer> */}

                        <AddContainer>
                            <AmountContainer>
                                <Remove onClick ={()=> handleQuantity('desc')}/>
                                <Amount>{quantity}</Amount>
                                <Add onClick ={()=> handleQuantity('asc')}/>
                            </AmountContainer>
                            <Button onClick={addToCart}>ADD TO CART</Button>
                        </AddContainer>
                    </OptionContainer>

                </InfoContainer>
            </Wrapper>
            <Newsletter/>
            <Footer/>
        </Container>
    )
}

export default Product
