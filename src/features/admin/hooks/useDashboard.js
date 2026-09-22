"use client";

import { useState, useEffect, useCallback } from "react";
import { adminApi } from "@/features/admin/api/adminApi";

export function useDashboard() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [salesChart, setSalesChart] = useState({ points: [], total_revenue: 0, total_orders: 0 });
  const [chartRange, setChartRange] = useState("7d");
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminApi.getFullDashboard();
      const d = res?.data !== undefined ? res.data : res;
      setStats(d?.stats || null);
      setRecentOrders(d?.recent_orders || []);
      setTopProducts(d?.top_products || []);
      setLowStock(d?.low_stock || []);
      setRecentUsers(d?.recent_users || []);
      setRecentTransactions(d?.recent_transactions || []);
      setSalesChart(d?.sales_chart_7d || { points: [], total_revenue: 0, total_orders: 0 });
    } catch (err) {
      console.error("useDashboard error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchChart = useCallback(async (range) => {
    try {
      setChartLoading(true);
      const res = await adminApi.getSalesChart(range);
      const d = res?.data !== undefined ? res.data : res;
      setSalesChart(d || { points: [], total_revenue: 0, total_orders: 0 });
    } catch (err) {
      console.error("fetchChart error:", err);
    } finally {
      setChartLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    if (chartRange !== "7d") {
      fetchChart(chartRange);
    }
  }, [chartRange, fetchChart]);

  return {
    stats,
    recentOrders,
    topProducts,
    lowStock,
    recentUsers,
    recentTransactions,
    salesChart,
    chartRange,
    setChartRange,
    loading,
    chartLoading,
    error,
    refetch: fetchAll,
  };
}