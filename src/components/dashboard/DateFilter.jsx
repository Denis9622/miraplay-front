import { useState } from "react";
import styles from "./dateFilter.module.css";

const DateFilter = ({ onFilterChange }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilter = () => {
    if (startDate && endDate) {
      onFilterChange(startDate, endDate);
    }
  };

  return (
    <div className={styles.filterContainer}>
      <label>Start Date:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <label>End Date:</label>
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
