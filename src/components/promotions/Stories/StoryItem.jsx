// components/promotion/Stories/StoryItem.jsx
"use client";

import React from "react";

export function StoryItem({ item, onSelect }) {
  if (!item) return null;

  return (
    <button
      onClick={() => onSelect(item)}
      className="flex flex-col items-center gap-2 group min-w-[76px] focus:outline-none cursor-pointer"
    >
      {/* رینگ دور استوری با گرادیانت مدرن شامل رنگ primary */}
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-primary via-orange-500 to-primary group-hover:scale-103 transition-transform duration-300 shadow-sm">
        <div className="w-full h-full p-0.5 bg-white rounded-full">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
      
      <span className="text-xs font-semibold text-gray-700 group-hover:text-primary transition-colors truncate max-w-[80px] text-center">
        {item.title}
      </span>
    </button>
  );
}