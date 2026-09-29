"use client";

import { useState, useEffect } from "react";
import { adminApi } from "@/features/admin/api/adminApi";

export function useCatalog() {
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [landings, setLandings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const results = await Promise.allSettled([
        adminApi.getCategories({ page_size: 500 }),
        adminApi.getColors({ page_size: 500 }),
        adminApi.getSizes({ page_size: 500 }),
        adminApi.getVendors({ page_size: 500 }),
        adminApi.getProducts({ page_size: 500 }),
        adminApi.getLandings({ page_size: 500 }),
      ]);

      const pick = (res) => {
        if (res.status !== "fulfilled") return [];
        const d = res.value?.results !== undefined ? res.value : res.value?.data || res.value;
        return Array.isArray(d?.results) ? d.results : Array.isArray(d) ? d : [];
      };

      setCategories(pick(results[0]));
      setColors(pick(results[1]));
      setSizes(pick(results[2]));
      setVendors(pick(results[3]));
      setProducts(pick(results[4]));
      setLandings(pick(results[5]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return { categories, colors, sizes, vendors, products, landings, loading, refetch: fetchAll };
}