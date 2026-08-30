"use client";

import React from "react";

export default function ProductSliderBlock({ block }) {
  if (!block || !block.products) return null;

  return (
    <div className="my-8">
      {block.title && (
        <h2 className="text-xl font-bold text-gray-800 mb-4">{block.title}</h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {block.products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-full h-44 rounded-xl overflow-hidden mb-3">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-sm font-bold text-gray-800 truncate">{product.name}</h3>
            <span className="text-xs font-semibold text-amber-600 block mt-2">{product.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}