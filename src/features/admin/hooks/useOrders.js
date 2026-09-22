"use client";

import { useState, useEffect, useCallback } from "react";
import { adminApi } from "@/features/admin/api/adminApi";

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [count, setCount] = useState(0);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({
    search: "",
    status: "",
    payment_method: "",
    ordering: "-created_at",
    page: 1,
    page_size: 20,
  });

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== "" && v !== null && v !== undefined)
      );
      const res = await adminApi.getOrders(cleanParams);
      const d = res?.results !== undefined ? res : res?.data || res;
      setOrders(Array.isArray(d?.results) ? d.results : Array.isArray(d) ? d : []);
      setCount(d?.count || 0);
    } catch (err) {
      console.error("useOrders error:", err);
      setError(err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [params]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await adminApi.getOrdersStats();
      const d = res?.data !== undefined ? res.data : res;
      setStats(d);
    } catch (err) {
      console.error("fetchStats error:", err);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const updateParams = (newParams) => {
    setParams((prev) => ({ ...prev, ...newParams, page: newParams.page || 1 }));
  };

  const refetch = () => {
    fetchOrders();
    fetchStats();
  };

  return {
    orders, count, stats, loading, error, params, updateParams, refetch,
  };
}