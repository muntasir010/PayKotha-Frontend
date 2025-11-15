
import axios, { type AxiosRequestConfig } from "axios";

// const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api/v1";

// Create axios instance
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


let isRefreshing = false;
let pendingQueue: {
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
}[] = [];

const processQueue = (error?: unknown) => {
  pendingQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve();
  });
  pendingQueue = [];
};

// Response interceptor: handle token expired
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Check for 401 Unauthorized and expired token message
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data?.message === "jwt expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        // call refresh token endpoint
        const res = await axiosInstance.post("/auth/refresh-token", null, {
          withCredentials: true,
        });

        // Save new token to localStorage
        if (res.data?.data?.token) {
          localStorage.setItem("token", res.data.data.token);
        }

        processQueue();
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
