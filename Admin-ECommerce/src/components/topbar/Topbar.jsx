import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { logout } from "../../redux/userRedux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {userRequest} from '../../requestMethods'
import Notification from "../../components/notification/Notification";

export default function Topbar() {
  const dispatch = useDispatch();  
  const [message, setMessage] = useState('')
  const [type, setType] = useState('info')
  const [title, setTitle] = useState('')  

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  useEffect(() => {
    const authorize = async() =>{
      try{
        const res = await userRequest.get('/auth/authorize');
        if(res?.data === 'authorized'){
          setMessage('Hello Admin')
          setType('success')
          setTitle('Welcome')        
        }
      } catch(err){
        console.dir(err);
        if(err?.response?.data === 'Token is not valid!'){
          setMessage('Your login session has expired, please login again')
          setType('warning')
          setTitle('Notice')
        }
        if(err?.response?.status === 401){
          setMessage('You are not logged in')
          setType('warning')
          setTitle('Notice')
        }        
      }
    }

    authorize();
  }, [])

  return (
    <div className="topbar">
      <Notification title={title} message={message} type={type} />
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">ROBUS</span>
        </div>
        <div className="topRight">
          <Link to="/logout" onClick={handleLogout} className="link">
            <div className="topbarIconContainer" title='LOGOUT'>
              <LogoutRoundedIcon/>
            </div>
          </Link>        
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="https://blog.logomyway.com/wp-content/uploads/2021/08/transformer-logo.jpg" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
