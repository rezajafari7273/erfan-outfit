"use client";

import React, { useState } from "react";

export default function PriceFilter({ min = 0, max = 3000000, onPriceChange }) {
  const [price, setPrice] = useState(max);

  const handleChange = (e) => {
    const value = Number(e.target.value);
    setPrice(value);
    if (onPriceChange) onPriceChange(value);
  };

  return (
    <div className="space-y-4 py-2 w-full">
      <input
        type="range"
        min={min}
        max={max}
        step={50000}
        value={price}
        onChange={handleChange}
        className="w-full accent-rose-900 h-2 bg-stone-200 rounded-lg cursor-pointer"
      />
      <div className="flex items-center justify-between text-xs font-bold text-stone-600">
        <span>تا:</span>
        <div className="flex items-center gap-1 text-stone-900">
          <span className="text-base font-black">{price.toLocaleString("fa-IR")}</span>
          <span className="text-[11px] text-stone-500">تومان</span>
        </div>
      </div>
    </div>
  );
}