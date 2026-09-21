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

  const fetchProducts = useCallback(async (targetFilters) => {
    const isFirstPage = !targetFilters.page || Number(targetFilters.page) === 1;

    if (isFirstPage) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    setError(null);

    try {
      const cleanParams = {};
      Object.keys(targetFilters).forEach((key) => {
        const val = targetFilters[key];
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
          setProducts((prev) => [...prev, ...results]);
        }

        setHasMore(Boolean(data?.next));
      }
    } catch (err) {
      console.error("خطا در دریافت لیست محصولات:", err);
      setError(err || "خطا در دریافت لیست محصولات");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => {
      const isPageOnlyChange = Object.keys(newFilters).length === 1 && "page" in newFilters;
      const updatedPage = isPageOnlyChange ? (newFilters.page || 1) : 1;

      const nextFilters = {
        ...prev,
        ...newFilters,
        page: updatedPage,
      };

      fetchProducts(nextFilters);
      return nextFilters;
    });
  }, [fetchProducts]);

  const loadMore = useCallback(() => {
    if (!loadingMore && !loading && hasMore) {
      updateFilters({ page: (filters.page || 1) + 1 });
    }
  }, [loadingMore, loading, hasMore, filters.page, updateFilters]);

  const resetFilters = useCallback(() => {
    const initialFilters = {
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
    };
    setFilters(initialFilters);
    fetchProducts(initialFilters);
  }, [fetchProducts]);

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
    return await productApi.submitProductReview(slug, payload);
  };

  const submitQuestion = async (slug, payload) => {
    return await productApi.submitProductQuestion(slug, payload);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts(filters);
  }, []);

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