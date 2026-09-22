"use client";

import { useState, useEffect, useCallback } from "react";
import { adminApi } from "@/features/admin/api/adminApi";

export function useVendors() {
  const [vendors, setVendors] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({
    search: "",
    kyc_status: "",
    is_official: "",
    is_featured: "",
    is_active: "",
    ordering: "-created_at",
    page: 1,
    page_size: 20,
  });

  const fetchVendors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== "" && v !== null && v !== undefined)
      );
      const res = await adminApi.getVendors(cleanParams);
      const d = res?.results !== undefined ? res : res?.data || res;
      setVendors(Array.isArray(d?.results) ? d.results : Array.isArray(d) ? d : []);
      setCount(d?.count || 0);
    } catch (err) {
      console.error("useVendors error:", err);
      setError(err);
      setVendors([]);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  const updateParams = (newParams) => {
    setParams((prev) => ({ ...prev, ...newParams, page: newParams.page || 1 }));
  };

  return { vendors, count, loading, error, params, updateParams, refetch: fetchVendors };
}