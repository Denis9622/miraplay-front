import axios from "axios";
import { store } from "./store"; // Импорт вашего Redux store
import { refreshToken } from "./auth/authOperations"; // Импорт операции обновления токена

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // Передача HTTPOnly куки
});

// 📌 Функция для установки заголовка Authorization
const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// 📌 Загружаем токен при старте
const token = localStorage.getItem("token");
if (token && token !== "undefined") {
  setAuthHeader(token);
}

// 🔄 Перехватчик ошибок (обновление токена при 401)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Проверяем 401 ошибку и отсутствие повторного запроса
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await store.dispatch(refreshToken());
        const newToken = localStorage.getItem("token");
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("❌ Ошибка обновления токена:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
export { setAuthHeader };
