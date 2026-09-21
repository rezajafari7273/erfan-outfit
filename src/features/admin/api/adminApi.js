import baseApi from '@/lib/baseApi';

export const adminApi = {
  // ۰. احراز هویت و لاگین ادمین
  login: async (credentials) => {
    return await baseApi.post('/auth/admin/login/', credentials);
  },

  // اضافه شدن متد خروج ادمین
  logout: async (data = {}) => {
    return await baseApi.post('/auth/logout/', data);
  },

  // ۱. داشبورد و آمار
  getDashboardStats: async () => {
    return await baseApi.get('/admin/analytics/dashboard/');
  },

  // ... (سایر متدهای محصولات، دسته‌بندی‌ها و غیره سر جای خودشان هستند)
  getProducts: async (params = {}) => {
    return await baseApi.get('/admin/products/', { params });
  },
  getProductById: async (id) => {
    return await baseApi.get(`/admin/products/${id}/`);
  },
  createProduct: async (data) => {
    return await baseApi.post('/admin/products/', data);
  },
  updateProduct: async (id, data) => {
    return await baseApi.put(`/admin/products/${id}/`, data);
  },
  deleteProduct: async (id) => {
    return await baseApi.delete(`/admin/products/${id}/`);
  },
  toggleProductFeatured: async (id) => {
    return await baseApi.post(`/admin/products/${id}/toggle_featured/`);
  },
  toggleProductActive: async (id) => {
    return await baseApi.post(`/admin/products/${id}/toggle_active/`);
  },

  getCategories: async (params = {}) => {
    return await baseApi.get('/admin/categories/', { params });
  },

  getVendors: async (params = {}) => {
    return await baseApi.get('/admin/vendors/', { params });
  },
  approveVendor: async (id) => {
    return await baseApi.post(`/admin/vendors/${id}/approve/`);
  },
  rejectVendor: async (id) => {
    return await baseApi.post(`/admin/vendors/${id}/reject/`);
  },

  getOrders: async (params = {}) => {
    return await baseApi.get('/admin/orders/', { params });
  },
  updateOrderStatus: async (id, status) => {
    return await baseApi.patch(`/admin/orders/${id}/update_status/`, { status });
  },

  getUsers: async (params = {}) => {
    return await baseApi.get('/admin/users/', { params });
  },
  getUserDetail: async (id) => {
    return await baseApi.get(`/admin/users/${id}/`);
  },
};