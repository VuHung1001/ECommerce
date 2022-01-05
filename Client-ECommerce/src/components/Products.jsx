import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Product from './Product'
import {publicRequest} from '../requestMethods'

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
                const res = (category && sort)
                    ? await publicRequest.get(
                        `/products?category=${category}&sort=${sort}`
                    )
                    : await publicRequest.get(
                        '/products'
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
