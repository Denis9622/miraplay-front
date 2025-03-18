import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axiosInstance"; // Используем настроенный api

// 📌 GET: Получить все товары
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/products"); // Используем api
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        console.warn("Требуется refreshToken, пробуем обновить...");
        return rejectWithValue("Refresh token required");
      }
      console.error(
        "Ошибка загрузки товаров:",
        error.response?.data || error.message
      );
      return rejectWithValue(error.response?.data || "Ошибка загрузки товаров");
    }
  }
);

// 📌 POST: Добавить товар
export const addProduct = createAsyncThunk(
  "products/add",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await api.post("/products", productData); // Используем api
      return response.data;
    } catch (error) {
      console.error(
        "Ошибка добавления товара:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || "Ошибка добавления товара"
      );
    }
  }
);

// 📌 PUT: Обновить товар
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/products/${id}`, productData); // Используем api
      return response.data;
    } catch (error) {
      console.error(
        "Ошибка обновления товара:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || "Ошибка обновления товара"
      );
    }
  }
);

// 📌 DELETE: Удалить товар
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/products/${id}`); // Используем api
      return id; // Возвращаем ID удалённого товара
    } catch (error) {
      console.error(
        "Ошибка удаления товара:",
        error.response?.data || error.message
      );
      return rejectWithValue(error.response?.data || "Ошибка удаления товара");
    }
  }
);
