import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axiosInstance";

// 📌 Получение списка продуктов
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Ошибка загрузки продуктов"
      );
    }
  }
);

// 📌 Добавление нового продукта
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await api.post("/products", productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Ошибка добавления продукта"
      );
    }
  }
);

// 📌 Обновление продукта
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/products/${productData._id}`,
        productData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Ошибка обновления продукта"
      );
    }
  }
);

// 📌 Удаление продукта
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/products/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Ошибка удаления продукта"
      );
    }
  }
);
