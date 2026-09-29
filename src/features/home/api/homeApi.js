import baseApi from "@/lib/baseApi"; // یا مسیر دقیق فایل baseApi در پروژه شما

/**
 * ۱. دریافت پیشنهادهای شگفت‌انگیز (Amazing Offers)
 * مربوط به کامپوننت: AmazingProducts.jsx
 * @param {Object} params
 * @param {number} [params.limit=8] - تعداد محصولات پیشنهادی
 */
export const getAmazingProducts = async (params = {}) => {
  return await baseApi.get("/catalog/products/amazing-offers/", {
    params: {
      limit: 8,
      ...params,
    },
  });
};

/**
 * ۲. دریافت پرفروش‌ترین محصولات (Best Sellers)
 * مربوط به کامپوننت: BestSellingProducts.jsx
 * @param {Object} params
 * @param {number} [params.limit=4] - تعداد محصولات پرفروش
 */
export const getBestSellingProducts = async (params = {}) => {
  return await baseApi.get("/catalog/products/bestsellers/", {
    params: {
      limit: 4,
      ...params,
    },
  });
};

/**
 * ۳. دریافت پیشنهاد‌های لحظه‌ای (Instant Offers)
 * مربوط به کامپوننت: InstantOffers.jsx
 */
export const getInstantOffers = async () => {
  return await baseApi.get("/catalog/products/instant-offers/");
};

/**
 * ۴. دریافت جدیدترین محصولات و دسته‌بندی‌ها (Latest Products & Categories)
 * مربوط به کامپوننت: LatestProducts_2.jsx
 * @param {Object} params
 * @param {string} [params.category='all'] - شناسه دسته‌بندی (coat, dress, pants, all)
 * @param {number} [params.page=1] - شماره صفحه
 * @param {number} [params.limit=6] - تعداد در هر صفحه
 */
export const getLatestProducts = async (params = {}) => {
  return await baseApi.get("/catalog/products/latest/", {
    params: {
      category: "all",
      page: 1,
      limit: 6,
      ...params,
    },
  });
};