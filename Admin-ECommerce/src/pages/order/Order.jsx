import {
  CalendarToday,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@material-ui/icons";
import MapIcon from '@mui/icons-material/Map';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NumbersIcon from '@mui/icons-material/Numbers';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import { Link, useLocation } from "react-router-dom";
import "./order.css";
import { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";
import Notification from "../../components/notification/Notification";
import { getProducts } from "../../redux/apiCalls";

export default function Order() {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const [order, setOrder] = useState()
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);  
  const [prodsInOrder, setProdsInOrder] = useState([])
  const [notifyMes, setNotifyMes] = useState('')
  const [notifyType, setNotifyType] = useState('info')
  const [notifyTitle, setNotifyTitle] = useState('')

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const res = await userRequest().put("/orders/"+orderId, order);
      setOrder(res.data);
      setNotifyMes('Update order successful')
      setNotifyType('success')
      setNotifyTitle('Success')   
    } catch(err) {
      console.dir(err);
      setNotifyMes('Update order failed!!!')
      setNotifyType('error')
      setNotifyTitle('Error')    
    }
  }

  const columns = [
    { field: "_id", headerName: "ID", width: 130 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" 
              src={
                params.row.img[0]
              } alt={params.row.title}
            />
            {params.row.title+'  '}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      renderCell: (params) =>{
        return(
          <div>{params.row.price+' '}</div>
        )
      },
      width: 130,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 130,
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/product/" + params.row._id}>
              <button className="productListEdit">View</button>
            </Link>
            {/* <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            /> */}
          </>
        );
      },
    },
  ];  

  useEffect(()=>{
    getProducts(dispatch);

    const getOrder = async () => {
      try {
        const res = await userRequest().get("/orders/"+orderId);
        setOrder(res.data);
      } catch(err) {
        console.dir(err);
      }
    };
    !order && getOrder();

    const getProductsInOrder = ()=>{
      let arr = []
      for( let pro of order.products){
        for(let item of products) {  
          if(pro.productId !== item._id) continue;
          let obj = {...item}
          obj.quantity = pro.quantity
          arr.push(obj)
          break;
        }
      }

      arr.length === order.products.length && setProdsInOrder(arr)
    }
    if(order?.products && products && prodsInOrder.length===0) getProductsInOrder()
  }, [orderId, dispatch, order, products, prodsInOrder])

  return (
    <div className="order">
      <Notification 
          title={notifyTitle}
          message={notifyMes}
          type={notifyType}
          duration={10000}
      />     
      <div className="orderTitleContainer">
        <h1 className="orderTitle">View Order</h1>
      </div>
      <div className="orderContainer">
        <div className="orderShow">
          {/* {order?.address?.name && (
          <div className="orderShowTop">
            <div className="orderShowTopTitle">
              <span className="orderShowOrdername">User Name: {order?.address?.name}</span>
            </div>
          </div>
          )} */}
          <div className="orderShowBottom">
            <span className="orderShowTitle">Account Details</span>
            <div className="orderShowInfo">
              <PermIdentity className="orderShowIcon" />
              <span className="orderShowInfoTitle">{order?.userId}</span>
            </div>
            {order?.address?.name && (
            <div className="orderShowInfo">
              <PermIdentity className="orderShowIcon" />
              <span className="orderShowInfoTitle">{order?.address?.name}</span>
            </div>
            )}

            <span className="orderShowTitle">Order Details</span>
            <div className="orderShowInfo">
              <NumbersIcon className="orderShowIcon" />
              <span className="orderShowInfoTitle">{order?._id}</span>
            </div>
            <div className="orderShowInfo">
              <MonetizationOnRoundedIcon className="orderShowIcon" />
              <span className="orderShowInfoTitle">{order?.amount}</span>
            </div>
            <div className="orderShowInfo">
              <CalendarToday className="orderShowIcon" />
              <span className="orderShowInfoTitle">{order?.updatedAt}</span>
            </div>   

            <span className="orderShowTitle">Delivery Details</span>
            <div className="orderShowInfo">
              {(order?.address?.city || order?.address?.country || order?.address?.state) 
              ? (
                <>
                <MapIcon className="orderShowIcon" />
                <span className="orderShowInfoTitle">{
                  order?.address?.country+' '+order?.address?.city
                }</span>  
                </>              
              ) : (
                <>
                <PhoneAndroid className="orderShowIcon" />
                <span className="orderShowInfoTitle">{
                  order?.address?.phone
                }</span> 
                </>
              )}
            </div>
            <div className="orderShowInfo">
              <MailOutline className="orderShowIcon" />
              <span className="orderShowInfoTitle">{
                order?.address?.postal_code || order?.address?.email
              }</span>
            </div>
            <div className="orderShowInfo">
              <LocationOnIcon className="orderShowIcon" />
              <span className="orderShowInfoTitle">{
                order?.address?.address || (order?.address?.line1 || order?.address?.line2)
              }</span>
            </div>

            <div className="orderUpdateItem">
              <label>Status</label>
              <select name="inStock" id="stock" 
                className={"widgetLgButton "+order?.status} 
                defaultValue={order?.status}
                onChange={(e)=>{
                  setOrder((prev)=>{
                    let obj = {...prev}
                    obj.status = e.target.value
                    return {...obj}
                  })
                }}
              >
                <option value="pending" className={"widgetLgButton pending"}>
                  Pending
                </option>
                <option value="approved" className={"widgetLgButton approved"}>
                  Approved
                </option>
                <option value="declined" className={"widgetLgButton declined"}>
                  Declined
                </option>
              </select>    
            </div>
            <div className="orderUpdateItem">
              <button className="updateButton" onClick={(e)=>{handleUpdate(e)}}>Update</button>
            </div>            
          </div>
        </div>

        <div className="orderUpdate">
          <span className="orderUpdateTitle">Products Info</span>
          <form className="orderUpdateForm">
            <div className="orderUpdateLeft">
              {/* <div className="orderUpdateItem">
                <label>Order id</label>
                <input
                  type="text" id='orderId' name='orderId' 
                  defaultValue={order?._id}
                  className="orderUpdateInput"
                  readOnly
                />
              </div> */}
              <div className="orderUpdateItem">
                <label>Products list</label>

              </div>
              {prodsInOrder && (
              <DataGrid
                rows={prodsInOrder}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row) => row._id}
                rowsPerPageOptions={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100]}
                checkboxSelection
              />
              )}                
              {/* <div className="orderUpdateItem">
                <label>Amount</label>
                <input
                  type="text" id='amount' name='amount' 
                  defaultValue={order?.amount}
                  className="orderUpdateInput"
                  readOnly
                />
              </div> */}
              {/* <div className="orderUpdateItem">
                <label>Status</label>
                <select name="inStock" id="stock" 
                  className={"widgetLgButton "+order?.status} 
                  defaultValue={order?.status}
                  onChange={(e)=>{
                    setOrder((prev)=>{
                      let obj = {...prev}
                      obj.status = e.target.value
                      return {...obj}
                    })
                  }}
                >
                  <option value="pending" className={"widgetLgButton pending"}>
                    Pending
                  </option>
                  <option value="approved" className={"widgetLgButton approved"}>
                    Approved
                  </option>
                  <option value="declined" className={"widgetLgButton declined"}>
                    Declined
                  </option>
                </select>    
              </div>
              <div className="orderUpdateItem">
                <button className="updateButton" onClick={(e)=>{handleUpdate(e)}}>Update</button>
              </div> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
