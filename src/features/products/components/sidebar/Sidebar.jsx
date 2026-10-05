"use client";

import React, { useState } from "react";
import {
  TagIcon,
  SwatchIcon,
  CurrencyDollarIcon,
  AdjustmentsHorizontalIcon,
  Squares2X2Icon,
  ArrowsUpDownIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import FilterAccordion from "./FilterAccordion";
import BottomSheet from "./BottomSheet";
import CategoryFilter from "./filters/CategoryFilter";
import ColorFilter from "./filters/ColorFilter";
import PriceFilter from "./filters/PriceFilter";
import SizeFilter from "./filters/SizeFilter";
import VideoPlayerWidget from "./VideoPlayerWidget";

const SORT_OPTIONS = [
  { id: "newest", label: "جدیدترین" },
  { id: "cheapest", label: "ارزان‌ترین" },
  { id: "expensive", label: "گران‌ترین" },
  { id: "bestselling", label: "پرفروش‌ترین" },
];

export default function Sidebar({
  filters = {},
  activeVideo,
  onCloseVideo,
  currentSort = "newest",
  onSortChange,
  onCategoryChange,
  onColorChange,
  onPriceChange,
  onSizeChange,
  onResetFilters,
}) {
  const [activeSheet, setActiveSheet] = useState(null);

  const sheetTitles = {
    all: "همه فیلترها",
    sort: "مرتب‌‌سازی محصولات",
    category: "انتخاب دسته‌بندی",
    color: "انتخاب رنگ",
    price: "محدوده قیمت",
    size: "انتخاب سایز",
  };

  // بررسی فعال بودن حداقل یک فیلتر بر اساس منطق دقیق نمونه داده‌شده
  const hasActiveFilters = Boolean(
    filters.category ||
      filters.colors ||
      filters.sizes ||
      filters.price_min ||
      filters.price_max
  );

  return (
    <>
      {/* ========================================== */}
      {/* ۱. سایدبار دسکتاپ (حفظ کامل ظاهر اولیه) */}
      {/* ========================================== */}
      <aside className="hidden lg:flex flex-col gap-4 w-72 shrink-0">
        <VideoPlayerWidget activeVideo={activeVideo} onCloseVideo={onCloseVideo} />

        {/* دکمه پاک‌سازی فیلترها */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-2xl text-xs font-bold transition-colors cursor-pointer"
          >
            <TrashIcon className="w-4 h-4" />
            <span>پاک‌سازی همه فیلترها</span>
          </button>
        )}

        <FilterAccordion title="دسته‌بندی‌ها" icon={TagIcon}>
          <CategoryFilter
            selectedCategorySlug={filters.category}
            onCategoryChange={onCategoryChange}
          />
        </FilterAccordion>

        <FilterAccordion title="محدوده قیمت" icon={CurrencyDollarIcon}>
          <PriceFilter
            selectedPrice={filters.price}
            onPriceChange={onPriceChange}
          />
        </FilterAccordion>

        <FilterAccordion title="انتخاب رنگ" icon={SwatchIcon}>
          <ColorFilter
            selectedColors={filters.colors}
            onColorChange={onColorChange}
          />
        </FilterAccordion>

        <FilterAccordion title="انتخاب سایز" icon={Squares2X2Icon}>
          <SizeFilter
            selectedSizes={filters.sizes}
            onSizeChange={onSizeChange}
          />
        </FilterAccordion>
      </aside>

      {/* ========================================== */}
      {/* ۲. بخش موبایل (حفظ کامل نوار دکمه‌ها و BottomSheet) */}
      {/* ========================================== */}
      <div className="lg:hidden w-full">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 px-1 no-scrollbar scroll-smooth">
          {/* دکمه همه فیلترها */}
          <button
            type="button"
            onClick={() => setActiveSheet("all")}
            className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white rounded-full text-xs font-bold shrink-0 shadow-xs cursor-pointer active:scale-95 transition-transform"
          >
            <AdjustmentsHorizontalIcon className="w-4 h-4 text-white" />
            <span>فیلترها</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>

          {/* دکمه مرتب‌سازی */}
          <button
            type="button"
            onClick={() => setActiveSheet("sort")}
            className="flex items-center gap-1.5 px-4 py-2 bg-white text-stone-800 border border-stone-200 rounded-full text-xs font-bold shrink-0 shadow-xs cursor-pointer active:scale-95 transition-transform"
          >
            <ArrowsUpDownIcon className="w-4 h-4 text-rose-600" />
            <span>مرتب‌سازی</span>
          </button>

          {/* دکمه حذف فیلترها در صورت وجود فیلتر فعال */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="flex items-center gap-1 px-3 py-2 bg-rose-50 text-rose-600 border border-rose-200 rounded-full text-xs font-bold shrink-0 shadow-xs cursor-pointer active:scale-95 transition-transform"
            >
              <TrashIcon className="w-3.5 h-3.5" />
              <span>حذف فیلترها</span>
            </button>
          )}

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
            className="px-4 py-2 bg-white text-stone-700 border border-stone-200 rounded-full text-xs font-medium shrink-0 shadow-xs cursor-pointer active:scale-95 transition-transform"
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
        {/* ۳. کشوی BottomSheet موبایل */}
        {/* ========================================== */}
        <BottomSheet
          isOpen={activeSheet !== null}
          onClose={() => setActiveSheet(null)}
          title={sheetTitles[activeSheet] || ""}
        >
          {/* حالت ۱: نمایش همه فیلترها */}
          {activeSheet === "all" && (
            <div className="space-y-4">
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={() => {
                    if (onResetFilters) onResetFilters();
                    setActiveSheet(null);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-rose-50 text-rose-600 rounded-2xl text-xs font-bold transition-colors cursor-pointer"
                >
                  <TrashIcon className="w-4 h-4" />
                  <span>حذف همه فیلترها</span>
                </button>
              )}

              <FilterAccordion title="دسته‌بندی‌ها" icon={TagIcon}>
                <CategoryFilter
                  selectedCategorySlug={filters.category}
                  onCategoryChange={onCategoryChange}
                />
              </FilterAccordion>

              <FilterAccordion title="محدوده قیمت" icon={CurrencyDollarIcon}>
                <PriceFilter
                  selectedPrice={filters.price}
                  onPriceChange={onPriceChange}
                />
              </FilterAccordion>

              <FilterAccordion title="انتخاب رنگ" icon={SwatchIcon}>
                <ColorFilter
                  selectedColors={filters.colors}
                  onColorChange={onColorChange}
                />
              </FilterAccordion>

              <FilterAccordion title="انتخاب سایز" icon={Squares2X2Icon}>
                <SizeFilter
                  selectedSizes={filters.sizes}
                  onSizeChange={onSizeChange}
                />
              </FilterAccordion>
            </div>
          )}

          {/* حالت ۲: انتخاب مرتب‌سازی */}
          {activeSheet === "sort" && (
            <div className="space-y-1">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    if (onSortChange) onSortChange(option.id);
                    setActiveSheet(null);
                  }}
                  className={`w-full text-right py-3 px-4 rounded-2xl text-xs font-bold transition-colors ${
                    currentSort === option.id
                      ? "bg-stone-900 text-white"
                      : "text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {/* حالت‌های تکی */}
          {activeSheet === "category" && (
            <CategoryFilter
              selectedCategorySlug={filters.category}
              onCategoryChange={onCategoryChange}
            />
          )}

          {activeSheet === "color" && (
            <ColorFilter
              selectedColors={filters.colors}
              onColorChange={onColorChange}
            />
          )}

          {activeSheet === "price" && (
            <PriceFilter
              selectedPrice={filters.price}
              onPriceChange={onPriceChange}
            />
          )}

          {activeSheet === "size" && (
            <SizeFilter
              selectedSizes={filters.sizes}
              onSizeChange={onSizeChange}
            />
          )}
        </BottomSheet>
      </div>
    </>
  );
}