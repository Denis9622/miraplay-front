import axios from "axios";
import { store } from "./store";
import { refreshToken } from "../redux/auth/authOperations";

const axiosInstance = axios.create({
  baseURL: "https://miraplay-back.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const setAuthHeader = (token) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  delete axiosInstance.defaults.headers.common.Authorization;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await store.dispatch(refreshToken()).unwrap();
        setAuthHeader(newToken);
        return axiosInstance(originalRequest);
      } catch {
        store.dispatch({ type: "auth/clearAuthState" });
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
