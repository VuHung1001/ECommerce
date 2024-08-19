import {GoogleLogin} from 'react-google-login'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios';
import {useState, useEffect} from 'react'
import { publicRequest } from "../requestMethods";
import { reset } from '../redux/userRedux'
import { login } from '../redux/apiCalls'
import Notification from '../components/Notification'

const LoginGoogle = ()=>{
  const dispatch = useDispatch()
  const {isFetching, error} = useSelector((state) => state.user)
  const [notifyMes, setNotifyMes] = useState('')
  const [notifyType, setNotifyType] = useState('info')
  const [notifyTitle, setNotifyTitle] = useState('')

  const responseGoogle = async (res)=>{
    try{
      const googleAuthRes = await axios.get(
        'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='
        +res.tokenId
      )

      if(googleAuthRes.data?.email_verified === 'true'){
        let user = {
          email: res.profileObj.email,
          username: res.profileObj.googleId,
          password: res.profileObj.googleId,
          loginByGoogle: true,
          img: res.profileObj.imageUrl
        }

        const checkUserRes = await publicRequest.get("/auth/checkUsername/"+user.username);

        if(checkUserRes.data === 'OK'){
          const registerRes = await publicRequest.post("/auth/register", user);
          user = null
          user= {...registerRes.data, password: res.profileObj.googleId}
          user && login(dispatch, user);
        }
        else{
          user.password && login(dispatch, user);
        }
        const timeout = setTimeout(()=>{
          !error && window.location.reload()
          window.clearTimeout(timeout)
        }, 1000) 

      } else {
        setNotifyMes('Your email cannot authorize')
        setNotifyType('warning')
        setNotifyTitle('Notice')      
      }
    } catch(err){
      console.dir(err)
      setNotifyMes(err.response.data)
      setNotifyType('error')
      setNotifyTitle('Error')  
    }    
  }

  useEffect(()=>{
    if(error) {
      setNotifyMes('Your username or/and password is incorrect, try again')
      setNotifyType('error')
      setNotifyTitle('Error')   
      dispatch(reset())
    }
  }, [dispatch, error])  

  return (
    <div disabled={isFetching}>
      <Notification 
          title={notifyTitle}
          message={notifyMes}
          type={notifyType}
          duration={10000}
      />     
      <GoogleLogin
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
        buttonText='Login with Google'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}     
      />
    </div>
  )
}

export default LoginGoogle