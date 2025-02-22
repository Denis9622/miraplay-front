import { useEffect, useState } from "react";
import styles from "./statistics.module.css";
import { mockStatistics } from "../../data/mockData.js";

const Statistics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Имитация API-запроса
    setTimeout(() => {
      setData(mockStatistics);
    }, 1000);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className={styles.statistics}>
      <div className={styles.card}>
        <h3>All Products</h3>
        <p>{data.products}</p>
      </div>
      <div className={styles.card}>
        <h3>All Suppliers</h3>
        <p>{data.suppliers}</p>
      </div>
      <div className={styles.card}>
        <h3>All Customers</h3>
        <p>{data.customers}</p>
      </div>
    </div>
  );
};

export default Statistics;
