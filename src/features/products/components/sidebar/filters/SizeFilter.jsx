"use client";

import React, { useState } from "react";

export default function SizeFilter({ sizes = [], onSizeChange }) {
  const [selectedSize, setSelectedSize] = useState(null);

  const defaultSizes = sizes.length > 0 ? sizes : ["S", "M", "L", "XL", "2XL", "3XL"];

  const handleSelect = (size) => {
    setSelectedSize(size);
    if (onSizeChange) onSizeChange(size);
  };

  return (
    <div className="grid grid-cols-3 gap-2 w-full">
      {defaultSizes.map((size) => (
        <button
          key={size}
          type="button"
          onClick={() => handleSelect(size)}
          className={`p-2.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
            selectedSize === size
              ? "border-rose-900 bg-rose-950 text-white"
              : "border-stone-200 text-stone-600 hover:border-stone-300"
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
}