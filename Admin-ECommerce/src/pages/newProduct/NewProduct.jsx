import { useState, useEffect } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/notification/Notification";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [product, setProduct] = useState({});
  const [files, setFiles] = useState([]);
  const [imgsLink, setImgsLink] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();
  const [notifyMes, setNotifyMes] = useState('')
  const [notifyType, setNotifyType] = useState('info')
  const [notifyTitle, setNotifyTitle] = useState('')
  const {isFetching, error} = useSelector((state) => state.user)
  // const [closeBtns, setCloseBtns] = useState([])

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value.trim() };
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();

    let title = document.getElementById('title').value;
    let desc = document.getElementById('desc').value;
    let price = document.getElementById('price').value;
    // let category = document.getElementById('category').value;
    // let stock = document.getElementById('stock').value;

    if(title.trim() === '' 
      || desc.trim() === '' 
      || price.trim() === '' 
      || price.trim()*1 < 10000 
      || price*1 % 1000 > 0
    ){
      setNotifyMes('Insert all fields correctly, please!!!')
      setNotifyType('error')
      setNotifyTitle('Error')       
    }
    else {   
      setProduct(inputs)

      // upload all selected images to firebase
      if(files.length > 0){
        setNotifyMes('Press f12 and open console tag to view all progress')
        setNotifyType('info')
        setNotifyTitle('Notice')  

        for( let file of files ) {
          // only pictures
          if (!file.type.match('image'))
            continue;

          const fileName = new Date().getTime() + file.name;
          const storage = getStorage(app);
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);

          // Register three observers:
          // 1. 'state_changed' observer, called any time the state changes
          // 2. Error observer, called on failure
          // 3. Completion observer, called on successful completion
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  setNotifyMes('Upload is paused')
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
                default:
                  console.log('Uploading');
                  break;
              }
            },
            (error) => {
              // Handle unsuccessful uploads
              console.dir(error)
              setNotifyMes('Error, press f12 and open console tag to view')
              setNotifyType('error')
              setNotifyTitle('Error')          
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImgsLink((prev)=>{
                  return [...prev, downloadURL]
                })
                console.log('File available at', downloadURL);
              });
            }
          );
        }
        setIsClicked(true)  
      }else {
        setNotifyMes('No files have been selected yet')
        setNotifyType('warning')
        setNotifyTitle('Notice')        
      }
    }
  };

  useEffect(()=> {       
    // check error exist
    if(error) {
      setNotifyMes('Error occurred while create new product')
      setNotifyType('error')
      setNotifyTitle('Error')   
    }   
    
    if(isClicked && imgsLink.length === files.length){
      const category = document.getElementById('category').value;
      const inStock = document.getElementById('stock').value; 
  
      const obj = product?.category && product?.inStock 
        ? { ...product, img: imgsLink, price: product.price*1 }
        : { ...product, img: imgsLink, price: product.price*1, category, inStock };

      addProduct(obj, dispatch);  

      setNotifyMes('Create new product success')
      setNotifyType('success')
      setNotifyTitle('Success') 
      
      const timeout = window.setTimeout(()=>{
        window.location.reload(); 
        window.clearTimeout(timeout)
      }, 5000)
    }

    //Check File API support
    if (window.File && window.FileList && window.FileReader) {
      let output = document.getElementById("result");

      // remove previous preview images before append new ones
      let child = output.lastElementChild; 
      while (child) {
          output.removeChild(child);
          child = output.lastElementChild;
      }

      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        //Only pics
        if (!file.type.match('image'))
          continue;

        let picReader = new FileReader();
        picReader.addEventListener("load", function(event) {
          let picFile = event.target;
          let div = document.createElement("div");
          div.style.position='relative';
          div.innerHTML = `
            <img class='thumbnail' src='${picFile.result}' title='${picFile.name}'/>
            <div class="img__close" id='img${i}' onclick='this.parentNode.remove()'>
              <i class="fas fa-times"></i>
            </div>            
            `;
          output.insertBefore(div, null);
        });
        //Read the image
        picReader.readAsDataURL(file);
      }
    } else {
      setNotifyMes('Your browser does not support File API')
      setNotifyType('warning')
      setNotifyTitle('Notice')
    }

    // //remove img
    // const imgs = document.getElementsByClassName('img__close')
    // if(imgs)
    // for (let i = 0; i < files.length; i++) {
    //   const imgCloses = document.getElementById(`img${i}`)
    //   console.log(imgCloses)
    //   closeBtns.length < files.length && imgCloses && setCloseBtns([...closeBtns, imgCloses])    
    // }
    // if(closeBtns.length === files.length){
    //   console.log(closeBtns)
    //   for( let i=0; i<closeBtns.length; i++){
    //   // Array.from(closeBtns).forEach((btn, i) =>{
    //     console.log(i)
    //     closeBtns[i].addEventListener('click', (i)=>{
    //       let fileArr = files;
    //       console.log(fileArr)
    //       fileArr.splice(
    //         fileArr.findIndex((item) => item.index === i)
    //         , 1
    //       )
    //       setFiles(fileArr)
    //     })
    //   }
    // }
  }, [files, error, imgsLink, isClicked, dispatch, product])

  return (
    <div className="newProduct">
      <Notification 
          title={notifyTitle}
          message={notifyMes}
          type={notifyType}
          duration={20000}
      />  
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label htmlFor ="file">
            Images
          </label>
          <input
            type="file"
            name='file'
            id="file"
            onChange={(e) => setFiles((prev)=>[...prev, ...e.target.files])}
            multiple
          />
          <output id='result' />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            id='title'
            type="text"
            placeholder="Iron Man"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            id='price'
            type="number"
            placeholder="1.000.000"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <textarea type="text" name='desc' id='desc' placeholder="description..." onChange={handleChange} rows='5'>
          </textarea>          
        </div>
        <div className="addProductItem">
          <label>Category</label>
          <select name="category" id='category' onChange={handleChange}>
            <option defaultValue value="Marvel">Marvel</option>
            <option value="DC-Comics">DC-Comics</option>
            <option value="Transformers">Transformers</option>
          </select>          
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" id='stock' onChange={handleChange}>
            <option defaultValue value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={handleCreate} className="addProductButton" disabled={isFetching}>
          Create
        </button>
      </form>
    </div>
  );
}
