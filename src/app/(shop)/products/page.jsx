"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/features/products/components/sidebar/Sidebar";
import ProductCard from "@/features/products/components/ProductCard";
import SortBar from "@/features/products/components/SortBar";
import ProductCardSkeleton from "@/features/products/components/ProductCardSkeleton";
import { useProductContext } from "@/features/products/hooks/useProductContext";

function ProductsContent() {
  const searchParams = useSearchParams();
  const [activeVideo, setActiveVideo] = useState(null);

  const {
    products,
    productsCount,
    loading,
    loadingMore,
    hasMore,
    updateFilters,
    resetFilters,
    loadMore,
    filters,
  } = useProductContext();

  const observerRef = useRef(null);

  // سینک کردن پارامترهای URL با Context
  useEffect(() => {
    const categoryParam = searchParams.get("category") || "";
    const sortParam = searchParams.get("ordering") || searchParams.get("sort") || "";
    const minPriceParam = searchParams.get("price_min") || "";
    const maxPriceParam = searchParams.get("price_max") || "";
    const colorsParam = searchParams.get("colors") || "";
    const sizesParam = searchParams.get("sizes") || "";

    if (
      filters.category !== categoryParam ||
      filters.ordering !== sortParam ||
      filters.price_min !== minPriceParam ||
      filters.price_max !== maxPriceParam ||
      filters.colors !== colorsParam ||
      filters.sizes !== sizesParam
    ) {
      updateFilters({
        category: categoryParam,
        ordering: sortParam,
        price_min: minPriceParam,
        price_max: maxPriceParam,
        colors: colorsParam,
        sizes: sizesParam,
      });
    }
  }, [searchParams]);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [hasMore, loading, loadingMore, loadMore]);

  const handleSortChange = (newSort) => {
    updateFilters({ ordering: newSort });
  };

  const handleCategoryChange = (slug) => {
    updateFilters({ category: slug || "" });
  };

  const handleColorChange = (colorIds) => {
    updateFilters({ colors: colorIds || "" });
  };

  const handleSizeChange = (sizeIds) => {
    updateFilters({ sizes: sizeIds || "" });
  };

  const handlePriceChange = (price) => {
    updateFilters({
      price_min: price?.min ?? "",
      price_max: price?.max ?? "",
    });
  };

  return (
    <div className="min-h-screen bg-stone-100 mt-4 sm:mt-8">
      <div className="container mx-auto flex flex-col lg:flex-row gap-8 items-start px-4 sm:px-6">
        {/* سایدبار */}
        <div className="w-full lg:w-72 shrink-0">
          <Sidebar
            filters={filters}
            activeVideo={activeVideo}
            onCloseVideo={() => setActiveVideo(null)}
            currentSort={filters.ordering || "newest"}
            onSortChange={handleSortChange}
            onCategoryChange={handleCategoryChange}
            onColorChange={handleColorChange}
            onPriceChange={handlePriceChange}
            onSizeChange={handleSizeChange}
            onResetFilters={resetFilters}
          />
        </div>

        {/* ستون اصلی */}
        <div className="flex-1 w-full">
          {/* هدر دسکتاپ - یکپارچه و مدرن */}
          <div className="hidden lg:flex items-center justify-between mb-6">
            <div className="flex-1">
              <SortBar
                currentSort={filters.ordering || "newest"}
                onSortChange={handleSortChange}
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-secondary font-medium px-1 pb-3 shrink-0">
              <span className="font-rokh font-bold pt-1">تعداد محصولات:</span>
              <span className="font-bold text-primary text-sm">
                {productsCount || 0} محصول
              </span>
            </div>
          </div>

          {/* هدر موبایل */}
          <div className="lg:hidden flex items-center justify-between text-xs text-secondary mb-4 px-1">
            <span className="font-rokh font-bold pt-1">تعداد محصولات:</span>
            
            <span className="font-fanum font-bold text-primary text-xs">{productsCount || 0} محصول</span>
          </div>

          {/* لودینگ اولیه */}
          {loading ? (
            <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 items-start">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={`skeleton-init-${index}`} />
              ))}
            </main>
          ) : products && products.length > 0 ? (
            <>
              {/* گرید اصلی محصولات */}
              <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 items-start">
                {products.map((product, idx) => (
                  <ProductCard
                    key={product.id ? `prod-${product.id}` : `prod-idx-${idx}`}
                    product={product}
                    onPlayVideo={(video) => setActiveVideo(video)}
                  />
                ))}

                {/* اسکلتون‌های لودینگ اسکرول */}
                {loadingMore &&
                  Array.from({ length: 4 }).map((_, index) => (
                    <ProductCardSkeleton key={`skeleton-more-${index}`} />
                  ))}
              </main>

              <div ref={observerRef} className="h-12 w-full mt-4" />
            </>
          ) : (
            <div className="w-full bg-white p-12 rounded-2xl border border-stone-200 text-center text-stone-500 font-medium">
              محصولی برای نمایش وجود ندارد.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-100 p-8 text-center text-stone-500">در حال بارگذاری...</div>}>
      <ProductsContent />
    </Suspense>
  );
}