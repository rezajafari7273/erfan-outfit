"use client";

import { useState, useEffect, useCallback } from "react";
import { adminApi } from "@/features/admin/api/adminApi";

export function useColors() {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({ search: "", page_size: 500 });

  const fetchColors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminApi.getColors(params);
      const d = res?.results !== undefined ? res : res?.data || res;
      setColors(Array.isArray(d?.results) ? d.results : Array.isArray(d) ? d : []);
    } catch (err) {
      console.error("useColors error:", err);
      setError(err);
      setColors([]);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  const updateParams = (newParams) => setParams((prev) => ({ ...prev, ...newParams }));

  return { colors, loading, error, params, updateParams, refetch: fetchColors };
}