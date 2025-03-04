import { createSlice } from "@reduxjs/toolkit";
import {
  fetchStatistics,
  fetchRecentCustomers,
  fetchIncomeExpenses,
} from "./dashboardOperations";

const initialState = {
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
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Recent Customers
      .addCase(fetchRecentCustomers.fulfilled, (state, action) => {
        state.recentCustomers = action.payload;
      })

      // Income & Expenses
      .addCase(fetchIncomeExpenses.fulfilled, (state, action) => {
        state.incomeExpenses = action.payload;
      });
  },
});

export default dashboardSlice.reducer;

