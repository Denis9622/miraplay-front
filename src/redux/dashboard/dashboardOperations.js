import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axiosInstance"; // Используем настроенный api

// 📌 **Получение статистики**
export const fetchStatistics = createAsyncThunk(
  "dashboard/fetchStatistics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/dashboard/statistics"); // Используем api
      return response.data;
    } catch (error) {
      console.error(
        "Ошибка загрузки статистики:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || "Ошибка загрузки статистики"
      );
    }
  }
);

// 📌 **Получение списка последних клиентов**
export const fetchRecentCustomers = createAsyncThunk(
  "dashboard/fetchRecentCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/dashboard/recent-customers"); // Используем api
      return response.data;
    } catch (error) {
      console.error(
        "Ошибка загрузки клиентов:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || "Ошибка загрузки клиентов"
      );
    }
  }
);

// 📌 **Получение доходов и расходов**
export const fetchIncomeExpenses = createAsyncThunk(
  "dashboard/fetchIncomeExpenses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/dashboard/income-expenses"); // Используем api
      return response.data;
    } catch (error) {
      console.error(
        "Ошибка загрузки транзакций:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || "Ошибка загрузки транзакций"
      );
    }
  }
);

// 📌 **Получение списка клиентов с затратами**
export const fetchCustomersWithSpent = createAsyncThunk(
  "dashboard/fetchCustomersWithSpent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/dashboard/customers-with-spent"); // Используем api
      return response.data;
    } catch (error) {
      console.error(
        "Ошибка загрузки клиентов с затратами:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || "Ошибка загрузки клиентов с затратами"
      );
    }
  }
);
