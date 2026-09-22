"use client";

import { useState, useEffect, useCallback } from "react";
import { adminApi } from "@/features/admin/api/adminApi";

export function useProducts(initialParams = {}) {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({
    search: "",
    ordering: "-created_at",
    page: 1,
    ...initialParams,
  });

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminApi.getProducts(params);
      const data = res?.results !== undefined ? res : res?.data || res;
      setProducts(
        Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : []
      );
      setCount(data?.count || 0);
    } catch (err) {
      console.error("useProducts error:", err);
      setError(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateParams = (newParams) => {
    setParams((prev) => ({ ...prev, ...newParams, page: newParams.page || 1 }));
  };

  const refetch = () => fetchProducts();

  return { products, count, loading, error, params, updateParams, refetch };
}