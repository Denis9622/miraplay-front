import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIncomeExpenses } from "../../redux/dashboard/dashboardOperations";
import styles from "./incomeExpenses.module.css";

const IncomeExpenses = ({ startDate }) => {
  const dispatch = useDispatch();
  const { incomeExpenses, loading, error } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    if (startDate) {
      dispatch(fetchIncomeExpenses({ startDate }));
    }
  }, [dispatch, startDate]);

  if (loading) return <p>Loading income & expenses...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.incomeExpenses}>
      <h3>Income / Expenses</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Income</th>
            <th>Expenses</th>
          </tr>
        </thead>
        <tbody>
          {incomeExpenses.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td className={styles.income}>${entry.income}</td>
              <td className={styles.expense}>${entry.expenses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncomeExpenses;
