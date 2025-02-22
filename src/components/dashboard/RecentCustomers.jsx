import { useEffect, useState } from "react";
import styles from "./recentCustomers.module.css";
import { mockCustomers } from "../../data/mockData.js";

const RecentCustomers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setCustomers(mockCustomers);
    }, 1000);
  }, []);

  if (!customers.length) return <p>Loading...</p>;

  return (
    <div className={styles.recentCustomers}>
      <h3>Recent Customers</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Spent</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentCustomers;
