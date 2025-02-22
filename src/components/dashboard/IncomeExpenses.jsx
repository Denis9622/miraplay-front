import styles from "./incomeExpenses.module.css";

const IncomeExpenses = () => {
  const transactions = [
    { name: "Product Sale", email: "customer1@example.com", amount: "+$500" },
    { name: "Product Refund", email: "customer2@example.com", amount: "-$100" },
    { name: "Product Sale", email: "customer3@example.com", amount: "+$300" },
  ];

  return (
    <div className={styles.incomeExpenses}>
      <h3>Income / Expenses</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr
              key={index}
              className={
                transaction.amount.startsWith("-")
                  ? styles.expense
                  : styles.income
              }
            >
              <td>{transaction.name}</td>
              <td>{transaction.email}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncomeExpenses;
