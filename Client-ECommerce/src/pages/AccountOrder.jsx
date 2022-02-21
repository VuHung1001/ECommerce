import {useEffect} from 'react';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import OrderDetail from '../components/OrderDetail';

const AccountOrder = () => {
  useEffect(()=> {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }); 
  },[])

  return (
    <>
    <Navbar/>
    <Announcement/>
    <OrderDetail/>
    <Newsletter/>
    <Footer/>
    </>
  );
};

export default AccountOrder;
