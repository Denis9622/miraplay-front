import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axiosInstance"; // Используем настроенный api

// 📌 Регистрация пользователя
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/register", userData);
      const { user, accessToken, refreshToken } = response.data.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      return { user, accessToken, refreshToken };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка регистрации");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", credentials);
      const { user, accessToken, refreshToken } = response.data.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setAuthHeader(accessToken); // 📌 Добавляем токен в заголовки

      return { user, accessToken, refreshToken };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка входа");
    }
  }
);

// 📌 Выход пользователя
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      const response = await api.post(
        "/logout",
        {},
        refreshToken
          ? { headers: { Authorization: `Bearer ${refreshToken}` } }
          : {}
      );

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      sessionStorage.clear();

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка выхода");
    }
  }
);

// 📌 Обновление токена
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/refresh"); // Исправляем URL
      const newToken = response.data.accessToken;

      localStorage.setItem("token", newToken);
      setAuthHeader(newToken); // Устанавливаем новый токен в заголовки

      return response.data;
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return rejectWithValue("Сессия истекла, авторизуйтесь снова");
    }
  }
);

// Установка заголовка авторизации
export const setAuthHeader = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
