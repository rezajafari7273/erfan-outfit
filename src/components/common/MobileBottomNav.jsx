'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, LayoutGroup } from 'framer-motion';
import {
  HomeIcon,
  Squares2X2Icon,
  ShoppingBagIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { id: 0, label: 'خانه', icon: HomeIcon, href: '/' },
  { id: 1, label: 'دسته‌بندی', icon: Squares2X2Icon, href: '/categories' },
  { id: 2, label: 'سبد', icon: ShoppingBagIcon, hasBadge: true, badgeCount: '۲', href: '/cart' },
  { id: 3, label: 'پروفایل', icon: UserIcon, href: '/profile' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  const activeIndex = navItems.findIndex((item) =>
    item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
  );

  const activeTab = activeIndex !== -1 ? activeIndex : null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center px-4 lg:hidden" dir="rtl">
      {/* 
        پس‌زمینه اصلی: سبز/زیتونی ملایم گلس‌مورفیسم (Warm Sage Glass)
      */}
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
                {/* کپسول فعال دقیقاً مانند نسخه قبلی (bg-primary/10) */}
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-primary/10 rounded-full z-0"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                {/* محتوای آیتم: آیکون + متن افقی با رنگ برند (text-primary) */}
                <div className="relative z-10 flex items-center gap-2">
                  <div className="relative flex items-center justify-center">
                    <Icon
                      className={`w-5 h-5 transition-colors duration-200 ${
                        isActive
                          ? 'text-primary stroke-[2.2]'
                          : 'text-stone-500 stroke-[1.8] hover:text-stone-800'
                      }`}
                    />

                    {/* بج سبد خرید */}
                    {item.hasBadge && !isActive && (
                      <span className="absolute -top-1.5 -left-1.5 bg-primary text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-[#E5E8DF]">
                        {item.badgeCount}
                      </span>
                    )}
                  </div>

                  {/* متن آیتم فعال با همان رنگ اصلی برند */}
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