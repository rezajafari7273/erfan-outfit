"use client";

import React, { useState } from "react";
import {
  TagIcon,
  SwatchIcon,
  CurrencyDollarIcon,
  AdjustmentsHorizontalIcon,
  Squares2X2Icon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";

// ایمپورت کامپوننت‌های پایه
import FilterAccordion from "./FilterAccordion";
import BottomSheet from "./BottomSheet";
import CategoryFilter from "./filters/CategoryFilter";
import ColorFilter from "./filters/ColorFilter";
import PriceFilter from "./filters/PriceFilter";
import SizeFilter from "./filters/SizeFilter";
import VideoPlayerWidget from "./VideoPlayerWidget";

export default function Sidebar({
  activeVideo,
  onCloseVideo,
  onCategoryChange,
  onColorChange,
  onPriceChange,
  onSizeChange,
  currentSort = "newest",
  onSortChange,
}) {
  // مدیریت وضعیت باتن‌شیت‌های موبایل
  const [activeSheet, setActiveSheet] = useState(null); // null | 'all' | 'sort' | 'category' | 'color' | 'price' | 'size'

  // عناوین باتن‌شیت‌ها
  const sheetTitles = {
    all: "همه فیلترها",
    sort: "مرتب‌سازی محصولات",
    category: "انتخاب دسته‌بندی",
    color: "انتخاب رنگ",
    price: "محدوده قیمت",
    size: "انتخاب سایز",
  };

  const sortOptions = [
    { id: "newest", label: "جدیدترین" },
    { id: "popular", label: "محبوب‌ترین" },
    { id: "bestselling", label: "پرفروش‌ترین" },
    { id: "cheapest", label: "ارزان‌ترین" },
    { id: "expensive", label: "گران‌ترین" },
  ];

  return (
    <>
      {/* ========================================== */}
      {/* ۱. حالت دسکتاپ (فقط در lg به بالا) */}
      {/* ========================================== */}
      <aside className="hidden lg:flex flex-col gap-4 w-72 shrink-0">
        <VideoPlayerWidget activeVideo={activeVideo} onCloseVideo={onCloseVideo} />

        <FilterAccordion title="دسته‌بندی‌ها" icon={TagIcon}>
          <CategoryFilter onCategoryChange={onCategoryChange} />
        </FilterAccordion>

        <FilterAccordion title="محدوده قیمت" icon={CurrencyDollarIcon}>
          <PriceFilter onPriceChange={onPriceChange} />
        </FilterAccordion>

        <FilterAccordion title="انتخاب رنگ" icon={SwatchIcon}>
          <ColorFilter onColorChange={onColorChange} />
        </FilterAccordion>

        <FilterAccordion title="انتخاب سایز" icon={Squares2X2Icon}>
          <SizeFilter onSizeChange={onSizeChange} />
        </FilterAccordion>
      </aside>

      {/* ========================================== */}
      {/* ۲. حالت موبایل (تک ردیف اسکرولی با دکمه‌های کپسولی) */}
      {/* ========================================== */}
      <div className="lg:hidden w-full ">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 px-1 no-scrollbar scroll-smooth">
          
          {/* ۱. دکمه فیلترها */}
          <button
            type="button"
            onClick={() => setActiveSheet("all")}
            className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white rounded-full text-xs font-bold shrink-0 shadow-xs cursor-pointer active:scale-95 transition-transform"
          >
            <AdjustmentsHorizontalIcon className="w-4 h-4 text-white" />
            <span>فیلترها</span>
          </button>

          {/* ۲. دکمه مرتب‌سازی */}
          <button
            type="button"
            onClick={() => setActiveSheet("sort")}
            className="flex items-center gap-1.5 px-4 py-2 bg-white text-stone-800 border border-stone-200 rounded-full text-xs font-bold shrink-0 shadow-xs cursor-pointer active:scale-95 transition-transform"
          >
            <ArrowsUpDownIcon className="w-4 h-4 text-rose-600" />
            <span>مرتب‌سازی</span>
          </button>

          {/* ۳. دکمه‌های تکی (پشت سر هم) */}
          <button
            type="button"
            onClick={() => setActiveSheet("category")}
            className="px-4 py-2 bg-white text-stone-700 border border-stone-200 rounded-full text-xs font-medium shrink-0 shadow-xs cursor-pointer active:scale-95 transition-transform"
          >
            دسته‌بندی
          </button>

          <button
            type="button"
            onClick={() => setActiveSheet("color")}
            className="px-4 py-2 bg-white text-stone-700 border border-stone-200 rounded-full text-xs font-medium shrink-0 shadow-xs cursor-pointer active:scale-95 transition-transform"
          >
            رنگ‌ها
          </button>

          <button
            type="button"
            onClick={() => setActiveSheet("price")}
            className="px-4 py-2 bg-white text-stone-700 border border-stone-200 rounded-full text-xs font-medium shrink-0 cursor-pointer active:scale-95 transition-transform"
          >
            قیمت
          </button>

          <button
            type="button"
            onClick={() => setActiveSheet("size")}
            className="px-4 py-2 bg-white text-stone-700 border border-stone-200 rounded-full text-xs font-medium shrink-0 shadow-xs cursor-pointer active:scale-95 transition-transform"
          >
            سایز
          </button>

        </div>

        {/* ========================================== */}
        {/* ۳. باتن‌شیت کشویی موبایل */}
        {/* ========================================== */}
        <BottomSheet
          isOpen={activeSheet !== null}
          onClose={() => setActiveSheet(null)}
          title={sheetTitles[activeSheet]}
        >
          {/* حالت ۱: همه فیلترها (آکاردئونی) */}
          {activeSheet === "all" && (
            <div className="space-y-4">
              <FilterAccordion title="دسته‌بندی‌ها" icon={TagIcon}>
                <CategoryFilter onCategoryChange={onCategoryChange} />
              </FilterAccordion>

              <FilterAccordion title="محدوده قیمت" icon={CurrencyDollarIcon}>
                <PriceFilter onPriceChange={onPriceChange} />
              </FilterAccordion>

              <FilterAccordion title="انتخاب رنگ" icon={SwatchIcon}>
                <ColorFilter onColorChange={onColorChange} />
              </FilterAccordion>

              <FilterAccordion title="انتخاب سایز" icon={Squares2X2Icon}>
                <SizeFilter onSizeChange={onSizeChange} />
              </FilterAccordion>
            </div>
          )}

          {/* حالت ۲: انتخاب مرتب‌سازی */}
          {activeSheet === "sort" && (
            <div className="space-y-1">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    if (onSortChange) onSortChange(option.id);
                    setActiveSheet(null);
                  }}
                  className={`w-full text-right py-3 px-4 rounded-2xl text-xs font-bold transition-colors ${
                    currentSort === option.id
                      ? "bg-rose-50 text-rose-600"
                      : "text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {/* حالت‌های تکی (بدون آکاردئون) */}
          {activeSheet === "category" && <CategoryFilter onCategoryChange={onCategoryChange} />}
          {activeSheet === "color" && <ColorFilter onColorChange={onColorChange} />}
          {activeSheet === "price" && <PriceFilter onPriceChange={onPriceChange} />}
          {activeSheet === "size" && <SizeFilter onSizeChange={onSizeChange} />}
        </BottomSheet>
      </div>
    </>
  );
}