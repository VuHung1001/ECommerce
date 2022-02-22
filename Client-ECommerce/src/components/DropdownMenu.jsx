import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { GoogleLogout } from "react-google-login";
import { Link } from "react-router-dom";
import { logout } from "../redux/userRedux";
import { mobile } from "../responsive";

const MenuItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
  margin: 25px;
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

const Container = styled.div`
  max-height: 60px;
  height: 50px;
  margin-right: 10px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  ${mobile({
    flex: 3,
    justifyContent: "flex-start", 
    flexDirection: "column",
    marginRight: "0px",
  })}
`

const DropdownMenu = ({handleClose, setNotifyMes, setNotifyTitle, setNotifyType}) => {
  const user = useSelector((state) => state.user?.currentUser);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e && e.preventDefault();
    setNotifyMes("You are logged out");
    setNotifyType("warning");
    setNotifyTitle("Notice");
    dispatch(logout());
  }; 

  return (
    <>  
      {!user?._id ? (
        <Container>
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
        </Container>
      ) : (
        <Container>
          {user?.loginByGoogle ? (
            <MenuItem onClick={handleClose}>
              <GoogleLogout
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
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
        </Container>
      )}
    </>
  );
};

export default DropdownMenu;
