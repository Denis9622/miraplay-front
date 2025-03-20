import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axiosInstance"; // Используем настроенный api
import { setAuthHeader } from "../axiosInstance";

// 📌 Регистрация пользователя
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", userData);
      const { id, name, email, accessToken } = response.data.data;

      // Сохраняем токены и данные пользователя
      localStorage.setItem("user", JSON.stringify({ id, name, email }));
      localStorage.setItem("token", accessToken);

      setAuthHeader(accessToken); // Устанавливаем токен в заголовки

      return { id, name, email, accessToken };
    } catch (error) {
      console.error(
        "Ошибка регистрации:",
        error.response?.data || error.message
      );
      return rejectWithValue(error.response?.data || "Ошибка регистрации");
    }
  }
);

// 📌 Вход пользователя
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", credentials);
      const { user, accessToken, refreshToken } = response.data.data;

      // Сохраняем токены и данные пользователя
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setAuthHeader(accessToken); // Устанавливаем токен в заголовки

      return { user, accessToken, refreshToken };
    } catch (error) {
      console.error("Ошибка входа:", error.response?.data || error.message);
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

      // Отправляем запрос на сервер для удаления токена
      const response = await api.post(
        "/auth/logout",
        {},
        refreshToken
          ? { headers: { Authorization: `Bearer ${refreshToken}` } }
          : {}
      );

      // Очищаем локальные данные
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      sessionStorage.clear();

      return response.data;
    } catch (error) {
      if (error.response?.data?.message === "Invalid refresh token") {
        // Очищаем локальные данные при недействительном refresh token
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        sessionStorage.clear();
      }
      console.error("Ошибка выхода:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Ошибка выхода");
    }
  }
);

// 📌 Обновление токена
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await api.post(
        "/auth/refresh",
        {},
        refreshToken
          ? { headers: { Authorization: `Bearer ${refreshToken}` } }
          : {}
      );
      const newAccessToken = response.data.accessToken;

      localStorage.setItem("token", newAccessToken);
      setAuthHeader(newAccessToken); // Устанавливаем новый accessToken

      return newAccessToken;
    } catch (error) {
      localStorage.removeItem("token");
      return rejectWithValue("Не удалось обновить токен. Авторизуйтесь снова.");
    }
  }
);
