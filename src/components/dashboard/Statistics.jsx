import styles from "./statistics.module.css";

const Statistics = () => {
  const data = {
    products: 120,
    suppliers: 15,
    customers: 500,
  };

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
