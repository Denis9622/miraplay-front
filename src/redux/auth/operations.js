import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
} from "./authSlice";
import axiosInstance from "../axiosInstance";
import { setAuthHeader } from "../axiosInstance";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { dispatch }) => {
    try {
      dispatch(loginStart());
      const { data } = await axiosInstance.post("/auth/login", credentials);

      setAuthHeader(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      dispatch(loginSuccess(data));
      return data;
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || "Ошибка входа"));
      throw error;
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, { dispatch }) => {
    try {
      dispatch(registerStart());
      const { data } = await axiosInstance.post("/auth/register", credentials);

      setAuthHeader(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      dispatch(registerSuccess(data));
      return data;
    } catch (error) {
      dispatch(
        registerFailure(error.response?.data?.message || "Ошибка регистрации")
      );
      throw error;
    }
  }
);
