import { useState } from "react";
import styles from "./dateFilter.module.css";

const DateFilter = ({ onFilterChange }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilter = () => {
    onFilterChange(startDate, endDate);
  };

  return (
    <div className={styles.filterContainer}>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button onClick={handleFilter}>Apply Filter</button>
    </div>
  );
};

export default DateFilter;
