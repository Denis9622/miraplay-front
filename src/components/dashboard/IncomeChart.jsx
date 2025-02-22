import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { mockTransactions } from "../../data/mockData.js";
import styles from "./incomeChart.module.css";

const IncomeChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      // Преобразуем данные для графика
      const transformedData = mockTransactions.map((t, index) => ({
        name: `Day ${index + 1}`,
        amount: parseInt(
          t.amount.replace("$", "").replace("+", "").replace("-", ""),
          10
        ),
        type: t.amount.startsWith("-") ? "expense" : "income",
      }));
      setData(transformedData);
    }, 1000);
  }, []);

  if (!data.length) return <p>Loading chart...</p>;

  return (
    <div className={styles.chartContainer}>
      <h3>Income & Expenses Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#2a9d8f" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeChart;
