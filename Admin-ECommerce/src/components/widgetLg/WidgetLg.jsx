import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./widgetLg.css";
import TimeAgo from 'javascript-time-ago'
import vi from 'javascript-time-ago/locale/vi.json' // Vietnamese.
import en from 'javascript-time-ago/locale/en.json' // English.

TimeAgo.addLocale(vi)
TimeAgo.addLocale(en)
TimeAgo.setDefaultLocale('vi')

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);
  const timeAgo = new TimeAgo()

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  }, []);

  const Button = ({ status }) => {
    return <button className={"widgetLgButton " + status}>{status}</button>;
  };

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <thead>
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        </thead>
        {orders.map((order) => (
          <tbody key={order._id}>
          <tr className="widgetLgTr" >
            <td className="widgetLgUser">
              <span className="widgetLgName">{order.userId}</span>
            </td>
            <td className="widgetLgDate">{
              timeAgo.format(new Date(order.createdAt), 'round')
            }</td>
            <td className="widgetLgAmount">{order.amount} &#8363;</td>
            <td className="widgetLgStatus">
              <Button status={order.status} />
            </td>
          </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
