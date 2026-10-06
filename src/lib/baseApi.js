import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://online-mod.com/api/v1";

// دامنه اصلی برای تصاویر
const MEDIA_BASE_URL = "https://online-mod.com";

// تابع مطمئن برای کامل کردن آدرس عکس‌ها
export function fixImageUrl(url) {
  if (!url || typeof url !== "string") return url;
  
  // اگر آدرس از قبل کامل است (Unsplash، لینک کامل یا Base64)
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }

  // اگر نام آیکون React است (مثل Squares2X2Icon) دستکاری نکن
  if (/^[A-Za-z0-9]+Icon$/.test(url)) {
    return url;
  }

  // اضافه کردن دامنه اصلی به آدرس‌های نسبی مثل /media/...
  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  return `${MEDIA_BASE_URL}${cleanPath}`;
}

// تابع پیمایش عمیق در داده‌های API
function processImagesInObject(data) {
  if (!data) return data;

  if (typeof data === "string") {
    // اگر مسیر عکس بود آدرس را کامل کن
    if (/\.(jpg|jpeg|png|webp|gif|svg|avif)($|\?)/i.test(data) || data.includes("/media/")) {
      return fixImageUrl(data);
    }
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item) => processImagesInObject(item));
  }

  if (typeof data === "object") {
    const copy = { ...data };
    for (const key in copy) {
      if (Object.prototype.hasOwnProperty.call(copy, key)) {
        const val = copy[key];
        if (typeof val === "string") {
          const lowerKey = key.toLowerCase();
          const imageKeys = ["image", "img", "banner", "cover", "thumbnail", "photo", "avatar", "src", "file"];
          
          if (imageKeys.some((k) => lowerKey.includes(k))) {
            copy[key] = fixImageUrl(val);
          }
        } else if (typeof val === "object" && val !== null) {
          copy[key] = processImagesInObject(val);
        }
      }
    }
    return copy;
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
    
    // اصلاح اتوماتیک آدرس عکس‌ها
    responseData = processImagesInObject(responseData);

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