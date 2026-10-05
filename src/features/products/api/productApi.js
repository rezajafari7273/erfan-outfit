import baseApi from "@/lib/baseApi";

export const productApi = {
  // --- Categories ---
  getCategories: async () => {
    return await baseApi.get("/catalog/categories/");
  },

  getCategoryBySlug: async (slug) => {
    return await baseApi.get(`/catalog/categories/${slug}/`);
  },

  // --- Collections (اضافه شده برای مگامنو و لندینگ‌ها) ---
  getCollections: async () => {
    return await baseApi.get("/catalog/collections/");
  },

  getMegamenuCollections: async () => {
    return await baseApi.get("/catalog/collections/megamenu/");
  },

  getCollectionBySlug: async (slug) => {
    return await baseApi.get(`/catalog/collections/${slug}/`);
  },

  // --- Colors / Sizes (فیلترهای داینامیک) ---
  getColors: async () => {
    return await baseApi.get("/catalog/colors/");
  },

  getSizes: async () => {
    return await baseApi.get("/catalog/sizes/");
  },

  // --- Products ---
  getProducts: async (params = {}) => {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, v]) => v !== null && v !== undefined && v !== "" && v !== false
      )
    );
    console.log("[API getProducts] params:", cleanParams);
    return await baseApi.get("/catalog/products/", { params: cleanParams });
  },

  getProductBySlug: async (slug) => {
    return await baseApi.get(`/catalog/products/${slug}/`);
  },

  getProductVariants: async (slug) => {
    return await baseApi.get(`/catalog/products/${slug}/variants/`);
  },

  getProductSizeChart: async (slug) => {
    return await baseApi.get(`/catalog/products/${slug}/size-chart/`);
  },

  // --- Reviews & Questions ---
  getProductReviews: async (slug) => {
    return await baseApi.get(`/catalog/products/${slug}/reviews/`);
  },

  submitProductReview: async (slug, data) => {
    return await baseApi.post(`/catalog/products/${slug}/reviews/`, data);
  },

  getProductQuestions: async (slug) => {
    return await baseApi.get(`/catalog/products/${slug}/questions/`);
  },

  submitProductQuestion: async (slug, data) => {
    return await baseApi.post(`/catalog/products/${slug}/questions/`, data);
  },

  // --- Tailoring Orders ---
  getTailoringOrders: async () => {
    return await baseApi.get("/catalog/tailoring/orders/");
  },

  createTailoringOrder: async (data) => {
    return await baseApi.post("/catalog/tailoring/order/", data);
  },

  cancelTailoringOrder: async (id) => {
    return await baseApi.delete(`/catalog/tailoring/order/${id}/`);
  },
};