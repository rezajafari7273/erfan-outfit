"use client";

import React, { useState, useEffect } from "react";
import { productApi } from "@/features/products/api/productApi";

export default function CategoryFilter({ selectedCategorySlug, onCategoryChange }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // مقدار انتخابی فعلی بر اساس Slug دریافتی از والد
  const [selectedSlug, setSelectedSlug] = useState(selectedCategorySlug || null);

  useEffect(() => {
    setSelectedSlug(selectedCategorySlug || null);
  }, [selectedCategorySlug]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await productApi.getCategories();
        const list = Array.isArray(res) ? res : res?.results || [];
        setCategories(list);
      } catch (err) {
        console.error("خطا در دریافت دسته‌بندی‌ها:", err);
        setError("خطا در دریافت دسته‌بندی‌ها");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSelect = (slug) => {
    setSelectedSlug(slug);
    if (onCategoryChange) onCategoryChange(slug);
  };

  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-full h-10 rounded-2xl bg-stone-100 animate-pulse" />
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

  return (
    <div className="space-y-1 w-full">
      {/* دکمه «همه محصولات» */}
      <button
        type="button"
        onClick={() => handleSelect(null)}
        className={`w-full flex items-center justify-between py-2.5 px-3.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
          !selectedSlug
            ? "bg-rose-950 text-white shadow-md shadow-rose-950/20"
            : "text-stone-600 hover:bg-stone-100"
        }`}
      >
        <span>همه محصولات</span>
      </button>

      {/* دسته‌بندی‌ها */}
      {categories.map((cat) => {
        const isSelected = selectedSlug === cat.slug;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleSelect(cat.slug)}
            className={`w-full flex items-center justify-between py-2.5 px-3.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              isSelected
                ? "bg-rose-950 text-white shadow-md shadow-rose-950/20"
                : "text-stone-600 hover:bg-stone-100"
            }`}
          >
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}