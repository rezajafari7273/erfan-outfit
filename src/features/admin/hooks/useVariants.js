"use client";

import { useState, useEffect, useCallback } from "react";
import { adminApi } from "@/features/admin/api/adminApi";

export function useVariants() {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({
    search: "",
    ordering: "-id",
    page: 1,
    page_size: 30,
  });
  const [count, setCount] = useState(0);

  const fetchVariants = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminApi.getVariants(params);
      const d = res?.results !== undefined ? res : res?.data || res;
      setVariants(Array.isArray(d?.results) ? d.results : Array.isArray(d) ? d : []);
      setCount(d?.count || 0);
    } catch (err) {
      console.error("useVariants error:", err);
      setError(err);
      setVariants([]);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchVariants();
  }, [fetchVariants]);

  const updateParams = (newParams) => setParams((prev) => ({ ...prev, ...newParams }));

  return { variants, count, loading, error, params, updateParams, refetch: fetchVariants };
}