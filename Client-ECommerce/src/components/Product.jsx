import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { addProduct } from '../redux/cartRedux'
import { mobile } from '../responsive'

const Icons = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
    background-color: rgba(0,0,0,0.1);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`

const Container = styled.div`
    flex: 1 ${(props) => props.page && '26%'};
    margin: 5px;
    min-width: 300px;
    width: 23vw;
    max-width: 26vw;
    min-height: 300px;
    height: 23vw;
    display: flex;
    ${'' /* align-items: center; */}
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    ${mobile({ width: '100%', minWidth: '40vh', height: '40vh' })}

    &:hover ${Icons}{
        opacity: 1
    }
`

const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`

const Image = styled.img`
    height: 80%;
    width: 95%;
    object-fit: cover;
    z-index: 2;
`

const Icon= styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display:flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover{
        background-color: #e9f5f5;
        transform: scale(1.1);
    };
`

const Info = styled.div`
    height: 19%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: auto;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
`
const Span = styled.span``

const Product = ({item}) => {
    const dispatch = useDispatch();
    const currentPage = window.location.href.split('/')[3];
    
    const addToCart = (event)=>{
        event.stopPropagation();
        event.preventDefault();
        const quantity = 1;
        dispatch(addProduct({...item, quantity}))
    }

    const addToFavorite = (event) => {
        event.stopPropagation();
        event.preventDefault();        
    }

    return (
        <Container page={currentPage}>
            <Circle/>
            <Image src={item.img[0]}/>
            <Link to={`/product/${item._id}`}>
                <Icons>
                    <Icon onClick={addToCart}>
                        <ShoppingCartOutlined/>
                    </Icon>
                    <Link to={`/product/${item._id}`}>
                        <Icon>
                            <SearchOutlined/>
                        </Icon>
                    </Link>
                    <Icon onClick={addToFavorite}>
                        <FavoriteBorderOutlined/>
                    </Icon>
                </Icons>
            </Link>
            <Info>
                <Span><b>{item.title}</b></Span>
                <Span>{item.price} &#8363;</Span>
            </Info>
        </Container>
    )
}

export default Product
