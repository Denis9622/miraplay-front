import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axiosInstance"; // Используем настроенный API

// 📌 Операции для работы с поставщиками

// Получение всех поставщиков
export const fetchSuppliers = createAsyncThunk(
  "suppliers/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/suppliers");
      return response.data;
    } catch (error) {
      console.error(
        "Ошибка загрузки поставщиков:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || "Ошибка загрузки поставщиков"
      );
    }
  }
);

// Добавление нового поставщика
export const addSupplier = createAsyncThunk(
  "suppliers/add",
  async (supplierData, { rejectWithValue }) => {
    try {
      const response = await api.post("/suppliers", supplierData);
      return response.data; // Возвращаем данные добавленного поставщика
    } catch (error) {
      console.error(
        "Ошибка добавления поставщика:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || "Ошибка добавления поставщика"
      );
    }
  }
);

// Обновление данных поставщика
export const updateSupplier = createAsyncThunk(
  "suppliers/update",
  async ({ id, supplierData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/suppliers/${id}`, supplierData);
      return response.data; // Возвращаем обновлённые данные поставщика
    } catch (error) {
      console.error(
        "Ошибка обновления поставщика:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || "Ошибка обновления поставщика"
      );
    }
  }
);

// Удаление поставщика
export const deleteSupplier = createAsyncThunk(
  "suppliers/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/suppliers/${id}`);
      return id; // Возвращаем ID удалённого поставщика
    } catch (error) {
      console.error(
        "Ошибка удаления поставщика:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || "Ошибка удаления поставщика"
      );
    }
  }
);

// 📌 Slice для поставщиков

const initialState = { items: [], loading: false, error: null };

const suppliersSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {}, // Если нужны локальные действия, добавляйте их сюда
  extraReducers: (builder) => {
    builder
      // Обработка получения поставщиков
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Обработка добавления поставщика
      .addCase(addSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSupplier.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Обработка обновления поставщика
      .addCase(updateSupplier.fulfilled, (state, action) => {
        state.items = state.items.map((supplier) =>
          supplier._id === action.payload._id ? action.payload : supplier
        );
      })

      // Обработка удаления поставщика
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (supplier) => supplier._id !== action.payload
        );
      });
  },
});

export default suppliersSlice.reducer;
