"use client";

import { useState, useEffect, useCallback } from "react";
import { adminApi } from "@/features/admin/api/adminApi";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({ search: "", page_size: 500 });

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminApi.getCategories(params);
      const d = res?.results !== undefined ? res : res?.data || res;
      setCategories(Array.isArray(d?.results) ? d.results : Array.isArray(d) ? d : []);
    } catch (err) {
      console.error("useCategories error:", err);
      setError(err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const updateParams = (newParams) => setParams((prev) => ({ ...prev, ...newParams }));

  return { categories, loading, error, params, updateParams, refetch: fetchCategories };
}