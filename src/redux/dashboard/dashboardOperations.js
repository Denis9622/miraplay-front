import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";

// 📌 **Получение статистики**
export const fetchStatistics = createAsyncThunk(
  "dashboard/fetchStatistics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/dashboard/statistics");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Ошибка загрузки статистики"
      );
    }
  }
);

// 📌 **Получение списка последних клиентов**
export const fetchRecentCustomers = createAsyncThunk(
  "dashboard/fetchRecentCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/dashboard/recent-customers");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Ошибка загрузки клиентов");
    }
  }
);

// 📌 **Получение доходов и расходов**
export const fetchIncomeExpenses = createAsyncThunk(
  "dashboard/fetchIncomeExpenses",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await axios.get("/dashboard/income-expenses", {
        params: { startDate, endDate },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Ошибка загрузки данных");
    }
  }
);
