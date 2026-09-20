import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

const baseApi = axios.create({
  baseURL: BASE_URL,
  timeout: 12000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ارسال توکن Access همراه با درخواست‌ها
baseApi.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// مدیریت خودکار 401 و Refresh کردن توکن
baseApi.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (typeof window !== "undefined") {
        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken) {
          try {
            // درخواست توکن جدید از بکند
            const res = await axios.post(`${BASE_URL}/auth/refresh/`, {
              refresh: refreshToken,
            });

            const newAccessToken = res.data.access;
            localStorage.setItem("accessToken", newAccessToken);

            // اجرای مجدد درخواست قبلی با توکن جدید
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return baseApi(originalRequest);
          } catch (refreshError) {
            // اگر توکن Refresh هم منقضی شده بود، خروج کامل
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            if (typeof window !== "undefined") {
              window.location.href = "/";
            }
            return Promise.reject(refreshError);
          }
        }
      }
    }

    return Promise.reject(
      error.response?.data || { message: "خطایی در برقراری ارتباط رخ داد." }
    );
  }
);

export default baseApi;