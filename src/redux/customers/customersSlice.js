import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";

// 📌 **Получить всех клиентов (GET)**
export const fetchCustomers = createAsyncThunk(
  "customers/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/customers");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Ошибка загрузки клиентов");
    }
  }
);

// 📌 **Добавить клиента (POST)**
export const addCustomer = createAsyncThunk(
  "customers/add",
  async (customerData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/customers", customerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Ошибка добавления клиента"
      );
    }
  }
);

// 📌 **Обновить клиента (PUT)**
export const updateCustomer = createAsyncThunk(
  "customers/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/customers/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Ошибка обновления клиента"
      );
    }
  }
);

// 📌 **Удалить клиента (DELETE)**
export const deleteCustomer = createAsyncThunk(
  "customers/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/customers/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data || "Ошибка удаления клиента");
    }
  }
);

// 📌 **Создаем Slice**
const customersSlice = createSlice({
  name: "customers",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.items = state.items.map((customer) =>
          customer._id === action.payload._id ? action.payload : customer
        );
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (customer) => customer._id !== action.payload
        );
      });
  },
});

export default customersSlice.reducer;
