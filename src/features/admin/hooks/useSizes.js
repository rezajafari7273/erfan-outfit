"use client";

import { useState, useEffect, useCallback } from "react";
import { adminApi } from "@/features/admin/api/adminApi";

export function useSizes() {
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({ search: "", page_size: 500 });

  const fetchSizes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminApi.getSizes(params);
      const d = res?.results !== undefined ? res : res?.data || res;
      setSizes(Array.isArray(d?.results) ? d.results : Array.isArray(d) ? d : []);
    } catch (err) {
      console.error("useSizes error:", err);
      setError(err);
      setSizes([]);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchSizes();
  }, [fetchSizes]);

  const updateParams = (newParams) => setParams((prev) => ({ ...prev, ...newParams }));

  return { sizes, loading, error, params, updateParams, refetch: fetchSizes };
}