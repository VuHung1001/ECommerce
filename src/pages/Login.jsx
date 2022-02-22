import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { login } from '../redux/apiCalls'
import { mobile } from '../responsive'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { reset } from '../redux/userRedux'
import Notification from '../components/Notification'
import LoginGoogle from '../components/LoginGoogle'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
    rgba(255, 255, 255, 0.5), 
    rgba(255, 255, 255 ,0.5)
    ),
    url("https://images2.alphacoders.com/424/thumb-1920-42470.jpg") 
    center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width: 30%;
    padding: 20px;
    ${mobile({width: '75%'})}
`
const Title = styled.h1`
    font-weight: 300;
    font-size: 24px;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0px;
    padding: 10px;
`
const Button = styled.button`
    width: 50%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover{
        transform: scale(1.1);
    }
    margin-bottom: 5px;
    &:disabled{
        color: orange;
        cursor: not-allowed;
    }
`
const Error = styled.span`
    color: red;
`

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const {isFetching, error} = useSelector((state) => state.user)
    const [notifyMes, setNotifyMes] = useState('')
    const [notifyType, setNotifyType] = useState('info')
    const [notifyTitle, setNotifyTitle] = useState('')

    const handleLogin = (e) => {
        e.preventDefault();

        if(username.trim() !== '' && password.trim() !== ''){
            try{
                login(dispatch, {username, password})
                
                const timeout = setTimeout(()=>{
                    !error && window.location.reload()
                    window.clearTimeout(timeout)
                }, 1000)                     
            }
            catch(err){
                console.dir(err)
            }
        } else {
            setNotifyMes('Your username or/and password is empty, please insert correctly')
            setNotifyType('warning')
            setNotifyTitle('Notice')
        }
    }

    useEffect(()=>{
        dispatch(reset())
        // document.querySelector('#username').focus()

        if(error) {
            setNotifyMes('Your username or/and password is incorrect, try again')
            setNotifyType('error')
            setNotifyTitle('Error')   
        }
    }, [dispatch, error])

    return (
        <Container>
            <Notification 
                title={notifyTitle}
                message={notifyMes}
                type={notifyType}
                duration={100000}
            />        
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input 
                        placeholder="username" id='username' required
                        onChange={
                            (e) => setUsername(e.target.value)
                        }
                    />
                    <Input 
                        placeholder="password" required
                        onChange={
                            (e) => setPassword(e.target.value)
                        }
                        type="password"
                    />
                    <Button 
                        onClick={handleLogin}
                        disabled={isFetching}
                    >LOGIN</Button>
                    <LoginGoogle/>
                    {error && <Error>Somethings went wrong...</Error>}
                    <Link to='/'
                        style={{    
                            margin: '5px 0px',
                            fontSize: '12px',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                        }}                    
                    >DON'T REMEMBER THE PASSWORD?</Link>
                    <Link to='/register'
                        style={{    
                            margin: '5px 0px',
                            fontSize: '12px',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                        }}
                    >CREATE A NEW ACCOUNT</Link>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login
