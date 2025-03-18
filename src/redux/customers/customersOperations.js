import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axiosInstance"; // Используем настроенный api

// 📌 GET: Получить всех клиентов
export const fetchCustomers = createAsyncThunk(
  "customers/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/customers"); // Используем api вместо axios
      return response.data;
    } catch (error) {
      console.error(
        "Fetch customers error:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || "Ошибка загрузки клиентов"
      );
    }
  }
);

// 📌 POST: Добавить клиента
export const addCustomer = createAsyncThunk(
  "customers/add",
  async (customerData, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/customers", customerData); // Используем api
      dispatch(fetchCustomers()); // Обновляем список после добавления
      return response.data;
    } catch (error) {
      console.error(
        "Add customer error:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || "Ошибка добавления клиента"
      );
    }
  }
);

// 📌 PUT: Обновить клиента
export const updateCustomer = createAsyncThunk(
  "customers/update",
  async ({ id, customerData }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`/customers/${id}`, customerData); // Используем api
      dispatch(fetchCustomers()); // Обновляем список после обновления
      return response.data;
    } catch (error) {
      console.error(
        "Update customer error:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || "Ошибка обновления клиента"
      );
    }
  }
);

// 📌 DELETE: Удалить клиента
export const deleteCustomer = createAsyncThunk(
  "customers/delete",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await api.delete(`/customers/${id}`); // Используем api
      dispatch(fetchCustomers()); // Обновляем список после удаления
      return id;
    } catch (error) {
      console.error(
        "Delete customer error:",
        error.response?.data || error.message
      );
      return rejectWithValue(error.response?.data || "Ошибка удаления клиента");
    }
  }
);
