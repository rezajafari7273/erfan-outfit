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
};