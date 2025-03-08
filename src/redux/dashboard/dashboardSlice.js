import { createSlice } from "@reduxjs/toolkit";
import {
  fetchStatistics,
  fetchRecentCustomers,
  fetchIncomeExpenses,
  fetchCustomersWithSpent, // Добавляем import
} from "./dashboardOperations";

const initialState = {
  transactions: [],
  statistics: null,
  recentCustomers: [],
  incomeExpenses: [],
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Fetching statistics - pending");
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload;
        console.log("Fetching statistics - fulfilled", action.payload);
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("Fetching statistics - rejected", action.payload);
      })

      // Recent Customers
      .addCase(fetchRecentCustomers.fulfilled, (state, action) => {
        state.recentCustomers = action.payload;
        console.log("Fetching recent customers - fulfilled", action.payload);
      })

      // Income & Expenses
     .addCase(fetchIncomeExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncomeExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions || []; // Убираем лишний .transactions
      })
      .addCase(fetchIncomeExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch Customers with Spent
      .addCase(fetchCustomersWithSpent.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Fetching customers with spent - pending");
      })
      .addCase(fetchCustomersWithSpent.fulfilled, (state, action) => {
        state.loading = false;
        state.recentCustomers = action.payload;
        console.log(
          "Fetching customers with spent - fulfilled",
          action.payload
        );
      })
      .addCase(fetchCustomersWithSpent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("Fetching customers with spent - rejected", action.payload);
      });
  },
});

export default dashboardSlice.reducer;
