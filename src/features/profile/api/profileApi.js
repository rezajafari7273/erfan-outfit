import baseApi from "@/lib/baseApi";

export const profileApi = {
  // --- Profile ---
  getProfile: async () => {
    return await baseApi.get("/auth/profile/");
  },

  updateProfile: async (data) => {
    if (data.avatar instanceof File) {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        const value = data[key];
        if (value !== null && value !== undefined && value !== "") {
          formData.append(key, value);
        }
      });
      return await baseApi.patch("/auth/profile/", formData);
    }

    // حذف فیلدهای خالی برای درخواست JSON
    const clean = {};
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (value !== null && value !== undefined && value !== "") {
        clean[key] = value;
      }
    });

    return await baseApi.patch("/auth/profile/", clean);
  },

  // --- Body Measurements ---
  getMeasurements: async () => {
    return await baseApi.get("/auth/measurements/");
  },

  updateMeasurements: async (data) => {
    return await baseApi.post("/auth/measurements/", data);
  },

  // --- Addresses ---
  getAddresses: async () => {
    return await baseApi.get("/auth/addresses/");
  },

  getAddressById: async (id) => {
    return await baseApi.get(`/auth/addresses/${id}/`);
  },

  createAddress: async (data) => {
    return await baseApi.post("/auth/addresses/", data);
  },

  updateAddress: async (id, data) => {
    return await baseApi.put(`/auth/addresses/${id}/`, data);
  },

  deleteAddress: async (id) => {
    return await baseApi.delete(`/auth/addresses/${id}/`);
  },
};