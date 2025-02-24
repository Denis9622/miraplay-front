import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./dashboardPage.module.css";
import Statistics from "../components/dashboard/Statistics.jsx";
import RecentCustomers from "../components/dashboard/RecentCustomers.jsx";
import IncomeExpenses from "../components/dashboard/IncomeExpenses.jsx";
import IncomeChart from "../components/dashboard/IncomeChart.jsx";
import DateFilter from "../components/dashboard/DateFilter.jsx";
import {
  fetchStatistics,
  fetchRecentCustomers,
  fetchIncomeExpenses,
} from "../redux/dashboard/dashboardOperations";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { statistics, recentCustomers, incomeExpenses, loading, error } =
    useSelector((state) => state.dashboard);

  const [filteredStartDate, setFilteredStartDate] = useState(null);

  useEffect(() => {
    dispatch(fetchStatistics());
    dispatch(fetchRecentCustomers());
  }, [dispatch]);

  const handleFilterChange = (startDate, endDate) => {
    setFilteredStartDate(startDate);
    dispatch(fetchIncomeExpenses({ startDate, endDate }));
  };

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <Statistics data={statistics} />
      <DateFilter onFilterChange={handleFilterChange} />
      <IncomeChart startDate={filteredStartDate} data={incomeExpenses} />
      <div className={styles.grid}>
        <RecentCustomers data={recentCustomers} />
        <IncomeExpenses startDate={filteredStartDate} data={incomeExpenses} />
      </div>
    </div>
  );
};

export default DashboardPage;
