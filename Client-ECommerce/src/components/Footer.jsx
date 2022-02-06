import styled from "styled-components";
import { Facebook, Instagram, Twitter, Pinterest, Room, Mail, Phone } from "@material-ui/icons";
import { mobile } from "../responsive";
import GoToTop from "./GoToTop";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";
// import { userRequest } from "../requestMethods";

const Container = styled.div`
    display: flex;
    ${mobile({flexDirection: 'column'})}
`;
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;
const Logo = styled.h1`
`;
const Desc = styled.div`
    margin: 20px 0px;
`;
const SocialContainer = styled.div`
    display: flex;
`;
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;

const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({display: 'none'})}
`;
const Title = styled.h3`
    margin-bottom: 30px;
`;
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`;
const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({backgroundColor: '#fff8f8'})}
`;
const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;
const Payment = styled.img`
    width: 40px;
    height: 40px;    
`;

const Footer = () => {
    // const user = useSelector((state) => state.user)

    // useEffect(()=>{
    //     const getUserOrders = async()=>{
    //         try {
    //           const res = await userRequest.get("/orders/find/"+user?.currentUser?._id);
    //         } catch (err) {
    //         //   console.dir(err);
    //           if(err.response.data === 'Token is not valid!'){
    //               window.alert('You was not login or your login session is expired')
    //           }
    //           if(err.response.status === 401){
    //               window.alert('You was not login')
    //           }
    //         }
    //       }
    
    //       getUserOrders();        
    // }, [user])

    return (
        <Container>
            <GoToTop/>
            <Left>
                <Logo>ROBOS</Logo>
                <Desc>
                    Curabitur gravida nisi at nibh. In hac habitasse platea
                    dictumst. Aliquam augue quam, sollicitudin vitae ,
                    consectetuer eget, rutrum at, lorem.
                </Desc>
                <SocialContainer>
                    <SocialIcon color="3b5999">
                        <Facebook />
                    </SocialIcon>
                    <SocialIcon color="e4405f">
                        <Instagram />
                    </SocialIcon>
                    <SocialIcon color="55acee">
                        <Twitter />
                    </SocialIcon>
                    <SocialIcon color="e60023">
                        <Pinterest />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Transformers</ListItem>
                    <ListItem>Marvel</ListItem>
                    <ListItem>DC-Comic</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>WishList</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem><Room style={{marginRight:"10px"}}/> Ha Noi, Viet Nam</ContactItem>
                <ContactItem><Phone style={{marginRight:"10px"}}/> +84 123 456 789</ContactItem>
                <ContactItem><Mail style={{marginRight:"10px"}}/> contact@robos.com</ContactItem>
                <Payment src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"/>
            </Right>
        </Container>
    );
};

export default Footer;
