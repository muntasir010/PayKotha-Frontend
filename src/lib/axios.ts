// // import config from "@/config/config";
// import axios, { type AxiosRequestConfig } from "axios";

// export const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL,
//   withCredentials: true,
//    headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Add a request interceptor
// axiosInstance.interceptors.request.use(
//   function (config) {
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// let isRefreshing = false;

// let pendingQueue: {
//   resolve: (value: unknown) => void;
//   reject: (value: unknown) => void;
// }[] = [];

// const processQueue = (error: unknown) => {
//   pendingQueue.forEach((promise) => {
//     if (error) {
//       promise.reject(error);
//     } else {
//       promise.resolve(null);
//     }
//   });

//   pendingQueue = [];
// };

// // Add a response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     // console.log("Request failed", error.response.data.message);

//     const originalRequest = error.config as AxiosRequestConfig & {
//       _retry: boolean;
//     };

//     if (
//       error.response.status === 500 &&
//       error.response.data.message === "jwt expired" &&
//       !originalRequest._retry
//     ) {
//       console.log("Your token is expired");

//       originalRequest._retry = true;

//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           pendingQueue.push({ resolve, reject });
//         })
//           .then(() => axiosInstance(originalRequest))
//           .catch((error) => Promise.reject(error));
//       }

//       isRefreshing = true;
//       try {
//         const res = await axiosInstance.post("/auth/refresh-token");
//         console.log("New Token arrived", res);

//         processQueue(null);

//         return axiosInstance(originalRequest);
//       } catch (error) {
//         processQueue(error);
//         return Promise.reject(error);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     //* For Everything
//     return Promise.reject(error);
//   }
// );

// src/lib/axios.ts
import axios, { type AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api/v1";

// Create axios instance
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // needed for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach token from localStorage if available
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

// Pending queue for refresh token
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
