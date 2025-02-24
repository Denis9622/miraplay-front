import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://admindashboard-back-qth7.onrender.com/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

// 📌 GET: Получить всех клиентов
export const fetchCustomers = createAsyncThunk(
  "customers/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/customers", getAuthHeader());
      return response.data;
    } catch (error) {
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
      const response = await axios.post(
        "/customers",
        customerData,
        getAuthHeader()
      );
      dispatch(fetchCustomers()); // 🔄 Обновляем список после добавления
      return response.data;
    } catch (error) {
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
      const response = await axios.put(
        `/customers/${id}`,
        customerData,
        getAuthHeader()
      );
      dispatch(fetchCustomers()); // 🔄 Обновляем список после обновления
      return response.data;
    } catch (error) {
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
      await axios.delete(`/customers/${id}`, getAuthHeader());
      dispatch(fetchCustomers()); // 🔄 Обновляем список после удаления
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка удаления клиента");
    }
  }
);
