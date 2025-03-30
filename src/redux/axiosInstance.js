import axios from "axios";
import { store } from "./store";
import { refreshToken } from "../redux/auth/authOperations";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const setAuthHeader = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  delete instance.defaults.headers.common.Authorization;
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await store.dispatch(refreshToken()).unwrap();
        setAuthHeader(newToken);
        return instance(originalRequest);
      } catch {
        store.dispatch({ type: "auth/clearAuthState" });
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
