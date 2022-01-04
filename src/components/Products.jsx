import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Product from './Product'
import axios from 'axios'

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Products = ({filters}) => {
    const [products, setProducts] = useState([]);
    const category = filters?.category;
    const sort = filters?.sort;

    useEffect(()=> {
        const getProducts = async () => {
            try{
                const res = await axios.get(
                    (category && sort)
                    ? "http://localhost:5000/api/products"
                        + `?category=${category}&sort=${sort}`
                    : "http://localhost:5000/api/products"
                )
                setProducts(res.data)
            } catch(err){
                console.dir(err)
            }
        }
        getProducts();
    }, [category, sort])

    return (
        <Container>
            {products.slice(0,8).map((item) => (
                <Product key={item._id} item={item}/>
            ))}
        </Container>
    )
}

export default Products
