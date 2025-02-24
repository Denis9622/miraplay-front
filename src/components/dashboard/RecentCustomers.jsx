import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentCustomers } from "../../redux/dashboard/dashboardOperations";
import styles from "./recentCustomers.module.css";

const RecentCustomers = () => {
  const dispatch = useDispatch();
  const { recentCustomers, loading, error } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchRecentCustomers());
  }, [dispatch]);

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

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
          {recentCustomers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>${customer.spent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentCustomers;
