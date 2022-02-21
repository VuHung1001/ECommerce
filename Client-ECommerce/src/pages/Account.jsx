import {useEffect} from 'react';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import UserProfile from '../components/UserProfile';

const Account = () => {
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
    <UserProfile/>
    <Newsletter/>
    <Footer/>
    </>
  );
};

export default Account;
