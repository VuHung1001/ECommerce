import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/notification/Notification";
import { login } from "../../redux/apiCalls";
import { logout } from '../../redux/userRedux'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {isFetching, error} = useSelector((state) => state.user)
  const [notifyMes, setNotifyMes] = useState('')
  const [notifyType, setNotifyType] = useState('info')
  const [notifyTitle, setNotifyTitle] = useState('')
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault();

    if(username.trim() !== '' && password.trim() !== ''){
      try{
          login(dispatch, {username, password})
          navigate('/admin')
          const timeout = setTimeout(()=>{
              !error && window.location.reload()
              window.clearTimeout(timeout)
          }, 1500)                     
      }
      catch(err){
          console.dir(err)
      }
    } else {
        setNotifyMes('Your username or/and password is empty, please insert correctly')
        setNotifyType('warning')
        setNotifyTitle('Notice')
    }
  };

  useEffect(()=>{
    dispatch(logout())
    document.querySelector('#username').focus()

    if(error) {
        setNotifyMes('Your username or/and password is incorrect<br/> or username are not admin username, try again')
        setNotifyType('error')
        setNotifyTitle('Error')   
    }
  }, [dispatch, error])  

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Notification 
          title={notifyTitle}
          message={notifyMes}
          type={notifyType}
          duration={100000}
      />      
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        id='username'
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick} style={{ padding: 10, width:100 }} disabled={isFetching}>
        Login
      </button>
    </div>
  );
};

export default Login;
