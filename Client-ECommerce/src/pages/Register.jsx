import styled from 'styled-components'
import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../redux/apiCalls'
import {reset} from '../redux/userRedux'
import { mobile } from '../responsive'
import Notification from '../components/Notification'

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
    width: 40%;
    padding: 20px;
    ${mobile({width: '75%'})}
`
const Title = styled.h1`
    font-weight: 300;
    font-size: 24px;
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`
const Agreement = styled.span`
        font-size: 15px;
        margin: 20px 0px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    margin-right: 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover{
        transform: scale(1.1);
    }
    &:disabled{
        color: orange;
        cursor: not-allowed;
    }
`
// const Error = styled.span`
//     color: red;
// `

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const dispatch = useDispatch();
    const {isFetching, error} = useSelector((state) => state.user)
    const [notifyMes, setNotifyMes] = useState('')
    const [notifyType, setNotifyType] = useState('info')
    const [notifyTitle, setNotifyTitle] = useState('')
    // const [notifyDuration, setNotifyDuration] = useState(5000)
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault();

        const usernameReg = new RegExp(/^(?!.*(!|@|#|\$|%|\^|&|\*|\(|\)|\+|=|`|~|'|"|;|:|,|<|\.|>|\/|\?))[a-zA-Z0-9\-_]{6,20}$/)
        const emailReg = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i)
        const passwordReg = new RegExp(/^[A-Za-z0-9_-]{8,20}$/)
        if(!usernameReg.test(username) || !emailReg.test(email) || !passwordReg.test(password) || password !== confirmPassword){
            if(!usernameReg.test(username)){
                setNotifyMes('Your username should be between 6 and 20 characters'
                    +'<br/>, including letters, numbers, " - ", " _ "')
                setNotifyType('error')
                setNotifyTitle('Validation error')
                return;
            } 
            if(!emailReg.test(email)){
                setNotifyMes('Your email should be correct, example: "abc@gmail.com"')
                setNotifyType('error')
                setNotifyTitle('Validation error')
                return;
            }
            if(!passwordReg.test(password)){
                setNotifyMes('Your password should be between 8 and 20 characters, '
                +'<br/> which contain letters, numbers'
                +'<br/> and the following characters : " - ", " _ "')
                setNotifyType('error')
                setNotifyTitle('Validation error')
                return;
            }
            if(password !== confirmPassword){
                setNotifyMes('Your confirm password should be same as your password')
                setNotifyType('error')
                setNotifyTitle('Validation error')
                return;
            }
        } else {
            register(dispatch, {username, email, password})
            
            const timeout = setTimeout(()=>{
                if(!error){
                    setNotifyMes('Congratulations! Your account has been registered')
                    setNotifyType('success')
                    setNotifyTitle('Success')

                    const timeout2 = setTimeout(()=>{
                        navigate('/login')
                        window.clearTimeout(timeout2)
                    }, 3000)                    
                }
                window.clearTimeout(timeout)
            }, 5000)
        }
    }

    const suggest = (inputType)=>{
        switch(inputType){
            case 'username':
                setNotifyMes('Between 6 and 20 characters'
                +'<br/>, including letters, numbers, " - ", " _ "')
                setNotifyType('info')
                setNotifyTitle('Suggestion')                
                break;
            case 'email':
                setNotifyMes('Email example: "abc@gmail.com"')
                setNotifyType('info')
                setNotifyTitle('Suggestion')
                break;
            case 'password':
                setNotifyMes('Between 8 and 20 characters, which contain at least'
                    +'<br/> one uppercase, one lowercase letter, one number'
                    +' and one character is listed below: " - ", " _ "')
                setNotifyType('info')
                setNotifyTitle('Suggestion')
                break;
            case 'conPassword':
                setNotifyMes('Be same as your password')
                setNotifyType('info')
                setNotifyTitle('Suggestion')
                break;
            default:
                setNotifyMes('All field should be inputted correctly. Thanks!')
                setNotifyType('info')
                setNotifyTitle('Suggestion')
                break;
        }
    }

    useEffect(()=>{
        dispatch(reset())
        document.querySelector('#username').focus()
        if(error){
            setNotifyMes('Your username was exists, try again')
            setNotifyType('error')
            setNotifyTitle('Error')

            const timeout = setTimeout(()=>{
                window.location.reload()
                window.clearTimeout(timeout)
            }, 3000)
        }
    }, [dispatch, error])

    return (
        <Container>
            <Notification 
                title={notifyTitle}
                message={notifyMes}
                type={notifyType}
            />
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    {/* <Input placeholder="name"/> */}
                    {/* <Input placeholder="last name"/> */}
                    <Input placeholder="username" type='text' id='username' required value={username}
                        onChange={
                            (e) => setUsername(e.target.value)
                        }
                        onClick={()=>{suggest('username')}}                        
                    />
                    <Input placeholder="email" type="email" required value={email}
                        onChange={
                            (e) => setEmail(e.target.value)
                        }  
                        onClick={()=>{suggest('email')}}                      
                    />
                    <Input placeholder="password" type="password" required value={password}
                        onChange={
                            (e) => setPassword(e.target.value)
                        }
                        onClick={()=>{suggest('password')}}                        
                    />
                    <Input placeholder="confirm password" type="password" required value={confirmPassword}
                        onChange={
                            (e) => setConfirmPassword(e.target.value)
                        }
                        onClick={()=>{suggest('conPassword')}}                        
                    />
                    <Agreement>
                        By creating an account, I consent to the processing
                        of my personal data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    
                    <Button
                        onClick={handleRegister}
                        disabled={isFetching}
                    >CREATE</Button>
                    <Link to='/login' style={{fontSize: '15px'}}>You already have an account <br/> redirect to login page</Link>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register
