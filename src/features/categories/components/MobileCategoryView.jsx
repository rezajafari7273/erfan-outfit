'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeftIcon,
  SparklesIcon,
  FolderIcon,
} from '@heroicons/react/24/outline';
import { useProductContext } from '@/features/products/hooks/useProductContext';
import Footer from "@/components/common/Footer/Footer";
import MobileBottomNav from "@/components/common/MobileBottomNav";

export default function ShopFooterWrapper() {
  const pathname = usePathname();
  const isCategoriesPage = pathname === '/categories';

  // دریافت دسته‌بندی‌ها و وضعیت لودینگ از کانتکست متمرکز محصولات
  const { categories, loading: categoriesLoading } = useProductContext();

  // استیت نگهداری شناسه دسته والد انتخاب شده
  const [selectedCatId, setSelectedCatId] = useState(null);

  // به محض اینکه دسته‌بندی‌ها لود شدند، اولین دسته را به عنوان پیش‌فرض انتخاب کن
  useEffect(() => {
    if (categories && categories.length > 0 && !selectedCatId) {
      setSelectedCatId(categories[0].id);
    }
  }, [categories, selectedCatId]);

  // پیدا کردن دسته فعال جاری
  const activeCategory = categories?.find((c) => c.id === selectedCatId) || categories?.[0];

  return (
    <>
      <div 
        className={`flex flex-col w-full overflow-hidden ${
          isCategoriesPage ? 'h-[calc(100vh-64px)] pb-16 lg:pb-0' : 'min-h-screen'
        }`} 
        dir="rtl"
      >
        {/* هدر بالای صفحه */}
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center justify-between shrink-0">
          <h1 className="text-sm font-bold font-rokh text-primary flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-secondary" />
            دسته‌بندی پوشاک
          </h1>
        </div>

        {categoriesLoading && (!categories || categories.length === 0) ? (
          /* حالت لودینگ */
          <div className="flex-1 flex flex-col items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="mt-3 text-xs text-gray-500 font-medium">در حال دریافت دسته‌بندی‌ها...</span>
          </div>
        ) : (
          <div className="flex flex-1 overflow-hidden">
            {/* ستون راست (تب دسته‌های والد) */}
            <div className="w-28 bg-gray-50 border-l font-rokh font-bold border-gray-100 overflow-y-auto shrink-0 pb-12">
              {categories?.map((cat) => {
                const isActive = selectedCatId === cat.id;
                const catColor = cat.colors?.bg || '#3b82f6';

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCatId(cat.id)}
                    className={`w-full flex flex-col items-center justify-center py-4 px-2 text-center transition-all relative border-b border-gray-100 ${
                      isActive ? 'font-bold' : 'text-gray-500'
                    }`}
                    style={{ color: isActive ? catColor : undefined }}
                  >
                    {isActive && (
                      <span 
                        className="absolute right-0 top-0 bottom-0 w-1 rounded-l-full" 
                        style={{ backgroundColor: catColor }}
                      />
                    )}
                    <div
                      className={`p-2.5 rounded-2xl mb-1 transition-all ${
                        isActive
                          ? 'scale-110 shadow-sm'
                          : 'text-gray-400'
                      }`}
                      style={{
                        backgroundColor: isActive ? `${catColor}15` : undefined,
                        color: isActive ? catColor : undefined,
                      }}
                    >
                      <FolderIcon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] truncate w-full">{cat.name}</span>
                  </button>
                );
              })}
            </div>

            {/* ستون چپ (نمایش زیرمجموعه‌ها و فرزندان با انیمیشن فریمور موشن) */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4 pb-16">
              {activeCategory ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCatId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="space-y-3"
                  >
                    {/* لینک مشاهده همه محصولات این دسته والد */}
                    <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800">همه محصولات {activeCategory.name}</span>
                      <Link
                        href={`/products?category=${activeCategory.slug}`}
                        className="text-[11px] text-primary font-semibold flex items-center gap-1 bg-primary/10 px-2.5 py-1 rounded-lg hover:bg-primary/20 transition-colors shrink-0 whitespace-nowrap"
                      >
                        مشاهده همه <ChevronLeftIcon className="w-3 h-3 shrink-0" />
                      </Link>
                    </div>

                    {/* رندر زیردسته‌ها (children) داخل باکس */}
                    {activeCategory.children && activeCategory.children.length > 0 ? (
                      <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm space-y-3">
                        <div className="flex items-center justify-between mb-3 border-b border-gray-50 pb-2">
                          <span className="text-xs font-bold text-gray-800">{activeCategory.name}</span>
                          <Link
                            href={`/products?category=${activeCategory.slug}`}
                            className="text-[10px] text-primary font-semibold flex items-center shrink-0 whitespace-nowrap"
                          >
                            همه <ChevronLeftIcon className="w-3 h-3 shrink-0" />
                          </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {activeCategory.children.map((child) => (
                            <Link
                              key={child.id}
                              href={`/products?category=${child.slug}`}
                              className="p-2 rounded-xl bg-gray-50 text-xs text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors text-center border border-gray-100 truncate"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-10 text-xs text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        زیردسته‌ای برای این بخش ثبت نشده است.
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="text-center py-10 text-xs text-gray-400">
                  لطفاً یک دسته‌بندی انتخاب کنید.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* فوتر فقط در صفحه categories مخفی می‌شود، اما MobileBottomNav همیشه نمایش داده می‌شود */}
      {!isCategoriesPage && <Footer />}
      <MobileBottomNav />
    </>
  );
}