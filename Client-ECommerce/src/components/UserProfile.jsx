// import {
//   CalendarToday,
//   LocationSearching,
//   MailOutline,
//   PermIdentity,
//   PhoneAndroid,
// } from "@material-ui/icons";
import { useSelector } from "react-redux";
// import { Publish } from "@material-ui/icons";
import "./user-profile.css";
import OrderList from '../components/OrderList';
import {useState, useEffect} from 'react';
import { userRequest } from "../requestMethods";
import CryptoJS from "crypto-js";// hash password
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import Google from "@mui/icons-material/Google";

export default function User() {
  const user = useSelector((state) => state.user?.currentUser);
  const [password, setPassword] = useState(null)
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [hadFoundedPassword, setHadFoundedPassword] = useState(false)

  const handleClick = ()=>{
    let passInput = document.getElementById('password')

    if(passInput)
      if(!isPassVisible) {
        passInput.type = 'text'
        setIsPassVisible(true)
      } else{
        passInput.type = 'password'
        setIsPassVisible(false)
      } 
  }

  useEffect(()=>{
    const getPassword = async () => {
      try {
        const res = await userRequest.get("users/findPassword/"+user._id);
        if(res.data === 'Admin should not see his or someone else password')
          setPassword(null);
        else 
          setPassword(res.data)
      } catch(err) {
        console.dir(err);
      }
    };
    user && password === null && getPassword();

    if(password && !hadFoundedPassword){
      const hashedPassword = CryptoJS.AES.decrypt(
        password,
        process.env.REACT_APP_PASS_SEC
      );
        
      // original password was found from db
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);  
      setPassword(originalPassword)  
      setHadFoundedPassword(true)
    }
  }, [user, password, hadFoundedPassword]);

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">View User</h1>
      </div>
      <div className="userContainer">
        {/* <div className="userShow">
          <div className="userShowTop">
            <img
              src={user?.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">Hung Vu</span>
              <span className="userShowUserTitle">Programmer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">Hung Vu</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.01.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+84 123 456 67</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">hungvu@gmail.com</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">Hanoi | Vietnam</span>
            </div>
          </div>
        </div> */}
        <div className="userUpdate">
          <span className="userUpdateTitle">Info</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Profile picture</label>
                <img src={user?.img} alt={user?.username}
                  style={{
                    backgroundColor: 'hsl(0, 0%, 90%)',
                    transition: 'background-color 300ms',  
                    borderRadius: '50%',  
                    width: '80px',
                    height: '80px'                
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>
              {!user?.loginByGoogle && (
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text" id='username' name='username' 
                  placeholder={user?.username}
                  defaultValue={user?.username}
                  className="userUpdateInput"
                  readOnly
                />
              </div>
              )}
              {user?.loginByGoogle && (
              <div className="userUpdateItem">
                <label>Logged by:</label>
                <Google/>
              </div>
              )}
              {!user?.loginByGoogle && (
              <div className="userUpdateItem">
                <label>Password</label>
                <div style={{display: 'flex', width: '100%', flexWrap: 'wrap'}}>
                <input
                  type="password" id='password' name='password' 
                  placeholder={password}
                  defaultValue={password}
                  className="userUpdateInput"
                  readOnly
                  style={{marginRight: '50px'}} 
                />
                {!isPassVisible ? (
                <VisibilityRoundedIcon onClick={()=>handleClick()}/>
                ) : (
                <VisibilityOffRoundedIcon onClick={()=>handleClick()}/>
                )}
                </div>
              </div>
              )}
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text" id='email' name='email' 
                  placeholder={user?.email}
                  defaultValue={user?.email}
                  className="userUpdateInput"
                  readOnly
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+84 123 456 67"
                  defaultValue="+84 123 456 67"
                  className="userUpdateInput"
                  readOnly
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Hanoi | Vietnam"
                  defaultValue="Hanoi | Vietnam"
                  className="userUpdateInput"
                  readOnly
                />
              </div>
            </div>
            {/* <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={user?.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div> */}
          </form>
        </div>

        <OrderList/>
      </div>
    </div>
  );
}
