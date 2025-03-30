import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axiosInstance";
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

      setAuthHeader(accessToken);

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
      console.log("Ответ сервера:", response.data);

      // Извлекаем данные из ответа
      const { data } = response.data;
      const { accessToken } = data;

      // Создаем объект пользователя из данных токена
      const tokenPayload = JSON.parse(atob(accessToken.split(".")[1]));
      const user = {
        id: tokenPayload.userId,
        email: credentials.email,
        name: credentials.email.split("@")[0], // Временное имя пользователя
      };

      // Сохраняем токены и данные пользователя
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      setAuthHeader(accessToken);

      return {
        user,
        accessToken,
        refreshToken: data.refreshToken,
      };
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
      if (!refreshToken) {
        throw new Error("Нет refresh token");
      }

      const response = await api.post(
        "/auth/refresh",
        {},
        { headers: { Authorization: `Bearer ${refreshToken}` } }
      );
      const newAccessToken = response.data.accessToken;

      localStorage.setItem("token", newAccessToken);
      setAuthHeader(newAccessToken);

      return newAccessToken;
    } catch (error) {
      // Очищаем все токены при ошибке обновления
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      sessionStorage.clear();
      return rejectWithValue("Не удалось обновить токен. Авторизуйтесь снова.");
    }
  }
);
