import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import { mobile } from "../responsive";

const Container = styled.div``;
const Title = styled.h1`
    text-align: center;
    margin: 20px;
`;
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;
const Filter = styled.div`
    margin: 20px;
    ${mobile({ display: 'flex', flexDirection: 'column'})}
`;
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({marginRight: '0px'})}
`;
const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({margin: '10px 0px'})}
`
const Option = styled.option``

const youtubeVideos ={
    'All Products': '0D2Pv0Xl69Q',
    'Transformers': '0D2Pv0Xl69Q',
    'Marvel': '2DkdFhVznY4',
    'DC-Comics' :'PLwFgS4H64k'
}

const ProductList = () => {
    const location = useLocation();
    const categoryPath = location.pathname.split('/')[2]
    const selectRef = useRef();
    
    const [filters, setFilters] = useState({
        category: categoryPath ? categoryPath : 'All Products',
        sort: 'Price (desc)',
    });

    //change url by category without redirect or reload page
    if(filters.category){
        let pathName = filters.category === 'All Products' ? '' : '/'+filters.category;
        window.history.pushState("", "", '/products'+pathName);
    }
    
    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        const select = selectRef.current;
        const options = select.options;
        
        for(let i=0;i<options.length;i++){

            if(options[i].innerText === filters.category){
                options.selectedIndex = i;
                break;
            }

            if(i === options.length-1){
                setFilters({
                    ...filters,
                    category: 'All Products'
                })
            }
        }
    }, [filters])
    
    const handleFilters = (e) => {
            setFilters({
                ...filters,
                [e.target.name]: e.target.value
            })
    }
    
    return (
        <Container>
            <iframe 
                src={`https://www.youtube.com/embed/${youtubeVideos[filters.category]}?playList=${youtubeVideos[filters.category]}&autoplay=1&mute=1&loop=1&version=3`}
                title="YouTube video player" 
                frameBorder="0" 
                autoPlay
                muted
                loop={true}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                style={{
                    position: 'fixed',
                    right: '0',
                    bottom: '0',
                    minWidth: '100%',
                    minHeight: '100%',
                    opacity: '0.3',
                    zIndex: '-1000'
                }}
            ></iframe>
            <Navbar category={filters?.category}/>
            <Announcement />
            <Title>{filters.category}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Category:</FilterText>
                    <Select 
                        name="category" 
                        onChange={handleFilters}
                        ref={selectRef}
                    >
                        <Option>All Products</Option>
                        <Option>Transformers</Option>
                        <Option>Marvel</Option>
                        <Option>DC-Comics</Option>
                    </Select>
                    {/* <Select onChange={handleFilters}>
                        <Option disabled >Scale</Option>
                        <Option>1:20</Option>
                        <Option>1:30</Option>
                        <Option>1:50</Option>
                    </Select> */}
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select name="sort" onChange={handleFilters}>
                        <Option value="desc" defaultValue>Price (desc)</Option>
                        <Option value="asc">Price (asc)</Option>
                        <Option value="newest">Newest</Option>
                        <Option value="oldest">Oldest</Option>
                        {/* <Option value="bestseller">Bestseller</Option>
                        <Option value="toprated">Top rated</Option> */}
                    </Select>
                </Filter>
            </FilterContainer>
            <Products filters={filters} />
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default ProductList;
