import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";

// 📌 Функция для получения заголовков с токеном
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

// 📌 Устанавливаем токен в заголовки глобально
const setAuthHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// 📌 Загружаем токен из `localStorage` при старте приложения
const token = localStorage.getItem("token");
if (token) setAuthHeader(token);

// 📌 Регистрация
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/register", userData);
      setAuthHeader(response.data.data.token);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 📌 Логин
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/login", credentials);
      setAuthHeader(response.data.data.token);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 📌 Выход
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/logout", null, getAuthHeader());

      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);

// 📌 Обновление токена
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("/refresh", {}, getAuthHeader());
      const newToken = response.data.accessToken;

      localStorage.setItem("token", newToken);
      setAuthHeader(newToken);

      return response.data;
    } catch (error) {
      console.error("Ошибка обновления токена:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return rejectWithValue("Session expired, please log in again");
    }
  }
);
