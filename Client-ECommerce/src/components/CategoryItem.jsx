import './category-item.css'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {mobile} from '../responsive'

const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position: relative;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    ${mobile({height: '25vh'})}
`
const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Title = styled.h1`
    color: black;
    margin-bottom: 20px;
`
const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: gray;
    color: white;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.5s ease;
    &:hover {
      transform: scale(1.1);
    }
`

const CategoryItem = ({item}) => {
    return (
        <Container className="container">
            <Link to={`/products/${item.title}`}>
            <Image src={item.img} className="img"/>
            <Info>
                <Title>{item.title}</Title>
                <Button>SHOP NOW</Button>
            </Info>
            </Link>
        </Container>
    )
}

export default CategoryItem
