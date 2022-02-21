import styled from "styled-components";
import { ShoppingCartOutlined } from "@material-ui/icons";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Box from '@mui/material/Box';
import { Badge } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRef } from "react";
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import {GoogleLogout} from 'react-google-login'
import { logout } from "../redux/userRedux";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import Music from "../components/Music";
import "./navbar.css";

const Container = styled.div`
  ${mobile({ padding: "10px 0px" })}
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  width: 100vw;
  overflow: hidden;
  height: 60px;
  background-color: white;
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${mobile({ flex: 2 })}
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25px;
  width: 60%;
  ${mobile({ width: '90%', marginLeft: '0px' })}
`;

const SearchLabel = styled.label`
  display: none;
  font-size: 10px;
  margin-right: 5px;
  ${mobile({ display: "block" })}
`

const Center = styled.div`
  flex: 1;
  text-align: center;
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  margin-right: 10px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  transition: all 0.5s ease;
  ${mobile({ flex: 3, justifyContent: "center", marginRight: '0px' })}
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
  margin-left: 25px;
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.1);
  }
  ${mobile({ fontSize: "10px", marginLeft: "10px" })}
`;

const Navbar = ({category}) => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user?.currentUser)
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef();
  const centerRef = useRef();
  const rightRef = useRef();

  //for device width <= 700
  const disableCenterRight = ()=>{
    if(window.innerWidth <= 700 ){
      if(centerRef.current?.childNodes){
          // centerRef.current.style.display = 'none'
          centerRef.current.style.opacity = '0'
      }
      if(rightRef.current?.childNodes){
        // rightRef.current.style.display = 'none'
        rightRef.current.style.opacity = '0'
      }
      if(inputRef.current){
          inputRef.current.style.width = '80vw'
      }
    } else {
      inputRef.current.style.width = '30vw'
    }
  }
  
  //for device width <= 700
  const displayCenterRight = ()=>{
    if(window.innerWidth <= 700 ){
      if(centerRef.current?.childNodes){
          // centerRef.current.style.display = 'block'
          centerRef.current.style.opacity = '1'
      }
      if(rightRef.current?.childNodes){
        // rightRef.current.style.display = 'flex'
        rightRef.current.style.opacity = '1'
      }
      if(inputRef.current){
        inputRef.current.style.width = '100%'
      }
    }
    else {
      inputRef.current.style.width = '100%'
    }
  }

  const handleLogout = (e) => {
    e && e.preventDefault();
    dispatch(logout());
  };

  useEffect(() => {
    const search = async () => {
      try {
        const res = await publicRequest.get("/products");
        setSearchResults(res.data);
      } catch (err) {
        console.dir(err);
        setSearchResults([]);
      }
    };
    search();
  }, []);

  return (
    <Container>
      <Music category={category}/>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer style={
              window.innerWidth<1000 ? {width: '90%'} : {width: '60%'}
            }>
            <SearchLabel>Search:</SearchLabel>
            <Stack spacing={0} className="stack" sx={{ width: '100%' }}>
              <Autocomplete
                id="search-products"
                freeSolo
                // options={searchResults.map((option) => option.title)}
                options={searchResults}
                autoHighlight
                getOptionLabel={(option) => option.title}
                renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <Link to={`/product/${option._id}`} className="link"
                        style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                      >
                      <img
                        loading="lazy"
                        height={
                            window.innerWidth > 700
                            ? (window.innerWidth / 10)+'px'
                            : (window.innerWidth / 4)+'px'
                        }
                        src={option.img[0]}
                        alt=""
                        style={{flex: '1'}}
                      />
                      <div style={{flex: '1', marginLeft: '10px'}}>
                      {option.title}<br/>
                      {option.price} &#8363;
                      </div>
                      </Link>
                    </Box>
                  )}
                renderInput={(params) => (
                  <TextField 
                    ref={inputRef}
                    onFocus={disableCenterRight}
                    onBlur={displayCenterRight}
                    {...params} 
                    label="search"
                    style={{
                      transition: 'all 0.5s ease'
                    }}
                  />
                )}
              />
            </Stack>
          </SearchContainer>
        </Left>
        <Center ref={centerRef}>
          <Logo>
            <Link to="/" className="link">
              <b>Robos</b>
            </Link>
          </Logo>
        </Center>
        <Right ref={rightRef}>
          {!user?._id
            ? (
              <>
              <Link to="/login" className="link">
                <MenuItem><LoginRoundedIcon/>LOG IN</MenuItem>
              </Link>
              <Link to="/register" className="link">
                <MenuItem><PersonAddAltRoundedIcon/>REGISTER</MenuItem>
              </Link>
              </>
            )
            : (
              <>
              {
                user?.loginByGoogle 
                  ? (
                    <GoogleLogout
                      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                      buttonText="Logout"
                      onLogoutSuccess={handleLogout}
                    ></GoogleLogout>        
                  )
                  : (
                    <Link to="/logout" onClick={handleLogout} className="link">
                      <MenuItem><LogoutRoundedIcon/>LOG OUT</MenuItem>
                    </Link>
                  )      
              }
              <Link to="/account" className="link">
                <MenuItem><PersonRoundedIcon/>YOUR ACCOUNT</MenuItem>
              </Link>
              </>
            )
          }
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
