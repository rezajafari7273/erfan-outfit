"use client";

import { useState, useEffect, useCallback } from "react";
import { adminApi } from "@/features/admin/api/adminApi";

export function usePromotions() {
  const [promotions, setPromotions] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState({ search: "" });

  const pick = (res) => {
    if (res.status !== "fulfilled") return [];
    const d = res.value?.results !== undefined ? res.value : res.value?.data || res.value;
    return Array.isArray(d?.results) ? d.results : Array.isArray(d) ? d : [];
  };

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      const clean = Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== ""));
      const results = await Promise.allSettled([
        adminApi.getPromotions(clean),
        adminApi.getCoupons(clean),
      ]);
      setPromotions(pick(results[0]));
      setCoupons(pick(results[1]));
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const updateParams = (newParams) => setParams((prev) => ({ ...prev, ...newParams }));

  return { promotions, coupons, loading, params, updateParams, refetch: fetchAll };
}