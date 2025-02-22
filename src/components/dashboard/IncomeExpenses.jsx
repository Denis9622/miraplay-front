import { useEffect, useState } from "react";
import styles from "./incomeExpenses.module.css";
import { mockTransactions } from "../../data/mockData.js";

const IncomeExpenses = ({ startDate, endDate }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      let filteredData = mockTransactions;

      // Фильтрация по дате (если выбраны даты)
      if (startDate && endDate) {
        filteredData = filteredData.filter((t, index) => {
          const transactionDate = new Date();
          transactionDate.setDate(transactionDate.getDate() - index);
          return (
            transactionDate >= new Date(startDate) &&
            transactionDate <= new Date(endDate)
          );
        });
      }

      setTransactions(filteredData);
    }, 1000);
  }, [startDate, endDate]);

  if (!transactions.length) return <p>Loading...</p>;

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
