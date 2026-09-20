import baseApi from "@/lib/baseApi";

export const cartApi = {
  getCart: async () => {
    return await baseApi.get("/cart/");
  },

  addItem: async ({ product_id, variant_id = null, quantity = 1 }) => {
    return await baseApi.post("/cart/items/", {
      product_id,
      variant_id,
      quantity,
    });
  },

  updateItem: async (itemId, quantity) => {
    return await baseApi.patch(`/cart/items-update/${itemId}/`, { quantity });
  },

  removeItem: async (itemId) => {
    return await baseApi.delete(`/cart/items-delete/${itemId}/`);
  },

  reserve: async () => {
    return await baseApi.post("/cart/reserve/");
  },

  release: async () => {
    return await baseApi.post("/cart/release/");
  },

  reserveStatus: async () => {
    return await baseApi.get("/cart/reserve/status/");
  },

  mergeGuestCart: async (sessionKey) => {
    return await baseApi.post("/cart/merge/", { session_key: sessionKey });
  },
};