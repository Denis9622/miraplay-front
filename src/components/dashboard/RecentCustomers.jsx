import styles from "./recentCustomers.module.css";

const RecentCustomers = () => {
  const customers = [
    { name: "John Doe", email: "john@example.com", amount: "$250" },
    { name: "Jane Smith", email: "jane@example.com", amount: "$180" },
    { name: "Mike Johnson", email: "mike@example.com", amount: "$300" },
  ];

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
