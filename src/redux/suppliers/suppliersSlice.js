import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://admindashboard-back-qth7.onrender.com/api";

// 📌 **Получить всех поставщиков (GET)**
export const fetchSuppliers = createAsyncThunk(
  "suppliers/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/suppliers");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Ошибка загрузки поставщиков"
      );
    }
  }
);

// 📌 **Добавить поставщика (POST)**
export const addSupplier = createAsyncThunk(
  "suppliers/add",
  async (supplierData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/suppliers", supplierData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Ошибка добавления поставщика"
      );
    }
  }
);

// 📌 **Обновить поставщика (PUT)**
export const updateSupplier = createAsyncThunk(
  "suppliers/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/suppliers/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Ошибка обновления поставщика"
      );
    }
  }
);

// 📌 **Удалить поставщика (DELETE)**
export const deleteSupplier = createAsyncThunk(
  "suppliers/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/suppliers/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Ошибка удаления поставщика"
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
      .addCase(addSupplier.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        state.items = state.items.map((supplier) =>
          supplier._id === action.payload._id ? action.payload : supplier
        );
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (supplier) => supplier._id !== action.payload
        );
      });
  },
});



export default suppliersSlice.reducer;
