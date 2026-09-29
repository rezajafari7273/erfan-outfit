import baseApi from '@/lib/baseApi';

export const adminApi = {
  // ۰. احراز هویت
  login: async (credentials) => await baseApi.post('/auth/admin/login/', credentials),
  logout: async (data = {}) => await baseApi.post('/auth/logout/', data),

  // =====================================================
  // آنالیز و داشبورد
  // =====================================================
  getDashboardStats: async () => await baseApi.get('/admin/analytics/dashboard/'),
  getFullDashboard: async () => await baseApi.get('/admin/analytics/full/'),
  getSalesChart: async (range = '7d') =>
    await baseApi.get('/admin/analytics/sales-chart/', { params: { range } }),
  getRecentOrders: async (limit = 10) =>
    await baseApi.get('/admin/analytics/recent-orders/', { params: { limit } }),
  getTopProducts: async (limit = 5) =>
    await baseApi.get('/admin/analytics/top-products/', { params: { limit } }),
  getLowStock: async (threshold = 5, limit = 10) =>
    await baseApi.get('/admin/analytics/low-stock/', { params: { threshold, limit } }),
  getRecentUsers: async (limit = 5) =>
    await baseApi.get('/admin/analytics/recent-users/', { params: { limit } }),
  getRecentTransactions: async (limit = 10) =>
    await baseApi.get('/admin/analytics/recent-transactions/', { params: { limit } }),

  // =====================================================
  // محصولات
  // =====================================================
  getProducts: async (params = {}) => await baseApi.get('/admin/products/', { params }),
  getProductById: async (id) => await baseApi.get(`/admin/products/${id}/`),
  createProduct: async (data) =>
    await baseApi.post('/admin/products/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  updateProduct: async (id, data, partial = false) => {
    const method = partial ? 'patch' : 'put';
    return await baseApi[method](`/admin/products/${id}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteProduct: async (id) => await baseApi.delete(`/admin/products/${id}/`),
  toggleProductFeatured: async (id) => await baseApi.post(`/admin/products/${id}/toggle_featured/`),
  toggleProductActive: async (id) => await baseApi.post(`/admin/products/${id}/toggle_active/`),
  getProductVariants: async (id) => await baseApi.get(`/admin/products/${id}/variants/`),

  // =====================================================
  // واریانت‌ها
  // =====================================================
  getVariants: async (params = {}) => await baseApi.get('/admin/variants/', { params }),
  createVariant: async (data) =>
    await baseApi.post('/admin/variants/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  updateVariant: async (id, data) =>
    await baseApi.put(`/admin/variants/${id}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  deleteVariant: async (id) => await baseApi.delete(`/admin/variants/${id}/`),

  // =====================================================
  // دسته‌بندی
  // =====================================================
  getCategories: async (params = {}) => await baseApi.get('/admin/categories/', { params }),
  getCategoryById: async (id) => await baseApi.get(`/admin/categories/${id}/`),
  createCategory: async (data) =>
    await baseApi.post('/admin/categories/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  updateCategory: async (id, data) =>
    await baseApi.put(`/admin/categories/${id}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  deleteCategory: async (id) => await baseApi.delete(`/admin/categories/${id}/`),

  // =====================================================
  // رنگ‌ها
  // =====================================================
  getColors: async (params = {}) => await baseApi.get('/admin/colors/', { params }),
  createColor: async (data) => await baseApi.post('/admin/colors/', data),
  updateColor: async (id, data) => await baseApi.put(`/admin/colors/${id}/`, data),
  deleteColor: async (id) => await baseApi.delete(`/admin/colors/${id}/`),

  // =====================================================
  // سایزها
  // =====================================================
  getSizes: async (params = {}) => await baseApi.get('/admin/sizes/', { params }),
  createSize: async (data) => await baseApi.post('/admin/sizes/', data),
  updateSize: async (id, data) => await baseApi.put(`/admin/sizes/${id}/`, data),
  deleteSize: async (id) => await baseApi.delete(`/admin/sizes/${id}/`),

  // =====================================================
  // فروشندگان
  // =====================================================
  getVendors: async (params = {}) => await baseApi.get('/admin/vendors/', { params }),
  approveVendor: async (id) => await baseApi.post(`/admin/vendors/${id}/approve/`),
  rejectVendor: async (id) => await baseApi.post(`/admin/vendors/${id}/reject/`),

  // =====================================================
  // سفارشات
  // =====================================================
  getOrders: async (params = {}) => await baseApi.get('/admin/orders/', { params }),
  getOrderById: async (id) => await baseApi.get(`/admin/orders/${id}/`),
  getOrdersStats: async () => await baseApi.get('/admin/orders/stats/'),
  updateOrderStatus: async (id, status) =>
    await baseApi.post(`/admin/orders/${id}/update_status/`, { status }),
  cancelOrder: async (id, reason = '') =>
    await baseApi.post(`/admin/orders/${id}/cancel/`, { reason }),
  setOrderNote: async (id, data) =>
    await baseApi.post(`/admin/orders/${id}/note/`, data),
  updateOrder: async (id, data) => await baseApi.patch(`/admin/orders/${id}/`, data),
  deleteOrder: async (id) => await baseApi.delete(`/admin/orders/${id}/`),

  // =====================================================
  // کاربران
  // =====================================================
  getUsers: async (params = {}) => await baseApi.get('/admin/users/', { params }),
  getUserDetail: async (id) => await baseApi.get(`/admin/users/${id}/`),
  getUsersStats: async () => await baseApi.get('/admin/users/stats/'),
  updateUser: async (id, data) =>
    await baseApi.patch(`/admin/users/${id}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  userAction: async (id, action, data = {}) =>
    await baseApi.post(`/admin/users/${id}/${action}/`, data),


    // =====================================================
  // پروموشن‌ها
  // =====================================================
  getPromotions: async (params = {}) => await baseApi.get('/admin/promotions/', { params }),
  getPromotionById: async (id) => await baseApi.get(`/admin/promotions/${id}/`),
  createPromotion: async (data) => await baseApi.post('/admin/promotions/', data),
  updatePromotion: async (id, data) => await baseApi.put(`/admin/promotions/${id}/`, data),
  deletePromotion: async (id) => await baseApi.delete(`/admin/promotions/${id}/`),
  promotionAction: async (id, action, data = {}) => await baseApi.post(`/admin/promotions/${id}/${action}/`, data),

  // =====================================================
  // کوپن‌ها
  // =====================================================
  getCoupons: async (params = {}) => await baseApi.get('/admin/coupons/', { params }),
  getCouponById: async (id) => await baseApi.get(`/admin/coupons/${id}/`),
  createCoupon: async (data) => await baseApi.post('/admin/coupons/', data),
  updateCoupon: async (id, data) => await baseApi.put(`/admin/coupons/${id}/`, data),
  deleteCoupon: async (id) => await baseApi.delete(`/admin/coupons/${id}/`),
  couponAction: async (id, action, data = {}) => await baseApi.post(`/admin/coupons/${id}/${action}/`, data),

    // FlashSale
  getFlashSales: async (params = {}) => await baseApi.get('/admin/flash-sales/', { params }),
  createFlashSale: async (data) => await baseApi.post('/admin/flash-sales/', data),
  updateFlashSale: async (id, data) => await baseApi.put(`/admin/flash-sales/${id}/`, data),
  deleteFlashSale: async (id) => await baseApi.delete(`/admin/flash-sales/${id}/`),
  flashSaleAction: async (id, action) => await baseApi.post(`/admin/flash-sales/${id}/${action}/`),

  // BOGO
  getBogoOffers: async (params = {}) => await baseApi.get('/admin/bogo-offers/', { params }),
  createBogoOffer: async (data) => await baseApi.post('/admin/bogo-offers/', data),
  updateBogoOffer: async (id, data) => await baseApi.put(`/admin/bogo-offers/${id}/`, data),
  deleteBogoOffer: async (id) => await baseApi.delete(`/admin/bogo-offers/${id}/`),
  bogoOfferAction: async (id, action) => await baseApi.post(`/admin/bogo-offers/${id}/${action}/`),

  // TopBanner
  getTopBanners: async (params = {}) => await baseApi.get('/admin/top-banners/', { params }),
  createTopBanner: async (data) => await baseApi.post('/admin/top-banners/', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateTopBanner: async (id, data) => await baseApi.put(`/admin/top-banners/${id}/`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteTopBanner: async (id) => await baseApi.delete(`/admin/top-banners/${id}/`),
  topBannerAction: async (id, action) => await baseApi.post(`/admin/top-banners/${id}/${action}/`),

  // Story
  getStories: async (params = {}) => await baseApi.get('/admin/stories/', { params }),
  createStory: async (data) => await baseApi.post('/admin/stories/', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateStory: async (id, data) => await baseApi.put(`/admin/stories/${id}/`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteStory: async (id) => await baseApi.delete(`/admin/stories/${id}/`),
  storyAction: async (id, action) => await baseApi.post(`/admin/stories/${id}/${action}/`),

  // BannerSlider
  getBannerSliders: async (params = {}) => await baseApi.get('/admin/banner-sliders/', { params }),
  createBannerSlider: async (data) => await baseApi.post('/admin/banner-sliders/', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateBannerSlider: async (id, data) => await baseApi.put(`/admin/banner-sliders/${id}/`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteBannerSlider: async (id) => await baseApi.delete(`/admin/banner-sliders/${id}/`),
  bannerSliderAction: async (id, action) => await baseApi.post(`/admin/banner-sliders/${id}/${action}/`),

  // SmallBanner
  getSmallBanners: async (params = {}) => await baseApi.get('/admin/small-banners/', { params }),
  createSmallBanner: async (data) => await baseApi.post('/admin/small-banners/', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateSmallBanner: async (id, data) => await baseApi.put(`/admin/small-banners/${id}/`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteSmallBanner: async (id) => await baseApi.delete(`/admin/small-banners/${id}/`),
  smallBannerAction: async (id, action) => await baseApi.post(`/admin/small-banners/${id}/${action}/`),

  // LandingPage
  getLandings: async (params = {}) => await baseApi.get('/admin/landings/', { params }),
  getLandingById: async (id) => await baseApi.get(`/admin/landings/${id}/`),
  createLanding: async (data) => await baseApi.post('/admin/landings/', data),
  updateLanding: async (id, data) => await baseApi.put(`/admin/landings/${id}/`, data),
  deleteLanding: async (id) => await baseApi.delete(`/admin/landings/${id}/`),
  landingAction: async (id, action) => await baseApi.post(`/admin/landings/${id}/${action}/`),

  // LandingBlock
  getLandingBlocks: async (params = {}) => await baseApi.get('/admin/landing-blocks/', { params }),
  getLandingBlockById: async (id) => await baseApi.get(`/admin/landing-blocks/${id}/`),
  createLandingBlock: async (data) => await baseApi.post('/admin/landing-blocks/', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateLandingBlock: async (id, data) => await baseApi.put(`/admin/landing-blocks/${id}/`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteLandingBlock: async (id) => await baseApi.delete(`/admin/landing-blocks/${id}/`),
};