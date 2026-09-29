"use client";

import { useState, useEffect, useCallback } from "react";
import { adminApi } from "@/features/admin/api/adminApi";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({
    search: "",
    is_active: "",
    is_staff: "",
    is_superuser: "",
    is_2fa_enabled: "",
    is_locked: "",
    ordering: "-date_joined",
    page: 1,
    page_size: 20,
  });

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== "" && v !== null && v !== undefined)
      );
      const res = await adminApi.getUsers(cleanParams);
      const d = res?.results !== undefined ? res : res?.data || res;
      setUsers(Array.isArray(d?.results) ? d.results : Array.isArray(d) ? d : []);
      setCount(d?.count || 0);
    } catch (err) {
      console.error("useUsers error:", err);
      setError(err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [params]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await adminApi.getUsersStats();
      const d = res?.data !== undefined ? res.data : res;
      setStats(d);
    } catch (err) {
      console.error("fetchStats error:", err);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const updateParams = (newParams) => {
    setParams((prev) => ({ ...prev, ...newParams, page: newParams.page || 1 }));
  };

  const refetch = () => {
    fetchUsers();
    fetchStats();
  };

  return { users, count, stats, loading, error, params, updateParams, refetch };
}