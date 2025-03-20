import axios from "axios";
import { store } from "./store";
import { refreshToken } from "./auth/authOperations";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// Установка заголовка Authorization
export const setAuthHeader = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Перехватчик ошибок
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await store.dispatch(refreshToken());
        const newToken = localStorage.getItem("token");
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Ошибка обновления токена:", refreshError.message);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
