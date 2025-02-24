import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIncomeExpenses } from "../../redux/dashboard/dashboardOperations";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./incomeChart.module.css";

const IncomeChart = ({ startDate }) => {
  const dispatch = useDispatch();
  const { incomeExpenses, loading, error } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    if (startDate) {
      dispatch(fetchIncomeExpenses({ startDate }));
    }
  }, [dispatch, startDate]);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.chartContainer}>
      <h3>Income & Expenses Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={incomeExpenses}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="income" stroke="#2a9d8f" />
          <Line type="monotone" dataKey="expenses" stroke="#e63946" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeChart;
