import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "./customersOperations.js";

const initialState = { items: [], loading: false, error: null };

const customersSlice = createSlice({
  name: "customers",
  initialState,
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
