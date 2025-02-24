import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://admindashboard-back-qth7.onrender.com/api";
axios.defaults.withCredentials = true; // Добавлено для отправки куки с запросом

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
      const { user, accessToken, refreshToken } = response.data.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setAuthHeader(accessToken);

      return { user, accessToken, refreshToken };
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
      const { user, accessToken, refreshToken } = response.data.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setAuthHeader(accessToken);

      return { user, accessToken, refreshToken };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/logout",
        {},
        { withCredentials: true }
      );

      // Чистим localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("refreshToken");
      delete axios.defaults.headers.common["Authorization"];

      return response.data;
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Ошибка выхода");
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
