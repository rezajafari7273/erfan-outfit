'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, LayoutGroup } from 'framer-motion';
import {
  HomeIcon,
  Squares2X2Icon,
  ShoppingBagIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import baseApi from '@/lib/baseApi';

const navItems = [
  { id: 0, label: 'خانه', icon: HomeIcon, href: '/' },
  { id: 1, label: 'دسته‌بندی', icon: Squares2X2Icon, href: '/categories' },
  { id: 2, label: 'سبد', icon: ShoppingBagIcon, hasBadge: true, href: '/cart' },
  { id: 3, label: 'پروفایل', icon: UserIcon, href: '/profile' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);

  // ---------- Fetch cart count ----------
  const fetchCartCount = useCallback(async () => {
    try {
      const data = await baseApi.get('/cart/');
      const items = Array.isArray(data?.items)
        ? data.items
        : Array.isArray(data)
        ? data
        : [];
      const total = items.reduce((sum, it) => sum + Number(it.quantity || 0), 0);
      setCartCount(total);
    } catch {
      setCartCount(0);
    }
  }, []);

  useEffect(() => {
    fetchCartCount();

    const onFocus = () => fetchCartCount();
    window.addEventListener('focus', onFocus);

    const onCartUpdated = (event) => {
      const delta = event?.detail?.delta;
      if (typeof delta === 'number') {
        setCartCount((prev) => Math.max(0, prev + delta));
      } else {
        fetchCartCount();
      }
    };
    window.addEventListener('cart:updated', onCartUpdated);

    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('cart:updated', onCartUpdated);
    };
  }, [fetchCartCount]);

  const activeIndex = navItems.findIndex((item) =>
    item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
  );

  const activeTab = activeIndex !== -1 ? activeIndex : null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-20 flex justify-center px-4 lg:hidden" dir="rtl">
      <div className="relative flex items-center justify-around bg-[#E5E8DF]/80 backdrop-blur-xl rounded-full px-2 py-2 shadow-lg shadow-stone-900/5 border border-[#D1D6C7]/60 w-full max-w-md">
        <LayoutGroup id="mobile-nav">
          {navItems.map((item, index) => {
            const isActive = activeTab === index;
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={item.href}
                className="relative flex items-center justify-center py-2.5 px-4 rounded-full transition-all duration-300 focus:outline-none"
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-primary/10 rounded-full z-0"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                <div className="relative z-10 flex items-center gap-2">
                  <div className="relative flex items-center justify-center">
                    <Icon
                      className={`w-5 h-5 transition-colors duration-200 ${
                        isActive
                          ? 'text-primary stroke-[2.2]'
                          : 'text-stone-500 stroke-[1.8] hover:text-stone-800'
                      }`}
                    />

                    {/* Cart badge — نمایش در هر دو حالت active و inactive */}
                    {item.hasBadge && cartCount > 0 && (
                      <span
                        className={`absolute -top-2 -left-1.5 bg-primary text-white text-[8px] font-black min-w-4 h-4 px-1 flex items-center justify-center rounded-lg ${
                          isActive ? 'ring-[#E5E8DF]' : 'ring-[#E5E8DF]'
                        }`}
                      >
                        {cartCount.toLocaleString('fa-IR')}
                      </span>
                    )}
                  </div>

                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="text-xs font-bold text-primary whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </div>
              </Link>
            );
          })}
        </LayoutGroup>
      </div>
    </div>
  );
}