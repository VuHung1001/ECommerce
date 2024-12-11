import styled from "styled-components";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { Badge } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRef } from "react";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { GoogleLogout } from "react-google-login";
import Button from "@mui/material/Button";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Menu from "@mui/material/Menu";
// import MenuItem from '@mui/material/MenuItem';
import { logout } from "../redux/userRedux";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import Music from "./Music";
import Notification from "./Notification";
import "./navbar.css";

const Container = styled.div`
  ${mobile({ padding: "10px 0px" })}
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  width: 100vw;
  overflow: hidden;
  height: 70px;
  background-color: white;
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: '0px 20px'})}
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
  ${mobile({ width: "90%", marginLeft: "0px" })}
`;

const SearchLabel = styled.label`
  display: none;
  font-size: 12px;
  margin-right: 5px;
  ${mobile({ display: "block" })}
`;

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
  ${mobile({ flex: 2, justifyContent: "center", marginRight: "0px" })}
`;

const MenuItem = styled.div`
  display: flex;
  ${'' /* justify-content: center; */}
  justify-content: flex-start;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
  ${'' /* margin-left: 25px; */}
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.1);
  }
  ${mobile({
    fontSize: "12px",
    margin: "10px",
    justifyContent: "flex-start",
    alignItems: "center",
  })}
`;

const Navbar = ({ category }) => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user?.currentUser);
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef();
  const centerRef = useRef();
  const rightRef = useRef();
  const [notifyMes, setNotifyMes] = useState("");
  const [notifyType, setNotifyType] = useState("info");
  const [notifyTitle, setNotifyTitle] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if(!anchorEl){
      document.getElementById('root').style.opacity = 0.5;
      setAnchorEl(event.currentTarget)
    } else {
      document.getElementById('root').style.opacity = 1;
      setAnchorEl(null);
    }
  };

  const handleClose = () => {
    document.getElementById('root').style.opacity = 1;
    setAnchorEl(null);
  };

  //for device width <= 700
  const disableCenterRight = () => {
    if (window.innerWidth <= 700) {
      if (inputRef.current) {
        inputRef.current.style.width = "80vw";
      }
      if (centerRef.current?.childNodes) {
        // centerRef.current.style.display = 'none'
        centerRef.current.style.opacity = "0";
      }
      if (rightRef.current?.childNodes) {
        // rightRef.current.style.display = 'none'
        rightRef.current.style.opacity = "0";
      }
    } else {
      inputRef.current.style.width = "30vw";
    }
  };

  //for device width <= 700
  const displayCenterRight = () => {
    if (window.innerWidth <= 700) {
      if (inputRef.current) {
        inputRef.current.style.width = "100%";
      }
      if (centerRef.current?.childNodes) {
        // centerRef.current.style.display = 'block'
        centerRef.current.style.opacity = "1";
      }
      if (rightRef.current?.childNodes) {
        // rightRef.current.style.display = 'flex'
        rightRef.current.style.opacity = "1";
      }
    } else {
      inputRef.current.style.width = "100%";
    }
  };

  const handleLogout = (e) => {
    e && e.preventDefault();
    setNotifyMes("You are logged out");
    setNotifyType("warning");
    setNotifyTitle("Notice");
    dispatch(logout());
  };

  useEffect(() => {
    const search = async () => {
      try {
        /* eslint-disable-next-line */
        debugger;
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
      <Notification
        title={notifyTitle}
        message={notifyMes}
        type={notifyType}
        duration={5000}
      />
      <Music category={category} />
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer
            style={
              window.innerWidth < 1000 ? { width: "90%" } : { width: "60%" }
            }
          >
            <SearchLabel>Search:</SearchLabel>
            <Stack spacing={0} className="stack" sx={{ width: "100%" }}>
              <Autocomplete
                id="search-products"
                freeSolo
                // options={searchResults.map((option) => option.title)}
                options={searchResults}
                autoHighlight
                getOptionLabel={(option) => option.title}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <Link
                      to={`/product/${option._id}`}
                      className="link"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        loading="lazy"
                        height={
                          window.innerWidth > 700
                            ? window.innerWidth / 10 + "px"
                            : window.innerWidth / 4 + "px"
                        }
                        src={option.img[0]}
                        alt=""
                        style={{ flex: "1" }}
                      />
                      <div style={{ flex: "1", marginLeft: "10px" }}>
                        {option.title}
                        <br />
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
                  />
                )}
              />
            </Stack>
          </SearchContainer>
        </Left>
        <Center ref={centerRef}>
          <Logo>
            <Link to="/" className="link">
              <b>Figures</b>
            </Link>
          </Logo>
        </Center>
        <Right ref={rightRef}>
          {/* {window.innerWidth < 700 && ( */}
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}              
              // style={window.innerWidth > 700 ? {
              //   // width: '170px', 
              //   display: 'flex', 
              //   justifyContent: 'flex-end',
              //   border: 'none',
              //   backgroundColor: 'inherit',
              //   color: 'gray'
              // } : {}}             
            >
              <MenuRoundedIcon/>
            </Button>
          {/* )} */}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {!user?._id ? (
              <div>
                <Link to="/login" className="link">
                  <MenuItem onClick={handleClose}>
                    <LoginRoundedIcon />
                    LOG IN
                  </MenuItem>
                </Link>
                <Link to="/register" className="link">
                  <MenuItem onClick={handleClose}>
                    <PersonAddAltRoundedIcon />
                    REGISTER
                  </MenuItem>
                </Link>
              </div>
            ) : (
              <div>
                {user?.loginByGoogle ? (
                  <MenuItem onClick={handleClose}>
                    <GoogleLogout
                      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                      buttonText="Logout"
                      onLogoutSuccess={handleLogout}
                    ></GoogleLogout>
                  </MenuItem>
                ) : (
                  <Link to="/logout" onClick={handleLogout} className="link">
                    <MenuItem onClick={handleClose}>
                      <LogoutRoundedIcon />
                      LOG OUT
                    </MenuItem>
                  </Link>
                )}
                <Link to="/account" className="link">
                  <MenuItem onClick={handleClose}>
                    <PersonRoundedIcon />
                    YOUR ACCOUNT
                  </MenuItem>
                </Link>
              </div>
            )}
          </Menu>
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary" overlap="rectangular">
                <ShoppingCartRoundedIcon style={{ color: "#008080" }} />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
