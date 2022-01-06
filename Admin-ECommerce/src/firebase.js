// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsIGmwM8CsEa_um53eis8rnPd6-VqDTjQ",
  authDomain: "figures-shop-f6bdb.firebaseapp.com",
  projectId: "figures-shop-f6bdb",
  storageBucket: "figures-shop-f6bdb.appspot.com",
  messagingSenderId: "103936304765",
  appId: "1:103936304765:web:13d5581d8fa1862800f314"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;