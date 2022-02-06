import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { addProduct } from '../redux/cartRedux'
import { mobile } from '../responsive'

const Info = styled.div`
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
    min-width: 20%;
    max-width: 360px;
    height: 360px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    ${mobile({ minWidth: '100%' })}

    &:hover ${Info}{
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
    width: 80%;
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

const Product = ({item}) => {
    const dispatch = useDispatch();
    const currentPage = window.location.href.split('/')[3];
    
    const addToCart = ()=>{
        const quantity = 1;
        dispatch(addProduct({...item, quantity}))
    }

    return (
        <Container page={currentPage}>
            <Circle/>
            <Image src={item.img[0]}/>
            <Info>
                <Icon onClick={addToCart}>
                    <ShoppingCartOutlined/>
                </Icon>
                <Icon>
                    <Link to={`/product/${item._id}`}>
                    <SearchOutlined/>
                    </Link>
                </Icon>
                <Icon>
                    <FavoriteBorderOutlined/>
                </Icon>
            </Info>
        </Container>
    )
}

export default Product
