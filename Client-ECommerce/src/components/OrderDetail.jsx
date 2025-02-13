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
import "./order-detail.css";
import { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector } from "react-redux";
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import { userRequest, publicRequest } from "../requestMethods";

export default function Order() {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const [order, setOrder] = useState()
  const user = useSelector((state) => state.user?.currentUser);  
  const [products, setProducts] = useState([])

  const columns = [
    window.innerWidth > 700 && { field: "_id", headerName: "ID", width: 260 },
    {
      field: "product",
      headerName: "Product",
      width: window.innerWidth > 700 ? 210 : 190,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" 
              src={
                params.row.img[0]
              } alt={params.row.title}
            />
            <p>{params.row.title}</p>
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: window.innerWidth > 700 ? "Price" : 'đ',
      renderCell: (params) =>{
        return(
          <div style={{textAlign: 'center', width: '100%'}}>
            <p>{params.row.price+' '}</p>
            {/* &#8363; */}
          </div>
        )
      },
      width: window.innerWidth > 700 ? 150 : 80,
    },
    {
      field: "quantity",
      headerName: window.innerWidth > 700 ? "Quantity" : 'N',
      renderCell: (params) =>{
        return(
          <div style={{textAlign: 'center', width: '100%'}}>
            <p>{params.row.quantity}</p>
          </div>
        )
      },
      width: window.innerWidth > 700 ? 160 : 50,
    },
    {
      field: "action",
      headerName: "Action",
      width: window.innerWidth > 700 ? 150 : 60,
      renderCell: (params) => {
        return (
          <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">View</button>
            </Link>
          </div>
        );
      },
    },
  ]; 
  
  useEffect(()=>{
    const getOrder = async () => {
      try {
        const res = await userRequest().get("/orders/"+orderId+'/'+user?._id);
        setOrder(res.data);
      } catch(err) {
        console.dir(err);
      }
    };
    !order && getOrder();

    const getProducts = async ()=>{
      let prodsTemp = [];
      const orderProds = order?.products
      for( let i=0; i<orderProds?.length; i++){
        try {
          const res = await publicRequest.get("/products/find/"+orderProds[i].productId);
          prodsTemp.push({...res.data, quantity: order.products[i].quantity})
        } catch(err) {
          console.dir(err);
        }
      }
      
      prodsTemp.length === orderProds?.length && setProducts(prodsTemp)
    }
    products.length === 0 && getProducts()
  }, [orderId, order, user, products])

  return (
    <div className="order">
      <div className="orderTitleContainer">
        <h1 className="orderTitle">View Order</h1>
      </div>
      <div className="orderContainer">
        <div className="orderShow">
          <div className="orderShowBottom">
            <span className="orderShowTitle">Status</span>

            <div className="orderShowInfo">
              <Inventory2RoundedIcon className='orderShowIcon'  />
              <button className={"widgetLgButton " + order?.status}>{
                order?.status
              }</button> 
            </div> 
            <span className="orderShowTitle">Buyer Details</span>

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
              <PermIdentity className="orderShowIcon" />
              <span className="orderShowInfoTitle">{order?.address?.name}</span>
            </div>
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
              {products && (
              <DataGrid
                rows={products}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row) => row._id}
                rowsPerPageOptions={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100]}
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
