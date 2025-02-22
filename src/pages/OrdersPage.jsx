import { useState, useEffect } from "react";
import styles from "./ordersPage.module.css";
import { mockOrders } from "../data/mockData.js";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setOrders(mockOrders);
    }, 1000);
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.customer.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.ordersPage}>
      <h1>Orders</h1>
      <input
        type="text"
        placeholder="Filter by customer name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className={styles.filterInput}
      />
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Address</th>
            <th>Products</th>
            <th>Order Date</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.customer}</td>
                <td>{order.address}</td>
                <td>{order.products}</td>
                <td>{order.orderDate}</td>
                <td>{order.price}</td>
                <td>{order.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className={styles.noOrders}>
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
