"use client";

import { useCallback, useEffect, useState } from "react";
import { cartApi } from "../api/cartApi";

export function useCart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const fetchCart = useCallback(async () => {
  setLoading(true);
  setError(null);
  try {
    const data = await cartApi.getCart();
    setCart(data);
    if (typeof window !== "undefined" && data?.session_key && !data?.user) {
      localStorage.setItem("guestSessionKey", data.session_key);
    }
    return data;
  } catch (err) {
    console.error("[useCart] fetch error:", err);
    setError("خطا در دریافت سبد خرید");
    return null;
  } finally {
    setLoading(false);
  }
}, []);

  const dispatchCartUpdate = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cart:updated"));
    }
  };

  const addItem = useCallback(
    async (payload) => {
      const result = await cartApi.addItem(payload);
      await fetchCart();
      dispatchCartUpdate();
      return result;
    },
    [fetchCart]
  );

  const updateItem = useCallback(
    async (itemId, quantity) => {
      const result = await cartApi.updateItem(itemId, quantity);
      await fetchCart();
      dispatchCartUpdate();
      return result;
    },
    [fetchCart]
  );

  const removeItem = useCallback(
    async (itemId) => {
      const result = await cartApi.removeItem(itemId);
      await fetchCart();
      dispatchCartUpdate();
      return result;
    },
    [fetchCart]
  );

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    const onUpdate = () => fetchCart();
    window.addEventListener("cart:updated", onUpdate);
    return () => window.removeEventListener("cart:updated", onUpdate);
  }, [fetchCart]);

  const items = Array.isArray(cart?.items) ? cart.items : [];

  const totalItemsCount = items.reduce(
    (acc, item) => acc + (item.quantity || 0),
    0
  );

  const finalPrice = items.reduce(
    (acc, item) => acc + Number(item.final_price || 0),
    0
  );

  return {
    cart,
    items,
    totalItemsCount,
    finalPrice,
    loading,
    error,
    fetchCart,
    addItem,
    updateItem,
    removeItem,
  };
}