"use client";

import React, { useState, useEffect } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { productApi } from "@/features/products/api/productApi";

export default function ColorFilter({ onColorChange }) {
  const [colors, setColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchColors = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await productApi.getColors();
        const list = Array.isArray(res) ? res : res?.results || [];
        setColors(list);
      } catch (err) {
        console.error("خطا در دریافت رنگ‌ها:", err);
        setError("خطا در دریافت رنگ‌ها");
      } finally {
        setLoading(false);
      }
    };
    fetchColors();
  }, []);

  const toggleColor = (colorId) => {
    const updated = selectedColors.includes(colorId)
      ? selectedColors.filter((c) => c !== colorId)
      : [...selectedColors, colorId];

    setSelectedColors(updated);

    if (onColorChange) {
      onColorChange(updated.length > 0 ? updated.join(",") : null);
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

  if (colors.length === 0) {
    return (
      <div className="text-xs text-stone-400 py-3 text-center">
        رنگی ثبت نشده است.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 w-full">
      {colors.map((color) => {
        const filterVal = color.id;
        const isSelected = selectedColors.includes(filterVal);
        const isWhite = color.hex_code?.toLowerCase() === "#ffffff";

        return (
          <button
            key={color.id || color.name}
            type="button"
            onClick={() => toggleColor(filterVal)}
            className={`flex items-center gap-2 p-2.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
              isSelected
                ? "border-rose-900 bg-rose-50/50 text-stone-900"
                : "border-stone-200 text-stone-600 hover:border-stone-300"
            }`}
          >
            <span
              className="w-4 h-4 rounded-full border border-stone-300 shadow-xs flex items-center justify-center shrink-0"
              style={{ backgroundColor: color.hex_code }}
            >
              {isSelected && (
                <CheckIcon
                  className={`w-3 h-3 ${
                    isWhite ? "text-stone-800" : "text-white"
                  }`}
                />
              )}
            </span>
            <span className="truncate">{color.name}</span>
          </button>
        );
      })}
    </div>
  );
}