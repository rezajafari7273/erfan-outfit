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
    <div className="fixed bottom-5 left-0 right-0 z-20 flex justify-center px-4 lg:hidden" dir="rtl">
      <div className="relative flex items-center justify-around bg-[#fff3e1] rounded-full py-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100 w-full max-w-md">
        <LayoutGroup id="mobile-nav">
          {navItems.map((item, index) => {
            const isActive = activeTab === index;
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={item.href}
                className="relative flex items-center justify-center py-3 px-6 rounded-full transition-all duration-300 focus:outline-none"
              >
                {/* پس‌زمینه کپسولی فعال (Pill Highlight) */}
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-primary/15 rounded-full z-0"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                {/* محتوای آیتم: آیکون + متن افقی */}
                <div className="relative z-10 flex items-center gap-2">
                  <div className="relative flex items-center justify-center">
                    <Icon
                      className={`w-6 h-6 transition-colors duration-200 ${
                        isActive
                          ? 'text-primary stroke-[2.2]'
                          : 'text-gray-500 stroke-[1.8] hover:text-neutral-800'
                      }`}
                    />

                    {/* بج سبد خرید (فقط در حالت غیرفعال) */}
                    {item.hasBadge && !isActive && (
                      <span className="absolute -top-1 -left-1 bg-primary text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white">
                        {item.badgeCount}
                      </span>
                    )}
                  </div>

                  {/* متن آیتم (فقط زمانی که فعال باشد ظاهر می‌شود) */}
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