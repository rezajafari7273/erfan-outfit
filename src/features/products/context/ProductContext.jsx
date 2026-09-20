"use client";

import { createContext, useState, useCallback, useEffect } from "react";
import { productApi } from "../api/productApi";

export const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [filters, setFilters] = useState({
    page: 1,
    category: "",
    colors: "",
    sizes: "",
    search: "",
    ordering: "",
    price_min: "",
    price_max: "",
    season: "",
    style: "",
    gender: "",
    featured: false,
  });

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await productApi.getCategories();
      const list = Array.isArray(data) ? data : data?.results || [];
      setCategories(list);
      return list;
    } catch (err) {
      console.error("خطا در دریافت دسته‌بندی‌ها:", err);
    }
  }, []);

  const fetchProducts = useCallback(
    async (customFilters = {}) => {
      const queryParams = { ...filters, ...customFilters };
      const isFirstPage = queryParams.page === 1 || !queryParams.page;

      if (isFirstPage) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      try {
        const cleanParams = {};
        Object.keys(queryParams).forEach((key) => {
          const val = queryParams[key];
          if (val !== "" && val !== null && val !== undefined && val !== false) {
            cleanParams[key] = val;
          }
        });

        const data = await productApi.getProducts(cleanParams);

        if (Array.isArray(data)) {
          setProducts(data);
          setProductsCount(data.length);
          setHasMore(false);
        } else {
          const results = data?.results || [];
          const count = data?.count || 0;
          setProductsCount(count);

          if (isFirstPage) {
            setProducts(results);
          } else {
            // الحاق به محصولات قبلی
            setProducts((prev) => [...prev, ...results]);
          }

          // بررسی وجود صفحه بعدی در پاسخ DRF
          setHasMore(Boolean(data?.next));
        }
      } catch (err) {
        setError(err || "خطا در دریافت لیست محصولات");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [filters]
  );

  const updateFilters = (newFilters) => {
    setFilters((prev) => {
      const next = { ...prev, ...newFilters, page: newFilters.page || 1 };
      return next;
    });
  };

  const loadMore = () => {
    if (!loadingMore && !loading && hasMore) {
      updateFilters({ page: (filters.page || 1) + 1 });
    }
  };

  const resetFilters = () => {
    setFilters({
      page: 1,
      category: "",
      colors: "",
      sizes: "",
      search: "",
      ordering: "",
      price_min: "",
      price_max: "",
      season: "",
      style: "",
      gender: "",
      featured: false,
    });
  };

  const fetchProductDetail = useCallback(async (slug) => {
    setLoading(true);
    setError(null);
    try {
      const data = await productApi.getProductBySlug(slug);
      setSelectedProduct(data);
      return data;
    } catch (err) {
      setError(err || "خطا در دریافت جزئیات محصول");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const submitReview = async (slug, payload) => {
    try {
      return await productApi.submitProductReview(slug, payload);
    } catch (err) {
      throw err;
    }
  };

  const submitQuestion = async (slug, payload) => {
    try {
      return await productApi.submitProductQuestion(slug, payload);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProductContext.Provider
      value={{
        categories,
        products,
        productsCount,
        selectedProduct,
        filters,
        loading,
        loadingMore,
        hasMore,
        error,
        fetchCategories,
        fetchProducts,
        fetchProductDetail,
        updateFilters,
        resetFilters,
        loadMore,
        submitReview,
        submitQuestion,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}