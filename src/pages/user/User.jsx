import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./user.css";
import { Google } from "@mui/icons-material";

export default function User() {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];

  const user = useSelector((state) =>
      state.user.allUsers.find((user) => user._id === userId)
  );  

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">View User</h1>
        {/* <Link to="/admin/newUser">
          <button className="userAddButton">Create</button>
        </Link> */}
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
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
        </div>
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
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Hung Vu"
                  className="userUpdateInput"
                  readOnly
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text" id='email' name='email' 
                  placeholder={user.email}
                  className="userUpdateInput"
                  readOnly
                />
              </div>
              <div className="userUpdateItem">
                <label>Is Admin</label>
                {/* <select name="isAdmin" id="isAdmin" defaultValue={user.isAdmin}>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select> */}
                <input
                  type="text" id='isAdmin' name='isAdmin' 
                  placeholder={user.isAdmin+''}
                  className="userUpdateInput"
                  readOnly
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+84 123 456 67"
                  className="userUpdateInput"
                  readOnly
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Hanoi | Vietnam"
                  className="userUpdateInput"
                  readOnly
                />
              </div>
            </div>
            {/* <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={user.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
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
      </div>
    </div>
  );
}
