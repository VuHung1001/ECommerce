import { Send } from '@material-ui/icons'
import styled from 'styled-components'
import {useState} from 'react'
import { mobile } from '../responsive'
import TextField from "@mui/material/TextField"
import { publicRequest } from '../requestMethods'
import Notification from '../components/Notification'

const Container = styled.div`
    height: 40vh;
    background-color: #fcf5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 20px;
`
const Description = styled.div`
    fon-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
    ${mobile({textAlign: 'center'})}
`
const InputContainer = styled.div`
    width: 40%;
    height: 40px;
    background-color: #fcf5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    ${'' /* border: 1px solid lightgray; */}
    ${mobile({width: '80%'})}
`
// const Input = styled.input`
//     border: none;
//     flex: 8;
//     padding-left: 20px;
// `
const Button = styled.button`
    margin-left: 10px;
    height: 50px;
    width: 15%;
    border: none;
    border-radius: 5px;
    background-color: teal;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    &:hover{
        background-color: #00a6a6;
        transform: scale(1.1);
    }
`
const Newsletter = () => {
    const [hasError, setHasError] = useState(false)
    const [notifyMes, setNotifyMes] = useState('')
    const [notifyType, setNotifyType] = useState('info')
    const [notifyTitle, setNotifyTitle] = useState('')
    
    const handleMail = async () => {
        const mailInput = document.querySelector('#user-mail');
        const emailRegex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i)

        if(!emailRegex.test(mailInput.value)){
            setHasError(true)
            mailInput.focus()
        }else{
            setHasError(false)
            
            try{
                const res = publicRequest.post('/mail', {userMail: mailInput.value})
                if(res){
                    setNotifyMes('We sent a mail to your email, thanks for trusted our service')
                    setNotifyType('success')
                    setNotifyTitle('Success')
                    mailInput.value=''
                }
            } catch(e) {
                console.dir(e)
                setNotifyMes('An error has occurred, sorry for this inconvenience')
                setNotifyType('error')
                setNotifyTitle('Error')
            }
        }
    }

    return (
        <Container>
            <Notification 
                title={notifyTitle}
                message={notifyMes}
                type={notifyType}
                duration={5000}
            />  
            <Title>Newsletter</Title>
            <Description>Get timely updates from your favorite products.</Description>
            <InputContainer>
                <TextField
                    required
                    id="user-mail"
                    label="Your Mail"
                    variant="filled"
                    color= {hasError ? 'error' : "primary"}
                    error = {hasError}
                    helperText={
                        hasError 
                        ? "Your inputted mail wasn't correct yet. Email example: abc@mail.com" 
                        : ''
                    }
                />
                <Button onClick={handleMail}>
                    <Send/>
                </Button>
            </InputContainer>
        </Container>
    )
}

export default Newsletter
