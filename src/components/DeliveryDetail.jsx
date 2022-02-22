import { CloseRounded } from "@material-ui/icons";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { setAddressCart } from "../redux/cartRedux";
import "./delivery-detail.css";

const Button = styled.button`
  margin-bottom: 8px;
  padding: 8px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 10px;
  background-color: #A50064;
  color: white;
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const DeliveryDetail = ({ displayDelivery, setDisplayDelivery, setAddress }) => {
  const cart = useSelector((state) => state.cart);
  const [errors, setErrors] = useState([false, false, false ,false])
  const [addressObj, setAddressObj] = useState(null)

  const disableDelivery = () => {
    setDisplayDelivery(false);
  };

  const handleDeliveryDetail=(e)=>{
    e.preventDefault();
    const name = document.querySelector('#delivery-name').value;
    const address = document.querySelector('#delivery-address').value;
    const phone = document.querySelector('#delivery-phone').value;
    const email = document.querySelector('#delivery-email').value;
    const note = document.querySelector('#delivery-note').value;

    const nameRegex = new RegExp(/^([aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]{2,})+\s+([aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s]{2,})+$/i)
    const addressRegex = new RegExp(/^([sSốỐ0-9a-zA-Z\s]{1,7})+[\s,.'-]+([aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9\s,.'-]{3,7}){5,}$/i)
    const phoneRegex = new RegExp(/^[+\s]?[(]?[0-9]{2,4}[)]?[-\s.]?([0-9]{3}[-\s.]?){1,2}[0-9]{3,6}$/im)
    const emailRegex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i)

    setErrors([
      !nameRegex.test(name),
      !addressRegex.test(address),
      !phoneRegex.test(phone),
      !emailRegex.test(email)
    ])
    setAddressObj({name, address, phone, email, note})
  }

  useEffect(()=>{
    // edit width of textarea
    let input = document.querySelector('#delivery-name')
    let textarea = document.querySelector('#delivery-address')
    if(input && textarea && input.offsetWidth > 0){
      textarea.style.width = (input.offsetWidth -24)+"px"
    }

    // set address for SelectPayment
    if(!errors.includes(true) && addressObj){
      setAddressCart(addressObj)
      setAddress({
        ...addressObj
      })
    }
  }, [displayDelivery, errors, setAddress, addressObj])

  return (
    <div
      className="delivery-container"
      style={{ display: displayDelivery ? "block" : "none" }}
    >
      <div className="paragraph">
        <p className="mb-0 fw-bold h4">
          <b>Select Payment Method</b>
        </p>
        <CloseRounded onClick={disableDelivery} />
      </div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="delivery-name"
          label="Full Name"
          variant="filled"
          defaultValue={cart?.address?.name}
          color= {errors[0] ? 'error' : "primary"}
          error = {errors[0]}
          helperText={errors[0] ? "Exp: Nguyễn Văn An, vũ hà" : ''}
        />
        <TextField
          required
          id="delivery-address"
          label="Address"
          variant="filled"
          defaultValue={cart?.address?.address}
          color= {errors[1] ? 'error' : "primary"}
          error = {errors[1]}
          helperText={errors[1] ? "Exp: 01, hàng trống, hoàn kiếm" : ''}
          multiline
          maxRows={4}
        />
        <TextField
          required
          id="delivery-phone"
          label="Phone Number"
          variant="filled"
          defaultValue={cart?.address?.phone}
          color= {errors[2] ? 'error' : "primary"}
          error = {errors[2]}
          helperText={errors[2] ? "Exp:0123456789, +84123456789" : ''}
        />
        <TextField
          id="delivery-email"
          label="Email address"
          type="mail"
          variant="filled"
          defaultValue={cart?.address?.email}
          color= {errors[3] ? 'error' : "primary"}
          error = {errors[3]}
          helperText={errors[3] ? "Exp: a@a.aa, hung@gmail.com" : ''}
        />
        <TextField
          id="delivery-note"
          label="Note"
          variant="filled"
          defaultValue={cart?.address?.note}
          color="success"
        />
        <Button onClick={handleDeliveryDetail}>use momo wallet</Button>
      </Box>
    </div>
  );
};

export default DeliveryDetail;
