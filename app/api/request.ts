import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { request } from "http";

const baseURL =
  typeof process.env.NEXT_PUBLIC_BACKEND_URL === "string" &&
  process.env.NEXT_PUBLIC_BACKEND_URL.trim() !== ""
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}`
    : "/api";

const AxiosInstance = axios.create({ baseURL });

/** ─────────────────── Request interceptor ─────────────────── */
// AxiosInstance.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     // ✅ Guard for CSR only – never runs during SSR
//     if (typeof window !== 'undefined') {
//       const token = localStorage.getItem('token');
//       if (token && config.headers) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

export default AxiosInstance;
