import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./widgetLg.css";
import TimeAgo from 'javascript-time-ago'
import vi from 'javascript-time-ago/locale/vi.json' // Vietnamese.
import en from 'javascript-time-ago/locale/en.json' // English.
import {Link} from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import Notification from "../../components/notification/Notification";

TimeAgo.addLocale(vi)
TimeAgo.addLocale(en)
TimeAgo.setDefaultLocale('vi')

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);
  const timeAgo = new TimeAgo()
  const [notifyMes, setNotifyMes] = useState('')
  const [notifyType, setNotifyType] = useState('info')
  const [notifyTitle, setNotifyTitle] = useState('')
  const [page, setPage] = useState(1);
  const rowPerPage = 8;
  const [totalPage, setTotalPage] = useState(1);

  const handleUpdate = async (e, i)=>{
    e.preventDefault()
    let obj = {...orders[i + (page-1) * rowPerPage]}
    obj.status = e.target.value
    
    try {
      const res = await userRequest().put("/orders/"+obj?._id, obj);
      setOrders((prev)=>{
        let orderArr = [...prev]
        orderArr[i] = {...res.data}
        return [...orderArr]
      });

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

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest().get("orders");

        let list = res.data.sort((a,b)=>{
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        })
        
        setOrders(list);
        setTotalPage(Math.ceil(res.data.length / rowPerPage))
      } catch(err) {
        console.dir(err);
      }
    };
    getOrders();
  }, []);

  // const Button = ({ status }) => {
  //   return <button className={"widgetLgButton " + status}>{status}</button>;
  // };

  return (
    <div className="widgetLg">
      <Notification 
        title={notifyTitle}
        message={notifyMes}
        type={notifyType}
        duration={10000}
      />  
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <thead>
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
          <th className='widgetLgTh'>Action</th>
        </tr>
        </thead>
        {orders.slice((page-1)*rowPerPage, page * rowPerPage).map((order, i) => (
          <tbody key={order?._id}>
          <tr className="widgetLgTr" >
            <td className="widgetLgUser">
              <span className="widgetLgName">{order?.userId}</span>
            </td>
            <td className="widgetLgDate">{
              timeAgo.format(new Date(order?.updatedAt), 'round')
            }</td>
            <td className="widgetLgAmount">{order?.amount} &#8363;</td>
            <td className="widgetLgStatus">
            <select name="inStock"
              className={"widgetLgButton "+order?.status} 
              defaultValue={order?.status}
              onChange={(e)=>{handleUpdate(e, i); e.target.className='widgetLgButton '+e.target.value;}}
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
            {/* <Button status={order?.status} />         */}
            </td>
            <td className='widgetLgAction'>
              <Link to={'/admin/order/'+order?._id} className='link'>View</Link>
            </td>
          </tr>
          </tbody>
        ))}
      </table>
      <div style={{
        marginTop: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',        
      }}>
        <Pagination
          page={page}
          count={totalPage}
          onChange={(e, value) => setPage(value)}
        />
      </div>      
    </div>
  );
}
