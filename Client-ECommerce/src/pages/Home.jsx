import { useEffect } from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import Slider from '../components/Slider'

const Container = styled.div`
    background: linear-gradient(
    rgba(255, 255, 255, 0.8), 
    rgba(255, 255, 255 ,0.8)
    ),
    url("https://images2.alphacoders.com/424/thumb-1920-42470.jpg") 
    center;
    background-size: cover;
    postition: fixed;
    right: 0;
    bottom: 0;
`

const Home = () => {
    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        }); 
    }, [])
    
    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Slider/>
            <Categories/>
            <Products/>
            <Newsletter/>
            <Footer/>
        </Container>
    )
}

export default Home
