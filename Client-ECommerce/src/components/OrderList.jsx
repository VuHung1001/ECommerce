import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";
import "./order-list.css";
import TimeAgo from 'javascript-time-ago'
import vi from 'javascript-time-ago/locale/vi.json' // Vietnamese.
import en from 'javascript-time-ago/locale/en.json' // English.
import {Link} from 'react-router-dom'
import Pagination from '@mui/material/Pagination';

TimeAgo.addLocale(vi)
TimeAgo.addLocale(en)
TimeAgo.setDefaultLocale('vi')

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user?.currentUser);
  const timeAgo = new TimeAgo()
  const [page, setPage] = useState(1);
  const rowPerPage =  6;
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders/find/"+user._id);

        let list = res.data.sort((a,b)=>{
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })
        
        setOrders(list);
        setTotalPage(Math.ceil(res.data.length / rowPerPage))
      } catch(err) {
        console.dir(err);
      }
    };
    user && getOrders();
  }, [user]);

  const Button = ({ status }) => {
    return <button className={"widgetLgButton " + status}>{status}</button>;
  };

  return (
    <div className="widgetLg">
    {orders?.length > 0 ? (
      <>
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <thead>
        <tr className="widgetLgTr">
          {/* <th className="widgetLgTh">ID</th> */}
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
          <th className='widgetLgTh'>Action</th>
        </tr>
        </thead>
        <tbody>
        {orders.slice((page-1)*rowPerPage, page * rowPerPage).map((order, i) => (
          <tr className="widgetLgTr" key={order?._id}>
            {/* <td className="widgetLgUser">
              <span className="widgetLgName">{order?._id}</span>
            </td> */}
            <td className="widgetLgDate">{
              timeAgo.format(new Date(order?.updatedAt), 'round')
            }</td>
            <td className="widgetLgAmount">{order?.amount} &#8363;</td>
            <td className="widgetLgStatus">
            <Button status={order?.status} />        
            </td>
            <td className='widgetLgAction'>
              <Link to={'/account/order/'+order?._id} className='link'>View</Link>
            </td>
          </tr>
        ))}
        </tbody>
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
      </>
    ) : (
      <h3>You have never purchased from us</h3>
    )}
    </div>
  );
}
