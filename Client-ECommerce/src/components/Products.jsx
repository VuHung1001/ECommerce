import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Pagination from '@mui/material/Pagination';
import Product from './Product'
import {publicRequest} from '../requestMethods'

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`
const PaginationContainer = styled.div`
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
`

const Products = ({filters}) => {
    const [products, setProducts] = useState([]);
    const category = filters?.category;
    const sort = filters?.sort;
    const [page, setPage] = useState(1);
    const currentPage = window.location.href.split('/')[3];
    const rowPerPage =  currentPage ? 6 : 8;
    const [totalPage, setTotalPage] = useState(1);

    useEffect(()=> {
        const getProducts = async () => {
            try{
                /* eslint-disable-next-line */
                debugger;
                const res = (category && sort)
                    ? await publicRequest.get(
                        `/products?category=${category}&sort=${sort}`
                    )
                    : await publicRequest.get(
                        '/products'
                    )
                setProducts(res.data)
                setTotalPage(Math.ceil(res.data.length / rowPerPage))
            } catch(err){
                console.dir(err)
            }
        }
        getProducts();
    }, [category, sort, rowPerPage])

    return (
        <Container>
            {products.slice((page-1)*rowPerPage, page * rowPerPage).map((item) => (
                <Product key={item._id} item={item}/>
            ))}
            <PaginationContainer>
                <Pagination
                    page={page}
                    count={totalPage}
                    onChange={(e, value) => setPage(value)}
                />
            </PaginationContainer>
        </Container>
    )
}

export default Products
