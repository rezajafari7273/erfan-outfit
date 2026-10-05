'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Bars3Icon,
  FolderIcon,
  BoltIcon,
  ClockIcon,
  ChartBarIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import PromotionRenderer from '@/components/promotions/PromotionRenderer';
import { useProductContext } from '@/features/products/hooks/useProductContext';
import Skeleton from '@/components/ui/Skeleton';

export default function MegaMenu({ isHovered, onMouseEnter, onMouseLeave }) {
  // دریافت دسته‌‌بندی‌ها، کالکشن‌ها و وضعیت لودینگ از Context
  const { 
    categories = [], 
    collections = [], 
    categoriesLoading = false 
  } = useProductContext();

  // اگر لودینگ فعال است و هیچ داده کَش‌شده‌ای از قبل وجود ندارد، اسکلتون را نشان می‌دهیم
  const showSkeleton = categoriesLoading && (!categories || categories.length === 0);

  return (
    <li 
      className="group/megalist relative py-2 cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* تیتر مگامنو */}
      <div className="text-sm font-medium text-gray-900 flex items-center gap-1.5 transition-colors hover:text-primary-500">
        <Bars3Icon className="w-4 h-4 stroke-[1.8]" />
        <span>دسته‌بندی پوشاک</span>
      </div>

      {/* خط زیرین هاور */}
      <div
        className={`absolute -bottom-[12px] right-0 left-0 h-[2px] bg-primary rounded-full z-20 transition-opacity duration-200 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* منوی بازشونده مگامنو */}
      <div className="fixed top-[60px] right-0 left-0 w-full bg-white border-b border-gray-200 shadow-2xl z-40 overflow-x-auto overflow-y-auto max-h-[80vh] opacity-0 invisible -translate-y-3 group-hover/megalist:opacity-100 group-hover/megalist:visible group-hover/megalist:translate-y-0 transition-all duration-300 ease-out">
        <div className="container mx-auto px-8 py-10 min-w-[720px]">
          
          {showSkeleton ? (
            /* حالت لودینگ اولیه (فقط بار اول که کَش خالی است) */
            <div className="grid grid-cols-5 gap-8">
              
              {/* اسکلتون ستون دسته‌بندی‌ها (۳ ستون) */}
              <div className="col-span-3 grid grid-cols-3 gap-x-6 gap-y-8 pr-3">
                {[1, 2, 3, 4, 5, 6].map((idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Skeleton variant="circular" className="w-4 h-4 shrink-0" />
                      <Skeleton className="h-5 w-24 rounded-md" />
                    </div>
                    <div className="space-y-3">
                      <Skeleton className="h-3.5 w-20 rounded-md" />
                      <Skeleton className="h-3.5 w-28 rounded-md" />
                      <Skeleton className="h-3.5 w-16 rounded-md" />
                      <Skeleton className="h-3.5 w-24 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>

              {/* اسکلتون ستون پروموشن و کالکشن‌ها */}
              <div className="col-span-2 space-y-6">
                <Skeleton className="h-28 w-full rounded-2xl" />

                <div className="space-y-4">
                  <Skeleton className="h-5 w-28 rounded-md" />
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100">
                        <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-3.5 w-20 rounded-md" />
                          <Skeleton className="h-2.5 w-28 rounded-md" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 space-y-4">
                  <Skeleton className="h-5 w-32 rounded-md" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((idx) => (
                      <Skeleton key={idx} className="h-7 w-20 rounded-full" />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* حالت اصلی با داده‌های داینامیک (آنی از کش یا داده تازه) */
            <div className="grid grid-cols-5 gap-8">
              
              {/* ستون ۱ تا ۳: رندر داینامیک دسته‌بندی‌های اصلی و زیردسته‌ها */}
              <div className="col-span-3 grid grid-cols-3 gap-x-6 gap-y-8 pr-3">
                {categories.map((parentCat) => {
                  const catColors = parentCat.colors || {
                    bg: '#3b82f6',
                    hover_bg: '#1d4ed8',
                    text: '#ffffff',
                    hover_text: '#ffffff',
                  };

                  return (
                    <div key={parentCat.id} className="space-y-4">
                      {/* لینک و عنوان دسته والد */}
                      <h4 className="font-rokh font-black text-sm mb-4 flex items-center gap-2 text-gray-900">
                        <FolderIcon 
                          className="w-4 h-4 shrink-0 transition-colors duration-200" 
                          style={{ color: catColors.bg }} 
                        />
                        <Link 
                          href={`/products?category=${parentCat.slug}`}
                          className="transition-colors duration-200"
                          onMouseEnter={(e) => e.currentTarget.style.color = catColors.bg}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#111827'}
                        >
                          {parentCat.name}
                        </Link>
                      </h4>

                      {/* لیست زیردسته‌ها */}
                      <ul className="space-y-3">
                        {parentCat.children && parentCat.children.length > 0 ? (
                          parentCat.children.map((childCat) => (
                            <li key={childCat.id}>
                              <Link
                                href={`/products?category=${childCat.slug}`}
                                className="group/item text-xs text-gray-500 transition-colors flex items-center gap-2"
                                onMouseEnter={(e) => {
                                  const textSpan = e.currentTarget.querySelector('.child-text');
                                  if (textSpan) textSpan.style.color = catColors.bg;
                                }}
                                onMouseLeave={(e) => {
                                  const textSpan = e.currentTarget.querySelector('.child-text');
                                  if (textSpan) textSpan.style.color = '#6b7280';
                                }}
                              >
                                <span 
                                  className="w-1.5 h-1.5 rounded-full transition-transform group-hover/item:scale-125 shrink-0"
                                  style={{ backgroundColor: catColors.bg }}
                                ></span>
                                <span className="child-text transition-all duration-200 text-gray-500 group-hover/item:-translate-x-1">
                                  {childCat.name}
                                </span>
                              </Link>
                            </li>
                          ))
                        ) : (
                          <li className="text-[11px] text-gray-400">بدون زیردسته</li>
                        )}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* ستون ۴ و ۵: پروموشن‌ها و کالکشن‌های متصل به بک‌اند */}
              <div className="col-span-2">
                <div className="mb-6">
                  <PromotionRenderer
                    type="smallBanner"
                    slotKey="megaMenu"
                    className="grid-cols-2 gap-4"
                  />
                </div>

                {/* کالکشن‌های ویژه داینامیک */}
                <div className="space-y-4">
                  <h4 className="font-rokh font-black text-sm mb-4 text-gray-900">
                    کالکشن‌های ما
                  </h4>
                  
                  {collections && collections.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {collections.map((item) => {
                        const href = item.destination_type === 'landing'
                          ? `/landings/${item.slug}`
                          : `/products?collection=${item.slug}`;

                        const badgeText = item.badge_text || item.title?.slice(0, 2) || 'COL';
                        const imageUrl = item.image_url || item.image;

                        return (
                          <Link
                            key={item.id}
                            href={href}
                            className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-amber-400/80 hover:bg-gradient-to-r hover:from-amber-50/60 hover:to-orange-50/40 transition-all duration-300 group/item hover:shadow-sm"
                          >
                            {imageUrl ? (
                              <div className="w-10 h-10 rounded-lg overflow-hidden relative shrink-0 border border-gray-100">
                                <Image
                                  src={imageUrl}
                                  alt={item.title}
                                  fill
                                  className="object-cover group-hover/item:scale-110 transition-transform duration-300"
                                />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-amber-100/60 group-hover/item:bg-gradient-to-tr group-hover/item:from-amber-500 group-hover/item:to-orange-400 flex items-center justify-center shrink-0 transition-all duration-300">
                                <span className="text-amber-700 group-hover/item:text-white font-bold text-xs transition-colors duration-300">
                                  {badgeText}
                                </span>
                              </div>
                            )}

                            <div className="overflow-hidden">
                              <span className="text-xs font-semibold text-gray-800 group-hover/item:text-amber-600 transition-colors duration-300 block truncate">
                                {item.title}
                              </span>
                              {item.description && (
                                <p className="text-[11px] text-gray-500 truncate">{item.description}</p>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 py-2">کالکشنی یافت نشد.</p>
                  )}
                </div>

                {/* محبوب‌ترین دسته‌ها */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-rokh font-black text-sm mb-4 text-gray-900">
                    محبوب‌ترین دسته‌ها
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.slice(0, 6).map((cat) => {
                      const catColor = cat.colors?.bg || '#3b82f6';
                      return (
                        <Link
                          key={cat.id}
                          href={`/products?category=${cat.slug}`}
                          className="px-3 py-1.5 text-xs rounded-full border border-gray-200 text-gray-700 transition-all duration-200"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = catColor;
                            e.currentTarget.style.color = catColor;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#e5e7eb';
                            e.currentTarget.style.color = '#374151';
                          }}
                        >
                          {cat.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* نوار پایین مگامنو */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Link
                  href="/products?sort=popular"
                  className="group/quick text-xs text-gray-500 hover:text-amber-500 transition-colors flex items-center gap-1"
                >
                  <BoltIcon className="w-4 h-4 text-amber-500 transition-transform group-hover/quick:scale-110" />
                  <span className="transition-colors group-hover/quick:text-amber-500">پرطرفدارترین استایل‌ها</span>
                </Link>
                <Link
                  href="/products?sort=newest"
                  className="group/quick text-xs text-gray-500 hover:text-cyan-500 transition-colors flex items-center gap-1"
                >
                  <ClockIcon className="w-4 h-4 text-cyan-500 transition-transform group-hover/quick:scale-110" />
                  <span className="transition-colors group-hover/quick:text-cyan-500">کالکشن‌های جدید</span>
                </Link>
                <Link
                  href="/products?sort=bestselling"
                  className="group/quick text-xs text-gray-500 hover:text-indigo-500 transition-colors flex items-center gap-1"
                >
                  <ChartBarIcon className="w-4 h-4 text-indigo-500 transition-transform group-hover/quick:scale-110" />
                  <span className="transition-colors group-hover/quick:text-indigo-500">پرفروش‌ترین‌های فصل</span>
                </Link>
              </div>

              {/* دکمه مشاهده همه محصولات */}
              <Link
                href="/products"
                className="group/all text-sm font-bold font-rokh hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <span>مشاهده همه محصولات پوشاک</span>
                <ArrowRightIcon className="w-4 h-4 group-hover/all:text-primary rotate-180 transition-transform duration-200 group-hover/all:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </li>
  );
}