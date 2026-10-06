"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bars3Icon,
  BellIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  XMarkIcon,
  ShoppingBagIcon,
  UserIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { adminApi } from "@/features/admin/api/adminApi";
import { useDashboardSearch } from "@/features/admin/hooks/useDashboardSearch";
import Backdrop from "@/components/ui/Backdrop";

export default function AdminHeader({ onOpenMobileSidebar }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  // دریافت استیت سرچ و داده‌های لود شده از هوک داشبورد
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    isSearching,
  } = useDashboardSearch({ mode: "client" });

  const handleLogout = async () => {
    try {
      setLoading(true);
      await adminApi.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      router.replace("/admin-panel/login");
    }
  };

  const hasResults = searchResults && searchResults.totalCount > 0;

  return (
    <>
      <header className="sticky top-0 z-30 p-3 sm:p-4 bg-admin-background dir-rtl select-none">
        <div className="w-full bg-admin-surface border border-admin-border/60 rounded-2xl sm:rounded-3xl px-4 py-2.5 sm:px-6 sm:py-3 flex items-center justify-between shadow-sm">
          {/* سمت راست: پروفایل و ابزارها */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={onOpenMobileSidebar}
              className="lg:hidden p-1.5 rounded-xl text-admin-text hover:bg-admin-background transition-colors"
              aria-label="باز کردن منو"
            >
              <Bars3Icon className="w-5 h-5" />
            </button>

            {/* پروفایل */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowProfileMenu((prev) => !prev)}
                className="flex items-center gap-2.5 text-right p-1 rounded-xl hover:bg-admin-background transition-colors cursor-pointer"
              >
                <div className="relative w-9 h-9 rounded-full overflow-hidden bg-admin-background border border-admin-border shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80"
                    alt="مدیر سیستم"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-black text-admin-text leading-tight">سلام، مدیر</p>
                  <p className="text-[10px] font-bold text-admin-text-muted mt-0.5">
                    admin@store.com
                  </p>
                </div>
                <ChevronDownIcon
                  className={`w-3.5 h-3.5 text-admin-text-muted transition-transform duration-200 ${
                    showProfileMenu ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-admin-surface border border-admin-border rounded-2xl shadow-xl py-2 z-50">
                  <Link
                    href="/"
                    target="_blank"
                    className="flex items-center justify-between px-4 py-2 text-xs font-bold text-admin-text hover:bg-admin-background transition-colors"
                  >
                    <span>مشاهده سایت</span>
                    <ArrowTopRightOnSquareIcon className="w-4 h-4 text-admin-primary" />
                  </Link>
                  <hr className="my-1 border-admin-border/50" />
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loading}
                    className="w-full flex items-center justify-between px-4 py-2 text-xs font-bold text-admin-danger hover:bg-admin-danger/10 transition-colors"
                  >
                    <span>{loading ? "در حال خروج..." : "خروج از حساب"}</span>
                    <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* آیکون‌ها */}
            <div className="flex items-center gap-2 mr-1 sm:mr-2">
              <button
                type="button"
                className="relative p-2 rounded-xl text-admin-text-muted hover:text-admin-text hover:bg-admin-background transition-colors"
                title="اعلان‌ها"
              >
                <BellIcon className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-admin-danger ring-2 ring-admin-surface" />
              </button>
              <button
                type="button"
                className="p-2 rounded-xl text-admin-text-muted hover:text-admin-text hover:bg-admin-background transition-colors"
                title="تنظیمات"
              >
                <Cog6ToothIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* سمت چپ: باکس سرچ در هدر */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowSearchModal(true)}
              className="sm:hidden p-2 rounded-xl text-admin-text-muted hover:text-admin-text hover:bg-admin-background transition-colors"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>

            {/* اینپوت دسکتاپ با کشوی نتایج زنده */}
            <div className="hidden sm:block relative sm:w-64 md:w-80">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="جستجو در تمام بخش‌ها..."
                className="w-full bg-admin-background/60 border border-admin-border/50 rounded-2xl py-2 pr-4 pl-9 text-xs font-bold text-admin-text placeholder:text-admin-text-muted/70 focus:outline-none focus:border-admin-primary focus:bg-admin-surface transition-all"
              />
              <MagnifyingGlassIcon className="w-4 h-4 text-admin-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />

              {/* کشوی drop-down نتایج */}
              {isSearching && (
                <div className="absolute left-0 right-0 mt-2 bg-admin-surface border border-admin-border rounded-2xl shadow-xl p-3 z-50 text-xs font-bold space-y-3 max-h-80 overflow-y-auto">
                  {!hasResults ? (
                    <p className="text-center text-admin-text-muted py-3">هیچ موردی یافت نشد</p>
                  ) : (
                    <>
                      {searchResults.products?.length > 0 && (
                        <div>
                          <p className="text-[10px] text-admin-text-muted mb-1.5 flex items-center gap-1 font-bold">
                            <ShoppingBagIcon className="w-3.5 h-3.5" /> محصولات
                          </p>
                          <div className="space-y-1">
                            {searchResults.products.map((item) => (
                              <div
                                key={item.id || item.sku}
                                onClick={() => setSearchTerm("")}
                                className="p-2 hover:bg-admin-background rounded-xl cursor-pointer text-admin-text flex items-center justify-between transition-colors"
                              >
                                <span>{item.name || item.title || item.product_name}</span>
                                {item.sku && <span className="text-[10px] text-admin-text-muted">{item.sku}</span>}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {searchResults.orders?.length > 0 && (
                        <div>
                          <p className="text-[10px] text-admin-text-muted mb-1.5 flex items-center gap-1 font-bold">
                            <ClipboardDocumentListIcon className="w-3.5 h-3.5" /> سفارشات
                          </p>
                          <div className="space-y-1">
                            {searchResults.orders.map((item) => (
                              <div
                                key={item.id}
                                onClick={() => setSearchTerm("")}
                                className="p-2 hover:bg-admin-background rounded-xl cursor-pointer text-admin-text transition-colors"
                              >
                                سفارش #{item.id || item.order_id} - {item.customer_name || item.user_fullname || "کاربر"}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {searchResults.users?.length > 0 && (
                        <div>
                          <p className="text-[10px] text-admin-text-muted mb-1.5 flex items-center gap-1 font-bold">
                            <UserIcon className="w-3.5 h-3.5" /> کاربران
                          </p>
                          <div className="space-y-1">
                            {searchResults.users.map((item) => (
                              <div
                                key={item.id}
                                onClick={() => setSearchTerm("")}
                                className="p-2 hover:bg-admin-background rounded-xl cursor-pointer text-admin-text transition-colors"
                              >
                                {item.name || item.full_name || item.email}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* مودال سرچ موبایل */}
      <Backdrop
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        className="flex items-start justify-center p-4 pt-16 sm:hidden dir-rtl"
      >
        <div
          className="w-full bg-admin-surface border border-admin-border rounded-2xl p-4 shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-admin-text">جستجو در اطلاعات</span>
            <button
              type="button"
              onClick={() => setShowSearchModal(false)}
              className="p-1 rounded-lg text-admin-text-muted hover:text-admin-text"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="relative w-full">
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="نام محصول، شماره سفارش یا کاربر..."
              className="w-full bg-admin-background/60 border border-admin-border/50 rounded-xl py-2.5 pr-4 pl-9 text-xs font-bold text-admin-text placeholder:text-admin-text-muted/70 focus:outline-none focus:border-admin-primary"
            />
            <MagnifyingGlassIcon className="w-4 h-4 text-admin-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {isSearching && (
            <div className="mt-3 text-xs font-bold space-y-3 max-h-60 overflow-y-auto pt-2 border-t border-admin-border/40">
              {!hasResults ? (
                <p className="text-center text-admin-text-muted py-2">نتیجه‌ای یافت نشد</p>
              ) : (
                <>
                  {searchResults.products?.length > 0 && (
                    <div>
                      <p className="text-[10px] text-admin-text-muted mb-1">محصولات</p>
                      {searchResults.products.map((item) => (
                        <div key={item.id} className="p-2 hover:bg-admin-background rounded-xl text-admin-text">
                          {item.name || item.title}
                        </div>
                      ))}
                    </div>
                  )}
                  {searchResults.orders?.length > 0 && (
                    <div>
                      <p className="text-[10px] text-admin-text-muted mb-1">سفارشات</p>
                      {searchResults.orders.map((item) => (
                        <div key={item.id} className="p-2 hover:bg-admin-background rounded-xl text-admin-text">
                          سفارش #{item.id}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </Backdrop>
    </>
  );
}