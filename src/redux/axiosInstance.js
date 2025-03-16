import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // Если сервер использует HTTPOnly куки
});

// 🔄 Добавляем перехватчик для обновления токена
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Флаг, чтобы не зацикливаться

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          console.log("❌ Нет refreshToken, разлогиниваем пользователя");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          return Promise.reject(error);
        }

        // 🔄 Запрашиваем новый `accessToken` у сервера
        const { data } = await axios.post("/auth/refresh", { refreshToken });

        // 🔹 Обновляем токены в `localStorage`
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        console.log("✅ Токен обновлен:", data.accessToken);

        // 🔄 Повторяем оригинальный запрос с новым токеном
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("❌ Ошибка обновления токена:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
