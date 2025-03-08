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
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/dashboard/income-expenses");
      console.log("Ответ от API:", response.data); // Логируем ответ
      return response.data;
    } catch (error) {
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
      console.log("Fetching customers with spent..."); // Лог перед запросом
      const response = await axios.get("/dashboard/customers-with-spent");
      console.log("Customers with Spent:", response.data); // Лог после получения данных
      return response.data;
    } catch (error) {
      console.log("Fetch customers with spent error:", error); // Лог ошибок
      return rejectWithValue(
        error.response?.data || "Ошибка загрузки клиентов с затратами"
      );
    }
  }
);
