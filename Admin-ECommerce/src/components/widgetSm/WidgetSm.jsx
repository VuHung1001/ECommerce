import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import { Link } from "react-router-dom";
import User from "../../pages/user/User";
import { Pagination } from "@mui/material";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const rowPerPage = 8;
  const [totalPage, setTotalPage] = useState(1);  

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/?new=true");
        setUsers(res.data);
        setTotalPage(Math.ceil(res.data.length / rowPerPage))
      } catch (err){console.dir(err)}
    };
    getUsers();
  }, []);
  
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.slice((page-1)*rowPerPage, page * rowPerPage).map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={
                user.img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span 
                className="widgetSmUsername"
                style={user.loginByGoogle ? {whiteSpace: 'pre-line', fontSize: '12px'} : {}}
              >{user.loginByGoogle ? user.email : user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Link to={'/admin/user/'+user._id} className='link' element={<User/>}>
              <Visibility className="widgetSmIcon" />
              Display
              </Link>
            </button>
          </li>
        ))}
      </ul>
      <div style={{
        marginTop: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',        
      }}>
        <Pagination
          page={page}
          count={totalPage}
          onChange={(e, value) => setPage(value)}
        />
      </div>      
    </div>
  );
}
