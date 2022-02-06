import { Add, Remove } from "@material-ui/icons";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Carousel from 'react-material-ui-carousel'
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { addProduct } from "../redux/cartRedux";
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImgContainer = styled.div`
  height: 100vh;
  max-width: 49%;
  ${'' /* width: 40%; */}
  flex: 1;
  ${'' /* margin-right: 50px; */}
  ${mobile({ maxWidth: '100%', width: '100%', height: '70vh', margin: '30px 0px'})}
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
const Image = styled.img`
  height: 90vh;
  width: 100%;
  object-fit: contain;
  display: block;
  margin: auto;
  ${'' /* &:hover { transform: scale3d(1.1, 1.1, 1) } */}
  ${mobile({ maxHeight: '70vh', height: "100%", width: '100% !important'})}
`;
const ImgLen = styled.div`
  display: none;
  position: absolute;
  background-color: white;
  border-radius: 10px;
  opacity: 0.5;
  width: 200px;
  height: 200px;
  ${mobile({ display: 'none !important' })}
`
const ImgZoomed = styled.div`
  border: 1px solid #008080;
  border-radius: 10px;
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  background-repeat: no-repeat;
  margin: auto;
  margin-left: ${(props) => props.imgZoomMarginLeft + 50}px;
  margin-top: ${(props) => props.distanceImgToTop}px;
  object-fit: cover;
  ${mobile({ display: 'none !important' })}
`

const InfoContainer = styled.div`
  flex: 1;
  max-width: 49%;
  padding: 0px 50px;
  ${mobile({ padding: "10px", maxWidth: '100%', width: '90%' })}
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 10px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const OptionContainer = styled.div`
  width: 100%;
  margin: 20px 0px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
// const FilterContainer = styled.div`
//     display: flex;
//     align-items: center;
//     flex: 1;
// `
// const FilterTitle = styled.span`
//     font-size: 20px;
//     font-weight: 200;
// `
// const FilterSelect= styled.select`
//     cursor: pointer;
//     margin-left: 10px;
//     padding: 5px;
// `
// const FilterOption= styled.option`

// `

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  flex-wrap: wrap;
  justify-content: center;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  padding: 15px 5px 15px 0px;
  @media only screen and (max-width: 700px) {
    padding: 15px 0px;
  }
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Button = styled.button`
  padding: 5px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.1);
    background-color: lightgray;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [imgZoomMarginLeft, setImgZoomMarginLeft] = useState(0);
  const [distanceImgToTop, setDistanceToTop] = useState(0);
  // const [imgLeftSide, setImgLeftSide] = useState(0); // if img style width = 100%
  const [browserWidth, setBrowserWidth] = useState(window.innerWidth); //if img style width = 100%
  const [imgState, setImgState] = useState(document.getElementsByClassName("img-origin")[0])
  const [imgLensState, setImgLensState] = useState(document.getElementsByClassName("img-len")[0])
  const [imgZoomedState, setImgZoomedState] = useState(document.getElementById("img-zoomed"))
  const [imgIndex, setImgIndex] = useState(0)

  const handleQuantity = (type) => {
    if (type === "asc") setQuantity(quantity + 1);
    if (type === "desc") quantity > 1 && setQuantity(quantity - 1);
  };

  const addToCart = () => {
    dispatch(addProduct({ ...product, quantity }));
  };

  const changeImg = (now, prev) => {
    zoomOut();
    setImgState(document.getElementsByClassName("img-origin")[now])
    setImgLensState(document.getElementsByClassName("img-len")[now])
    setImgZoomedState(document.getElementsByClassName("img-zoomed")[now])
    setImgIndex(now)
  }  

  const zoomOut = () => {
    let lens, result;
    imgLensState ? lens = imgLensState : lens = document.getElementsByClassName("img-len")[0];
    imgZoomedState ? result = imgZoomedState : result = document.getElementById("img-zoomed");
    result.style.display = "none";
    lens.style.display = 'none';
  }

  function zoomIn(e) {
    e.preventDefault();
    let img, lens, result, cx, cy;
    imgState?.src ? img = imgState : img = document.getElementsByClassName("img-origin")[0];
    imgLensState ? lens = imgLensState : lens = document.getElementsByClassName("img-len")[0];
    imgZoomedState ? result = imgZoomedState : result = document.getElementById("img-zoomed");
    
    lens.style.display = 'block';
    result.style.display = "inline-block";
    
    result.style.width = (lens?.offsetWidth*2)+'px'
    result.style.height = (lens?.offsetHeight*2)+'px'
    
    cx = result?.offsetWidth / lens?.offsetWidth;
    cy = result?.offsetHeight / lens?.offsetHeight;
    
    result.style.backgroundImage = "url('" + img?.src + "')";
    result.style.backgroundSize = (img?.width * cx) + "px " + (img?.height * cy) + "px";
    
    let pos, x, y;
    pos = getCursorPos(e);
    x = pos.x - (lens?.offsetWidth / 2);
    y = pos.y - (lens?.offsetHeight / 2);

    if (x > img?.width - lens?.offsetWidth) {x = img?.width - lens?.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > img?.height - lens?.offsetHeight) {y = img?.height - lens?.offsetHeight;}
    if (y < 0) {y = 0;}

    lens.style.left = x + /*imgLeftSide +*/ "px";
    lens.style.top = y +"px";
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";

    function getCursorPos(e) {
        let a, x = 0, y = 0;
        e = e || window.event;
        a = img.getBoundingClientRect();
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return {x : x, y : y};
    }
  } 

  useEffect(() => {
    window.scrollTo({
      top: 90,
      behavior: "smooth",
    });

    const interval = setInterval(() => {
      if(browserWidth !== window.innerWidth){ 
        setBrowserWidth(window.innerWidth);
        window.clearInterval(interval)
      }
    }, 1000)

    const interval2 = setInterval(() => {
      let imgTag = document.getElementsByClassName("img-origin")[imgIndex];
      let imgContainer = document.getElementById('img-container')
      let carouselArrow = document.getElementById('carouselArrow')
      
      if(imgContainer 
          && imgTag 
          && (imgTag.naturalHeight / imgTag.naturalWidth > 1)
        ){
        // let realImgWidth = imgTag?.naturalWidth / (imgTag?.naturalHeight / imgTag?.offsetHeight)
          
        // setImgLeftSide((imgTag?.offsetWidth - realImgWidth) / 2)
        setImgZoomMarginLeft(carouselArrow.parentNode.parentNode?.offsetWidth)
        setDistanceToTop(window.pageYOffset + imgTag.getBoundingClientRect().top)

        // imgTag.style.width = realImgWidth+'px';
        window.clearInterval(interval2);
      } 
      if(imgContainer 
          && imgTag 
          && (imgTag.naturalHeight / imgTag.naturalWidth <= 1) 
          && carouselArrow
        ) {
        let realImgHeight = imgTag.naturalHeight / (imgTag.naturalWidth / imgTag.offsetWidth)
          
        setImgZoomMarginLeft(carouselArrow.parentNode.parentNode?.offsetWidth)
        setDistanceToTop(window.pageYOffset + imgTag.getBoundingClientRect().top)

        imgTag.style.height = realImgHeight+'px'
        imgContainer.style.height = (realImgHeight + 120)+'px'
        carouselArrow.parentNode.parentNode.style.height = (realImgHeight + 120)+'px'
        imgTag.parentNode.parentNode.parentNode.parentNode.parentNode.style.height = realImgHeight +'px'
        window.clearInterval(interval2);
      }
    }, 1000)

    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (err) {
        console.dir(err);
      }
    };
    getProduct();

    return () => { setImgState(document.getElementById("img-origin")) }
  }, [id, imgIndex, browserWidth]);  

  return (  
    <Container>
      <Navbar category={product?.category}/>
      <Announcement />
      <Wrapper>
        <ImgContainer id='img-container'>
          <Carousel
            next={ (now, prev) => { } }
            prev={ (now, prev) => { } }
            changeOnFirstRender = {false}
            onChange={ (now, prev) => { product?.img && changeImg(now, prev) }}
            index={imgIndex}            
            autoPlay={true}
            fullHeightHover={false}
            interval={10000}
            animation='slide'
            duration={800}
            swipe={true}
            IndicatorIcon={
              product?.img?.map((value, index)=>(
                <img 
                  src={product?.img[index]} 
                  width='100' 
                  height='100' 
                  alt='indicator'
                  style={
                    index === imgIndex 
                      ? {opacity: '1.0', objectFit: 'cover'}
                      : {opacity: '0.6', objectFit: 'cover'}
                  }
                />
              ))
            }
            indicatorIconButtonProps={{
              style: {
                padding: '0px 10px',    
              }
            }}
            activeIndicatorIconButtonProps={{
              style: {
                opacity: '1.0'
              }
            }} 
            indicatorContainerProps={{
              style: {
                marginTop: '20px',
              }
            }}                       
            navButtonsProps={{
              style: {
                margin: 'auto',
                backgroundColor: '#008080',
                opacity: '0.5',
                transition: 'all 0.5s ease',
                '&:hover':{
                    opacity: '1.0',
                    transform: 'scale(1.1)',
                },
              }
            }}    
            NavButton={({onClick, className, style, next, prev}) => {
                return (
                    <Arrow id='carouselArrow' onClick={onClick} className={className} style={style}>
                        {next && <ArrowRightOutlined/>}
                        {prev && <ArrowLeftOutlined/>}
                    </Arrow>
                )
            }}                    
          >
            {product?.img?.map((value, index)=>(
              <div key={index} style={{width: 'fit-content', display: 'block', margin: 'auto', position: 'relative' }}>
              <Image
                className='img-origin'
                onMouseMove={(e) => {zoomIn(e)}}
                src={product.img[index]} 
              />
              <ImgLen
                className='img-len'
                onMouseMove={(e) => {zoomIn(e)}}  
                onMouseOut={zoomOut}
              />
              </div>
            ))}
          </Carousel>
          <ImgZoomed 
            id='img-zoomed' 
            imgZoomMarginLeft={imgZoomMarginLeft} 
            distanceImgToTop={distanceImgToTop}
          />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>{product.price} &#8363;</Price>

          <OptionContainer>
            {/* <FilterContainer>
                            <FilterTitle>Scale</FilterTitle>
                            <FilterSelect>
                                <FilterOption>1:10</FilterOption>
                                <FilterOption>1:20</FilterOption>
                                <FilterOption>1:30</FilterOption>
                                <FilterOption>1:50</FilterOption>
                            </FilterSelect>
                        </FilterContainer> */}

            <AddContainer>
              <AmountContainer>
                <Remove onClick={() => handleQuantity("desc")} />
                <Amount>{quantity}</Amount>
                <Add onClick={() => handleQuantity("asc")} />
              </AmountContainer>
              <Button onClick={addToCart}>ADD TO CART</Button>
            </AddContainer>
          </OptionContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
