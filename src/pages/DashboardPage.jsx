import styles from "./dashboardPage.module.css";
import Statistics from "../components/dashboard/Statistics.jsx";
import RecentCustomers from "../components/dashboard/RecentCustomers.jsx";
import IncomeExpenses from "../components/dashboard/IncomeExpenses.jsx";


const DashboardPage = () => {
  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <Statistics />
      <div className={styles.grid}>
        <RecentCustomers />
        <IncomeExpenses />
      </div>
    </div>
  );
};

export default DashboardPage;
