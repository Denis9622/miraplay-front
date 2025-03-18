import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axiosInstance"; // Используем настроенный api

// 📌 **Получить всех поставщиков (GET)**
export const fetchSuppliers = createAsyncThunk(
  "suppliers/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/suppliers"); // Используем api
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

// 📌 **Добавить поставщика (POST)**
export const addSupplier = createAsyncThunk(
  "suppliers/add",
  async (supplierData, { rejectWithValue }) => {
    try {
      const response = await api.post("/suppliers", supplierData); // Используем api
      return response.data;
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

// 📌 **Обновить поставщика (PUT)**
export const updateSupplier = createAsyncThunk(
  "suppliers/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/suppliers/${id}`, data); // Используем api
      return response.data;
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

// 📌 **Удалить поставщика (DELETE)**
export const deleteSupplier = createAsyncThunk(
  "suppliers/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/suppliers/${id}`); // Используем api
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

// 📌 **Создаем Slice**
const suppliersSlice = createSlice({
  name: "suppliers",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(updateSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map((supplier) =>
          supplier._id === action.payload._id ? action.payload : supplier
        );
      })
      .addCase(updateSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (supplier) => supplier._id !== action.payload
        );
      })
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default suppliersSlice.reducer;
