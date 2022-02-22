import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
// import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import Carousel from 'react-material-ui-carousel'
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import Notification from "../../components/notification/Notification";
import EditIcon from '@mui/icons-material/Edit';

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[3];
  const [pStats, setPStats] = useState([]);
  const [files, setFiles] = useState([]);
  const [imgsLink, setImgsLink] = useState([]);
  const [imgsQueued, setImgsQueued] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [filesHasValue, setFilesHasValue] = useState(false);
  const [numValueFile, setNumValueFile] = useState(0);
  const [numUpdateLink, setNumUpdateLink] = useState(0);
  const dispatch = useDispatch();
  const [notifyMes, setNotifyMes] = useState('')
  const [notifyType, setNotifyType] = useState('info')
  const [notifyTitle, setNotifyTitle] = useState('')
  const {isFetching, error} = useSelector((state) => state.user) 

  const product = useSelector((state) =>
      state.product.products.find((product) => product._id === productId)
    );

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const handleUpdate = (e) => {
    e.preventDefault();

    let title = document.getElementById('title').value;
    let price = document.getElementById('price').value;
    let desc = document.getElementById('desc').value;
    // let category = document.getElementById('category').value;
    // let stock = document.getElementById('stock').value;

    if(title.trim() === '' 
      || desc.trim() === '' 
      || price.trim() === '' 
      || price.trim()*1 < 10000 
      || price*1 % 1000 > 0
    ){
      setNotifyMes('Please insert all fields correctly!!!')
      setNotifyType('error')
      setNotifyTitle('Error')       
    }
    else {   
      //check files exists at least one real value
      let isFilesHasValue = false
      let numFile = 0;
      for(let file of files){
        if (file !== null && file !== undefined) {
          isFilesHasValue = true
        }
      }

      // upload all selected images to firebase
      if(files.length > 0 && isFilesHasValue){
        setNotifyMes('Press f12 and open console tag to view all progress')
        setNotifyType('info')
        setNotifyTitle('Notice')  

        for( let i=0; i< files.length; i++ ) {
          // only pictures
          let file = files[i];
          if (!file || !file.type.match('image'))
            continue;

          numFile++

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
                  let links = prev
                  links[i] = downloadURL
                  return [...links]
                })
                setNumUpdateLink((prev)=>{
                  return prev+1
                })
                console.log('File available at', downloadURL);
              });
            }
          );
        }
      }

      setIsClicked(true) 
      setFilesHasValue(isFilesHasValue);
      setNumValueFile(numFile)
    }
  };

  const removeImg = (e, index)=>{
    setFiles((prev) => { 
      let elements = prev
      elements.splice(index, 1)
      return [...elements]
    })
    setImgsLink((prev) =>{
      let elements = prev
      elements.splice(index, 1)
      return [...elements]
    })
    setImgsQueued((prev) =>{
      let elements = prev
      elements.splice(index, 1)
      return [...elements]
    })
    e.target.parentNode.parentNode.remove()
  }

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a,b)=>{
            return a._id - b._id
        })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Total: item.total },
          ])
        );
      } catch (err) {
        console.dir(err);
      }
    };
    files.length === 0 && getStats();

    // set default elements for arrays
    if(product && files.length === 0){
      setFiles(Array.apply(null, Array(product?.img.length)))
      setImgsLink([...product?.img])
      setImgsQueued([...product?.img])
    }

    // change showed imgs in right side form by uploaded files
    if (window.File && window.FileList && window.FileReader && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        //Only pics
        if (!file || !file.type.match('image'))
          continue;
        
        let picReader = new FileReader();
        picReader.addEventListener("load", function(event) {
          let picFile = event.target;

          picFile.result && setImgsQueued(
            (prev) => {
              let imgs = prev;
              imgs[i] = picFile.result
              return [ ...imgs ]; 
            }
          )          
        })
        //Read the image
        picReader.readAsDataURL(file);
      }
    }

    // error notification
    if(error) {
      setNotifyMes('Error occurred while update product')
      setNotifyType('error')
      setNotifyTitle('Error')   
    }   
    
    //update product
    if(
      (isClicked && filesHasValue && numUpdateLink === numValueFile && numUpdateLink > 0) // has needed upload images
      || (isClicked && !filesHasValue && numUpdateLink === 0) // has not needed upload images
    ){
      
      const title = document.getElementById('title').value;
      const price = document.getElementById('price').value;
      const category = document.getElementById('category').value;
      const desc = document.getElementById('desc').value; 
      const inStock = document.getElementById('stock').value; 
  
      const obj = imgsLink.length > 0
        ? { title, img: imgsLink, price: price*1, category, inStock, desc }
        : { title, price: price*1, category, inStock, desc };
      updateProduct(productId, obj, dispatch);  

      setNotifyMes('Update product successful')
      setNotifyType('success')
      setNotifyTitle('Success') 

      setIsClicked(false)
      
      const timeout = window.setTimeout(()=>{
        window.location.reload(); 
        window.clearTimeout(timeout)
      }, 3000)
    }    
  }, [productId, MONTHS, dispatch, error, files, imgsLink, isClicked, product, filesHasValue, numValueFile, numUpdateLink]);

  return (
    <div className="product">
      <Notification 
          title={notifyTitle}
          message={notifyMes}
          type={notifyType}
          duration={20000}
      />      
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/admin/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Total" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img[0]} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">10</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock ? 'true' : 'false'}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <span className="productName">Edit Product</span>
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input type="text" id='title' name='title' 
              placeholder={product.title}
              defaultValue={product.title}
            />
            <label>Price</label>
            <input type="text" id='price' name='price' 
              placeholder={product.price}
              defaultValue={product.price}
            />
            <label>Category</label>
            <select name="category" id='category' 
              defaultValue={product.category}
            >
              <option value="Marvel">Marvel</option>
              <option value="DC-Comics">DC-Comics</option>
              <option value='Transformers'>Transformers</option>
            </select>             
            <label>Product Description</label>
            <textarea type="text" name='desc' id='desc' rows='5' defaultValue={product.desc}>
            </textarea>
            <label>In Stock</label>
            <select name="inStock" id="stock" defaultValue={product.inStock}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              
              <Carousel
                next={ (now, prev) => { } }
                prev={ (now, prev) => { } }
                autoPlay={true}
                fullHeightHover={false}
                interval={10000}
                animation='fade'
                duration={800}
                swipe={true}
                IndicatorIcon={
                  imgsQueued?.map((value, index)=>(
                    <div style={{position: 'relative'}}>
                    <label className='updateImg' htmlFor ={"file"+index}>
                      <div className='iconContainer'>
                        <div className='iconSearch'>
                          <EditIcon/>
                        </div>
                      </div>
                      <img 
                        src={value} 
                        width='100' 
                        height='100' 
                        alt='indicator'
                        style={
                            {objectFit: 'cover'}
                        }
                      />
                    </label>
                    <div className="img__close" id={index} onClick={(e)=>{removeImg(e, index)}} >
                      <i className="fas fa-times"></i>
                    </div>                     
                    <input type="file" name={"file"+index} 
                      onChange={(e) => setFiles(
                        (prev)=>{
                          let files = prev
                          files[index] = e.target.files[0]
                          return [ ...files ]
                        }
                      )}
                      id={"file"+index} style={{display: 'none'}} 
                    />                    
                    </div>
                  ))
                }
                indicatorIconButtonProps={{
                  style: {
                    padding: '0px 10px',    
                    opacity: '0.6',
                  }
                }}
                activeIndicatorIconButtonProps={{
                  style: {
                    opacity: '1.0',
                  }
                }} 
                indicatorContainerProps={{
                  style: {
                    marginTop: '20px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
                }}                       
                navButtonsProps={{
                  style: {
                    margin: 'auto',
                    backgroundColor: '#008080',
                    opacity: '0.5',
                    transition: 'all 0.5s ease',
                    '&:hover':{
                        opacity: '1.0',
                        transform: 'scale(1.1)',
                    },
                  }
                }}    
                NavButton={({onClick, className, style, next, prev}) => {
                    return (
                        <div id='carouselArrow' onClick={onClick} className={className} style={style}>
                            {next && <ArrowRightOutlined/>}
                            {prev && <ArrowLeftOutlined/>}
                        </div>
                    )
                }}                    
              >
                {imgsQueued?.map((value, index)=>(
                  <img key={index} src={value} alt="" className="productUploadImg" />
                ))}
              </Carousel> 

              <label className='uploadImgBtn' htmlFor ="file">
                <Publish />
              </label>
              <input type="file" multiple name='file' id="file" style={{display: 'none'}}
                onChange={(e) => setFiles(
                  (prev)=>{
                    return [ ...prev, ...e.target.files ]
                  }
                )}              
              />
            </div>
            <button className="productButton" onClick={handleUpdate} disabled={isFetching}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
