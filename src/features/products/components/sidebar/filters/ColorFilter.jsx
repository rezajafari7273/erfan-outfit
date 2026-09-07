"use client";

import React, { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function ColorFilter({ colors = [], onColorChange }) {
  const [selectedColors, setSelectedColors] = useState([]);

  const defaultColors = colors.length > 0 ? colors : [
    { id: "black", name: "مشکی", code: "#000000" },
    { id: "white", name: "سفید", code: "#ffffff" },
    { id: "green", name: "سبز", code: "#2a9d8f" },
    { id: "blue", name: "آبی", code: "#0077b6" },
    { id: "orange", name: "نارنجی", code: "#f4a261" },
    { id: "purple", name: "بنفش", code: "#7209b7" },
  ];

  const toggleColor = (id) => {
    const updated = selectedColors.includes(id)
      ? selectedColors.filter((c) => c !== id)
      : [...selectedColors, id];

    setSelectedColors(updated);
    if (onColorChange) onColorChange(updated);
  };

  return (
    <div className="grid grid-cols-3 gap-2 w-full">
      {defaultColors.map((color) => {
        const isSelected = selectedColors.includes(color.id);
        return (
          <button
            key={color.id}
            type="button"
            onClick={() => toggleColor(color.id)}
            className={`flex items-center gap-2 p-2.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
              isSelected
                ? "border-rose-900 bg-rose-50/50 text-stone-900"
                : "border-stone-200 text-stone-600 hover:border-stone-300"
            }`}
          >
            <span
              className="w-4 h-4 rounded-full border border-stone-300 shadow-xs flex items-center justify-center shrink-0"
              style={{ backgroundColor: color.code }}
            >
              {isSelected && (
                <CheckIcon className={`w-3 h-3 ${color.code === "#ffffff" ? "text-stone-800" : "text-white"}`} />
              )}
            </span>
            <span className="truncate">{color.name}</span>
          </button>
        );
      })}
    </div>
  );
}