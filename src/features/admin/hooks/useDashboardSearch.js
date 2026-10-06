"use client";

import { useState, useMemo, useEffect } from "react";
import { useDashboard } from "./useDashboard";
import { useProducts } from "./useProducts";
import { useOrders } from "./useOrders";
import { useUsers } from "./useUsers";

export function useDashboardSearch(options = { mode: "client" }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // دیلاونس برای سرچ آرام‌تر
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm.trim());
    }, 250);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // ۱. دریافت داده‌های اولیه داشبورد
  const dashboard = useDashboard();

  // ۲. هوک‌های جانبی برای سرچ جامع در صورت نیاز به حالت server
  const productSearch = useProducts({ search: debouncedTerm });
  const orderSearch = useOrders();
  const userSearch = useUsers();

  useEffect(() => {
    if (options.mode === "server" && debouncedTerm) {
      orderSearch.updateParams({ search: debouncedTerm });
      userSearch.updateParams({ search: debouncedTerm });
    }
  }, [debouncedTerm, options.mode]);

  /* -------------------------------------------------------------------------- */
  /*                      منطق فیلتر فوق‌العاده انعطاف‌پذیر فرانت                  */
  /* -------------------------------------------------------------------------- */
  const clientFilteredResults = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return { products: [], orders: [], users: [], totalCount: 0 };
    }

    const {
      topProducts = [],
      lowStock = [],
      recentOrders = [],
      recentUsers = [],
    } = dashboard;

    // ۱. فیلتر جامع محصولات (ادغام topProducts و lowStock بدون تکرار)
    const allProducts = Array.from(
      new Map([...topProducts, ...lowStock].map((p) => [p.id || p.sku, p])).values()
    );

    const filteredProducts = allProducts.filter((p) => {
      const name = (p.name || p.title || p.product_name || "").toLowerCase();
      const sku = (p.sku || p.code || "").toLowerCase();
      const category = (p.category_name || p.category?.name || "").toLowerCase();
      
      return name.includes(term) || sku.includes(term) || category.includes(term);
    });

    // ۲. فیلتر جامع سفارشات
    const filteredOrders = recentOrders.filter((o) => {
      const id = String(o.id || o.order_id || "");
      const orderNumber = String(o.order_number || o.code || "").toLowerCase();
      const customerName = (
        o.customer_name ||
        o.user_fullname ||
        `${o.user?.first_name || ""} ${o.user?.last_name || ""}` ||
        o.user?.username ||
        ""
      ).toLowerCase();
      const status = (o.status_display || o.status || "").toLowerCase();

      return (
        id.includes(term) ||
        orderNumber.includes(term) ||
        customerName.includes(term) ||
        status.includes(term)
      );
    });

    // ۳. فیلتر جامع کاربران
    const filteredUsers = recentUsers.filter((u) => {
      const name = (
        u.name ||
        u.full_name ||
        `${u.first_name || ""} ${u.last_name || ""}`
      ).toLowerCase();
      const username = (u.username || "").toLowerCase();
      const email = (u.email || "").toLowerCase();
      const phone = String(u.phone_number || u.mobile || u.phone || "");

      return (
        name.includes(term) ||
        username.includes(term) ||
        email.includes(term) ||
        phone.includes(term)
      );
    });

    return {
      products: filteredProducts,
      orders: filteredOrders,
      users: filteredUsers,
      totalCount:
        filteredProducts.length + filteredOrders.length + filteredUsers.length,
    };
  }, [searchTerm, dashboard]);

  const isServerMode = options.mode === "server";

  return {
    ...dashboard,
    searchTerm,
    setSearchTerm,
    isSearching: Boolean(searchTerm.trim()),
    searchResults: isServerMode
      ? {
          products: productSearch.products,
          orders: orderSearch.orders,
          users: userSearch.users,
          totalCount:
            (productSearch.products?.length || 0) +
            (orderSearch.orders?.length || 0) +
            (userSearch.users?.length || 0),
        }
      : clientFilteredResults,
    searchLoading: isServerMode
      ? productSearch.loading || orderSearch.loading || userSearch.loading
      : false,
  };
}