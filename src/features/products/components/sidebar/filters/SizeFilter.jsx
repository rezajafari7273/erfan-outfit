"use client";

import React, { useState, useEffect } from "react";
import { productApi } from "@/features/products/api/productApi";

export default function SizeFilter({ onSizeChange }) {
  const [sizes, setSizes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSizes = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await productApi.getSizes();
        const list = Array.isArray(res) ? res : res?.results || [];
        setSizes(list);
      } catch (err) {
        console.error("خطا در دریافت سایزها:", err);
        setError("خطا در دریافت سایزها");
      } finally {
        setLoading(false);
      }
    };
    fetchSizes();
  }, []);

  const toggleSize = (sizeId) => {
    const updated = selectedSizes.includes(sizeId)
      ? selectedSizes.filter((s) => s !== sizeId)
      : [...selectedSizes, sizeId];

    setSelectedSizes(updated);

    if (onSizeChange) {
      onSizeChange(updated.length > 0 ? updated.join(",") : null);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-2 w-full">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-10 rounded-2xl bg-stone-100 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-xs text-rose-500 bg-rose-50 border border-rose-100 rounded-2xl p-3">
        {error}
      </div>
    );
  }

  if (sizes.length === 0) {
    return (
      <div className="text-xs text-stone-400 py-3 text-center">
        سایزی ثبت نشده است.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 w-full">
      {sizes.map((size) => {
        const isSelected = selectedSizes.includes(size.id);
        return (
          <button
            key={size.id}
            type="button"
            onClick={() => toggleSize(size.id)}
            className={`p-2.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
              isSelected
                ? "border-rose-900 bg-rose-950 text-white"
                : "border-stone-200 text-stone-600 hover:border-stone-300"
            }`}
          >
            {size.name}
          </button>
        );
      })}
    </div>
  );
}