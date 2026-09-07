"use client";

import React, { useState } from "react";

export default function CategoryFilter({ categories = [], onCategoryChange }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const defaultCategories = categories.length > 0 ? categories : [
    { id: "all", name: "همه محصولات", count: 120 },
    { id: "hoodie", name: "هودی و دورس", count: 45 },
    { id: "jacket", name: "کاپشن و پالتو", count: 32 },
    { id: "pants", name: "شلوار", count: 28 },
    { id: "tshirt", name: "تیشرت و پولوشرت", count: 15 },
  ];

  const handleSelect = (id) => {
    setSelectedCategory(id);
    if (onCategoryChange) onCategoryChange(id);
  };

  return (
    <div className="space-y-1 w-full">
      {defaultCategories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => handleSelect(cat.id)}
          className={`w-full flex items-center justify-between py-2.5 px-3.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            selectedCategory === cat.id
              ? "bg-rose-950 text-white shadow-md shadow-rose-950/20"
              : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          <span>{cat.name}</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full ${
            selectedCategory === cat.id ? "bg-white/20 text-white" : "bg-stone-100 text-stone-400"
          }`}>
            {cat.count}
          </span>
        </button>
      ))}
    </div>
  );
}