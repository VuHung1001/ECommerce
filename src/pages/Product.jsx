import { Add, Remove } from '@material-ui/icons'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import { mobile } from '../responsive'

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
`
const Title = styled.h1`
    font-weight: 200;
`
const Desc = styled.p`
    margin: 20px 0px;
`
const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`

const OptionContainer = styled.div`
    width: 100%; 
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`
const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`
const FilterSelect= styled.select`
    cursor: pointer;
    margin-left: 10px;
    padding: 5px;
`
const FilterOption= styled.option`

`

const AddContainer= styled.div`
    margin: 20px 0px;
    display: flex;
    align-items: center;
    flex:1;
    justify-content: space-between;
`
const AmountContainer= styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
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
    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <ImgContainer>
                    <Image src="https://loremflickr.com/320/240/life"/>
                </ImgContainer>
                <InfoContainer>
                    <Title>Super car</Title>
                    <Desc>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Desc>
                    <Price>$ 20</Price>

                    <OptionContainer>
                        <FilterContainer>
                            <FilterTitle>Scale</FilterTitle>
                            <FilterSelect>
                                <FilterOption>1:10</FilterOption>
                                <FilterOption>1:20</FilterOption>
                                <FilterOption>1:30</FilterOption>
                                <FilterOption>1:50</FilterOption>
                            </FilterSelect>
                        </FilterContainer>

                        <AddContainer>
                            <AmountContainer>
                                <Remove/>
                                <Amount>1</Amount>
                                <Add/>
                            </AmountContainer>
                            <Button>ADD TO CART</Button>
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
