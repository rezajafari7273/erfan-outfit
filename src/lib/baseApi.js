import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://online-mod.com/api/v1";

// دامنه اصلی سایت برای عکس‌ها (بدون /api/v1)
const MEDIA_BASE_URL = BASE_URL.replace(/\/api\/v1\/?$/, "");

// لیست فیلدهایی که احتمال دارد حاوی آدرس عکس باشند
const IMAGE_KEYS = [
  "image",
  "img",
  "banner",
  "icon",
  "avatar",
  "cover",
  "thumbnail",
  "file",
  "src",
  "photo",
];

// تشخیص اینکه آیا یک رشته آدرس تصویر است یا خیر
function isImagePath(str) {
  if (typeof str !== "string" || !str.trim()) return false;
  
  // اگر آدرس از قبل کامل باشد نیاز به تغییر ندارد
  if (str.startsWith("http://") || str.startsWith("https://") || str.startsWith("data:")) {
    return false;
  }

  // پسوندهای متداول عکس
  const hasImageExtension = /\.(jpg|jpeg|png|webp|gif|svg|avif)$/i.test(str);
  
  // مسیرهای متداول ذخیره‌سازی فایل
  const hasMediaPath =
    str.includes("media/") ||
    str.includes("static/") ||
    str.includes("uploads/") ||
    str.includes("images/");

  return hasImageExtension || hasMediaPath;
}

// تابع جایگزین کردن و کامل‌سازی آدرس تصویر
function processUrl(url) {
  if (!url || typeof url !== "string") return url;
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }

  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  return `${MEDIA_BASE_URL}${cleanPath}`;
}

// تابع پیمایش عمیق در داده‌های خروجی API
function fixImageUrls(data) {
  if (!data) return data;

  if (typeof data === "string") {
    if (isImagePath(data)) {
      return processUrl(data);
    }
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item) => fixImageUrls(item));
  }

  if (typeof data === "object") {
    const updated = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];
        
        // اگر نام کلید جزو کلیدهای تصویر باشد یا مقدارش آدرس عکس باشد
        if (
          (IMAGE_KEYS.includes(key.toLowerCase()) && typeof value === "string") ||
          isImagePath(value)
        ) {
          updated[key] = processUrl(value);
        } else {
          updated[key] = fixImageUrls(value);
        }
      }
    }
    return updated;
  }

  return data;
}

const baseApi = axios.create({
  baseURL: BASE_URL,
  timeout: 12000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

baseApi.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token =
        localStorage.getItem("access_token") ||
        localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

baseApi.interceptors.response.use(
  (response) => {
    let responseData = response.data !== undefined ? response.data : response;
    
    // اصلاح خودکار تمامی آدرس‌های عکس در پکیج دریافتی
    responseData = fixImageUrls(responseData);

    return responseData;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (typeof window !== "undefined") {
        const refreshToken =
          localStorage.getItem("refresh_token") ||
          localStorage.getItem("refreshToken");

        if (refreshToken) {
          try {
            const res = await axios.post(`${BASE_URL}/auth/refresh/`, {
              refresh: refreshToken,
            });

            const newAccessToken = res.data.access;
            localStorage.setItem("access_token", newAccessToken);
            localStorage.setItem("accessToken", newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return baseApi(originalRequest);
          } catch (refreshError) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            if (typeof window !== "undefined") {
              window.location.href = "/admin-panel/login";
            }
            return Promise.reject(refreshError);
          }
        }
      }
    }

    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.detail ||
      "خطایی در برقراری ارتباط رخ داد.";

    return Promise.reject({
      status: error.response?.status,
      message: errorMessage,
      data: error.response?.data,
    });
  }
);

export default baseApi;