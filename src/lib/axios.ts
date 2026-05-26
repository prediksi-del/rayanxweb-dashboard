import axios from "axios";
import { useAuthStore } from "@/store/authStore";

export const api = axios.create({
  baseURL: "/api", // Internal Next.js API Routes pointing to MongoDB
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Menyuntikkan Bearer Token secara otomatis
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Penanganan Error Terpusat (Anti XSS & Hijacking)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Hancurkan sesi jika token kadaluwarsa
      document.cookie = "rayanx_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      useAuthStore.getState().clearSession();
      if (typeof window !== "undefined") window.location.href = "/login";
    }
    return Promise.reject(error.response?.data || { error: "Network matrix timeout" });
  }
);
