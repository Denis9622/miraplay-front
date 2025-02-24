import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://admindashboard-back-qth7.onrender.com/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

// 📌 GET: Получить все товары
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/products", getAuthHeader());
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        console.warn("Требуется refreshToken, пробуем обновить...");
        return rejectWithValue("Refresh token required");
      }
      return rejectWithValue(error.response?.data || "Ошибка загрузки товаров");
    }
  }
);

// 📌 POST: Добавить товар
export const addProduct = createAsyncThunk(
  "products/add",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/products",
        productData,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
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
      const response = await axios.put(
        `/products/${id}`,
        productData,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
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
      await axios.delete(`/products/${id}`, getAuthHeader());
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка удаления товара");
    }
  }
);
