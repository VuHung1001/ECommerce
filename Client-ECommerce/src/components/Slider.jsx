import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {sliderItems} from '../data'
import {mobile} from '../responsive'

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({height: '65vh'})}
`;

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #ffffff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${(props) => props.direction === "left" && "10px"};
    right: ${(props) => props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;
    transition: all 0.5s ease;
    &:hover{
        opacity: 1.0;
        transform: scale(1.1);
    }
`;

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1.0s ease;
    transform: translateX(${props => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #${props => props.bg};
    ${mobile({flexDirection: 'column', height: '100%'})}
`;

const ImgContainer = styled.div`
    height: 100%;
    flex: 3;
    ${mobile({height: 'auto', flex: '1'})}
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    ${mobile({height: 'auto', objectFit: 'cover'})}
`;

const InforContainer = styled.div`
    flex: 1;
    padding: 50px;
    ${mobile({padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'})}
`;

const Title = styled.h1`
    font-size: 70px;
    ${mobile({fontSize: '40px', textAlign: 'center'})}
`
const Desc = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 2px;
    ${mobile({margin: '30px 0px'})}
`
const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover{
        opacity: 1.0;
        transform: scale(1.1);
    }
`

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0)

    const handleClick = (direction) => {
        if(direction === 'left'){
            setSlideIndex(slideIndex > 0 ? slideIndex-1 : 2)
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex+1 : 0)
        }
    }

    useEffect(()=>{
        const interval = window.setInterval(()=>{
            setSlideIndex(slideIndex < 2 ? slideIndex+1 : 0)
        }, 5000)

        return () => window.clearInterval(interval)
    }, [slideIndex])

    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlined />
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {sliderItems.map(item => (
                <Slide bg={item.bg} key={item.id}>
                    <ImgContainer>
                        <Image src={item.img} />
                    </ImgContainer>
                    <InforContainer>
                        <Title>{item.title}</Title>
                        <Desc>{item.desc}</Desc>
                        <Link to={`/products/${item.type}`}>
                            <Button>SHOW NOW</Button>
                        </Link>
                    </InforContainer>
                </Slide>
                ))}
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowRightOutlined />
            </Arrow>
        </Container>
    );
};

export default Slider;
