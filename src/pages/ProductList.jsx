import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import { mobile } from "../responsive";

const Container = styled.div``;
const Title = styled.h1`
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

const ProductList = () => {
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Title>Models</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select>
                        <Option disabled defaultValue>Universe</Option>
                        <Option>Transformer</Option>
                        <Option>Marvel</Option>
                        <Option>DC-comic</Option>
                    </Select>
                    <Select>
                        <Option disabled defaultValue>Scale</Option>
                        <Option>1:20</Option>
                        <Option>1:30</Option>
                        <Option>1:50</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select>
                        <Option defaultValue>Newest</Option>
                        <Option>Price (asc)</Option>
                        <Option>Price (desc)</Option>
                        <Option>Bestseller</Option>
                        <Option>Top rated</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products />
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default ProductList;
