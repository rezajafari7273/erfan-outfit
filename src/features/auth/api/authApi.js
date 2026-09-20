import baseApi from "@/lib/baseApi";

export const authApi = {
  // === 1. جریان OTP & ورود ===
  sendOtp: (phoneNumber) => {
    return baseApi.post("/auth/otp/send/", { phone: phoneNumber });
  },

verifyOtp: (phoneNumber, code) => {
  return baseApi.post("/auth/otp/verify/", {
    phone: phoneNumber,
    code: code,
  });
},

  logout: () => {
    const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;
    return baseApi.post("/auth/logout/", { refresh: refreshToken });
  },

  // === 2. مدیریت پروفایل و سایزبندی ===
  getProfile: () => {
    return baseApi.get("/auth/profile/");
  },

  updateProfile: (data) => {
    return baseApi.patch("/auth/profile/", data);
  },

  getMeasurements: () => {
    return baseApi.get("/auth/measurements/");
  },

  updateMeasurements: (data) => {
    return baseApi.post("/auth/measurements/", data);
  },

  // === 3. مدیریت آدرس‌ها (Address CRUD) ===
  getAddresses: () => {
    return baseApi.get("/auth/addresses/");
  },

  getAddressById: (id) => {
    return baseApi.get(`/auth/addresses/${id}/`);
  },

  createAddress: (data) => {
    return baseApi.post("/auth/addresses/", data);
  },

  updateAddress: (id, data) => {
    return baseApi.put(`/auth/addresses/${id}/`, data);
  },

  deleteAddress: (id) => {
    return baseApi.delete(`/auth/addresses/${id}/`);
  },

  // === 4. ورود دو مرحله‌ای (2FA) ===
  login2FA: (data) => {
    return baseApi.post("/auth/2fa/login/", data);
  },

  setup2FA: () => {
    return baseApi.post("/auth/2fa/setup/");
  },

  enable2FA: (code) => {
    return baseApi.post("/auth/2fa/enable/", { code });
  },

  disable2FA: (code) => {
    return baseApi.post("/auth/2fa/disable/", { code });
  },
};