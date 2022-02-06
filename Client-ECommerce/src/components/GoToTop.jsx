import { useEffect, useRef } from "react";
import styled from "styled-components";
import {ArrowUpwardRounded} from "@material-ui/icons";

const Button = styled.button`
  display: none;
  width: 50px;
  height: 50px;
  padding: 10px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: grey;
  color: white;
  cursor: pointer;
  border-radius: 50%;
  border: none;
  box-shadow: 0 5px 10px #ccc;
  z-index: 3;
  opacity: 0.6;
  transition: all 0.5s ease;
  &:hover{
      opacity: 1.0;
      transform: scale(1.1);
      background: #008080;
  }
`

const GoToTop = () => {
  // The back-to-top button is hidden at the beginning
  const btnRef = useRef();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(btnRef.current){
        if (window.pageYOffset > 300) {
          btnRef.current.style.display = 'block';
        } else {
          btnRef.current.style.display = 'none';
        }
      }
    });
  }, []);

  // This function will scroll the window to the top 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    });
  };

  return (
    <Button onClick={scrollToTop} ref={btnRef}>
      <ArrowUpwardRounded/>
    </Button>
  );
};

export default GoToTop;