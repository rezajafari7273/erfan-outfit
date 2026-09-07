"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function FilterAccordion({ title, icon: Icon, children, defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-4 border border-stone-200 shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-stone-800 font-bold text-sm cursor-pointer"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-rose-900" />}
          <span>{title}</span>
        </div>
        <ChevronDownIcon
          className={`w-4 h-4 text-stone-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
}