import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axiosInstance"; // Используем api вместо axios

// 📌 GET: Получить все заказы
export const fetchOrders = createAsyncThunk(
  "orders/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/orders"); // Используем api
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
      const response = await api.post("/orders", orderData); // api вместо axios
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
      const response = await api.put(`/orders/${id}`, orderData); // api вместо axios
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
      await api.delete(`/orders/${id}`); // api вместо axios
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка удаления заказа");
    }
  }
);
