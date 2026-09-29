'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import {
  Squares2X2Icon,
  ShoppingBagIcon,
  FolderIcon,
  SwatchIcon,
  ArrowsPointingOutIcon,
  TruckIcon,
  UsersIcon,
  UserGroupIcon,
  TagIcon,
  TicketIcon,
  GiftIcon,
  DocumentTextIcon,
  CubeIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  EnvelopeIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  Cog6ToothIcon,
  BoltIcon,
  RectangleStackIcon,
  FireIcon,
  PhotoIcon,
  SparklesIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';

const navGroups = [
  {
    title: 'داشبورد',
    items: [
      { name: 'خلاصه وضعیت', href: '/admin-panel', icon: Squares2X2Icon, exact: true },
      { name: 'آمار و تحلیل', href: '/admin-panel/analytics', icon: ChartBarIcon },
    ],
  },
  {
    title: 'کاتالوگ',
    items: [
      { name: 'محصولات', href: '/admin-panel/products', icon: ShoppingBagIcon },
      { name: 'دسته‌بندی‌ها', href: '/admin-panel/categories', icon: FolderIcon },
      { name: 'رنگ‌ها', href: '/admin-panel/colors', icon: SwatchIcon },
      { name: 'سایزها', href: '/admin-panel/sizes', icon: ArrowsPointingOutIcon },
      { name: 'واریانت‌ها', href: '/admin-panel/variants', icon: CubeIcon },
    ],
  },
  {
    title: 'فروش',
    items: [
      { name: 'سفارشات', href: '/admin-panel/orders', icon: TruckIcon },
      { name: 'فروشندگان', href: '/admin-panel/vendors', icon: UserGroupIcon },
      { name: 'کاربران', href: '/admin-panel/users', icon: UsersIcon },
    ],
  },
  {
    title: 'پروموشن',
    items: [
      { name: 'پروموشن‌ها', href: '/admin-panel/promotions', icon: TagIcon, exact: true },
      { name: 'کوپن‌ها', href: '/admin-panel/promotions?tab=coupons', icon: TicketIcon, tab: 'coupons' },
      { name: 'فروش فلش', href: '/admin-panel/promotions?tab=flash', icon: BoltIcon, tab: 'flash' },
      { name: 'بخر یکی ببر یکی', href: '/admin-panel/promotions?tab=bogo', icon: GiftIcon, tab: 'bogo' },
      { name: 'تاپ بنر', href: '/admin-panel/promotions?tab=top-banners', icon: RectangleStackIcon, tab: 'top-banners' },
      { name: 'استوری‌ها', href: '/admin-panel/promotions?tab=stories', icon: FireIcon, tab: 'stories' },
      { name: 'اسلایدر', href: '/admin-panel/promotions?tab=sliders', icon: PhotoIcon, tab: 'sliders' },
      { name: 'اسمال بنر', href: '/admin-panel/promotions?tab=small-banners', icon: SparklesIcon, tab: 'small-banners' },
      { name: 'لندینگ‌ها', href: '/admin-panel/promotions?tab=landings', icon: DocumentDuplicateIcon, tab: 'landings' },
    ],
  },
  {
    title: 'محتوا',
    items: [
      { name: 'مقالات', href: '/admin-panel/content', icon: DocumentTextIcon },
      { name: 'باشگاه مشتریان', href: '/admin-panel/loyalty', icon: GiftIcon },
    ],
  },
  {
    title: 'سیستم',
    items: [
      { name: 'انبار', href: '/admin-panel/wms', icon: CubeIcon },
      { name: 'امنیت', href: '/admin-panel/security', icon: ShieldCheckIcon },
      { name: 'ایمیل‌ها', href: '/admin-panel/mailbox', icon: EnvelopeIcon },
      { name: 'تنظیمات', href: '/admin-panel/settings', icon: Cog6ToothIcon },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'promotions';

  const [collapsed, setCollapsed] = useState({});

  const toggleGroup = (title) => {
    setCollapsed((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const isActive = (item) => {
    const cleanHref = item.href.split('?')[0];
    // اگر item.tab داره، فقط زمانی active هست که هم pathname و هم tab مطابقت داشته باشن
    if (item.tab) {
      return pathname === cleanHref && currentTab === item.tab;
    }
    // برای آیتم‌های بدون tab توی /promotions
    if (cleanHref === '/admin-panel/promotions') {
      if (item.exact) {
        return pathname === cleanHref && currentTab === 'promotions';
      }
    }
    if (item.exact) return pathname === cleanHref;
    return pathname === cleanHref || pathname.startsWith(cleanHref + '/');
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col border-l border-slate-800 shrink-0">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 bg-slate-950/50 border-b border-slate-800">
        <span className="font-bold text-base text-white">پنل مدیریت</span>
        <span className="text-[10px] bg-amber-500/10 text-amber-400 font-bold px-2 py-0.5 rounded border border-amber-500/20">
          ادمین
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
        {navGroups.map((group) => {
          const isCollapsed = collapsed[group.title];
          const groupHasActive = group.items.some(isActive);

          return (
            <div key={group.title}>
              <button
                type="button"
                onClick={() => toggleGroup(group.title)}
                className={`w-full flex items-center justify-between px-2 mb-1.5 text-[10px] font-black tracking-wide transition ${
                  groupHasActive ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <span className="uppercase">{group.title}</span>
                {isCollapsed ? (
                  <ChevronLeftIcon className="w-3 h-3" />
                ) : (
                  <ChevronDownIcon className="w-3 h-3" />
                )}
              </button>

              {!isCollapsed && (
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const active = isActive(item);
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                          active
                            ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/10'
                            : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                        }`}
                      >
                        <Icon className="w-4.5 h-4.5 shrink-0" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 text-[10px] text-slate-500 text-center">
        Erfan Apparel · v1.0
      </div>
    </aside>
  );
}