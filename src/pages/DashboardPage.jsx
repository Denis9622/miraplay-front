import { useState } from "react";
import styles from "./dashboardPage.module.css";
import Statistics from "../components/dashboard/Statistics.jsx";
import RecentCustomers from "../components/dashboard/RecentCustomers.jsx";
import IncomeExpenses from "../components/dashboard/IncomeExpenses.jsx";
import IncomeChart from "../components/dashboard/IncomeChart.jsx";
import DateFilter from "../components/dashboard/DateFilter.jsx";

const DashboardPage = () => {
  const [filteredStartDate, setFilteredStartDate] = useState(null);
  const [filteredEndDate, setFilteredEndDate] = useState(null);

  const handleFilterChange = (startDate, endDate) => {
    setFilteredStartDate(startDate);
    setFilteredEndDate(endDate);
  };

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <Statistics />
      <DateFilter onFilterChange={handleFilterChange} />
      <IncomeChart startDate={filteredStartDate} endDate={filteredEndDate} />
      <div className={styles.grid}>
        <RecentCustomers />
        <IncomeExpenses
          startDate={filteredStartDate}
          endDate={filteredEndDate}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
