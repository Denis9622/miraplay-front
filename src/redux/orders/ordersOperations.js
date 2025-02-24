import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://admindashboard-back-qth7.onrender.com/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};


// 📌 GET: Получить все заказы
export const fetchOrders = createAsyncThunk(
  "orders/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/orders", {
        headers: getAuthHeader().headers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка загрузки заказов");
    }
  }
);

// 📌 POST: Добавить заказ
export const addOrder = createAsyncThunk(
  "orders/add",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/orders", orderData, {
        headers: getAuthHeader().headers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Ошибка добавления заказа"
      );
    }
  }
);

// 📌 PUT: Обновить заказ
export const updateOrder = createAsyncThunk(
  "orders/update",
  async ({ id, orderData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/orders/${id}`, orderData, {
        headers: getAuthHeader().headers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Ошибка обновления заказа"
      );
    }
  }
);

// 📌 DELETE: Удалить заказ
export const deleteOrder = createAsyncThunk(
  "orders/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/orders/${id}`, { headers: getAuthHeader().headers });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка удаления заказа");
    }
  }
);
