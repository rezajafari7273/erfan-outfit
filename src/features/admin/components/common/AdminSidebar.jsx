'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import {
  Squares2X2Icon, ShoppingBagIcon, FolderIcon, SwatchIcon, ArrowsPointingOutIcon,
  TruckIcon, UsersIcon, UserGroupIcon, TagIcon, TicketIcon, GiftIcon,
  DocumentTextIcon, CubeIcon, ShieldCheckIcon, ChartBarIcon, EnvelopeIcon,
  ChevronDownIcon, ChevronLeftIcon, Cog6ToothIcon, BoltIcon,
  RectangleStackIcon, FireIcon, PhotoIcon, SparklesIcon, DocumentDuplicateIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const navGroups = [
  { title: 'داشبورد', items: [
    { name: 'خلاصه وضعیت', href: '/admin-panel', icon: Squares2X2Icon, exact: true },
    { name: 'آمار و تحلیل', href: '/admin-panel/analytics', icon: ChartBarIcon },
  ]},
  { title: 'کاتالوگ', items: [
    { name: 'محصولات', href: '/admin-panel/products', icon: ShoppingBagIcon },
    { name: 'دسته‌بندی‌ها', href: '/admin-panel/categories', icon: FolderIcon },
    { name: 'رنگ‌ها', href: '/admin-panel/colors', icon: SwatchIcon },
    { name: 'سایزها', href: '/admin-panel/sizes', icon: ArrowsPointingOutIcon },
    { name: 'واریانت‌ها', href: '/admin-panel/variants', icon: CubeIcon },
  ]},
  { title: 'فروش', items: [
    { name: 'سفارشات', href: '/admin-panel/orders', icon: TruckIcon },
    { name: 'فروشندگان', href: '/admin-panel/vendors', icon: UserGroupIcon },
    { name: 'کاربران', href: '/admin-panel/users', icon: UsersIcon },
  ]},
  { title: 'پروموشن', items: [
    { name: 'پروموشن‌ها', href: '/admin-panel/promotions', icon: TagIcon, exact: true },
    { name: 'کوپن‌ها', href: '/admin-panel/promotions?tab=coupons', icon: TicketIcon, tab: 'coupons' },
    { name: 'فروش فلش', href: '/admin-panel/promotions?tab=flash', icon: BoltIcon, tab: 'flash' },
    { name: 'بخر یکی ببر یکی', href: '/admin-panel/promotions?tab=bogo', icon: GiftIcon, tab: 'bogo' },
    { name: 'تاپ بنر', href: '/admin-panel/promotions?tab=top-banners', icon: RectangleStackIcon, tab: 'top-banners' },
    { name: 'استوری‌ها', href: '/admin-panel/promotions?tab=stories', icon: FireIcon, tab: 'stories' },
    { name: 'اسلایدر', href: '/admin-panel/promotions?tab=sliders', icon: PhotoIcon, tab: 'sliders' },
    { name: 'اسمال بنر', href: '/admin-panel/promotions?tab=small-banners', icon: SparklesIcon, tab: 'small-banners' },
    { name: 'لندینگ‌ها', href: '/admin-panel/promotions?tab=landings', icon: DocumentDuplicateIcon, tab: 'landings' },
  ]},
  { title: 'محتوا', items: [
    { name: 'مقالات', href: '/admin-panel/content', icon: DocumentTextIcon },
    { name: 'باشگاه مشتریان', href: '/admin-panel/loyalty', icon: GiftIcon },
  ]},
  { title: 'سیستم', items: [
    { name: 'انبار', href: '/admin-panel/wms', icon: CubeIcon },
    { name: 'امنیت', href: '/admin-panel/security', icon: ShieldCheckIcon },
    { name: 'ایمیل‌ها', href: '/admin-panel/mailbox', icon: EnvelopeIcon },
    { name: 'تنظیمات', href: '/admin-panel/settings', icon: Cog6ToothIcon },
  ]},
];

export default function AdminSidebar({ onCloseMobile }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'promotions';
  const [collapsed, setCollapsed] = useState({});

  const toggleGroup = (title) => {
    setCollapsed((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const isActive = (item) => {
    const cleanHref = item.href.split('?')[0];
    if (item.tab) return pathname === cleanHref && currentTab === item.tab;
    if (cleanHref === '/admin-panel/promotions') {
      if (item.exact) return pathname === cleanHref && currentTab === 'promotions';
    }
    if (item.exact) return pathname === cleanHref;
    return pathname === cleanHref || pathname.startsWith(cleanHref + '/');
  };

  const handleLinkClick = () => {
    if (typeof onCloseMobile === 'function') onCloseMobile();
  };

  return (
    <aside className="w-64 h-full flex flex-col shrink-0 bg-admin-surface border-l border-admin-border text-admin-text select-none">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-5 bg-admin-background border-b border-admin-border shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-admin-primary flex items-center justify-center text-white font-black text-xs shadow-sm">
            A
          </div>
          <span className="font-black text-sm text-admin-text tracking-tight">پنل مدیریت</span>
        </div>

        {/* بستن موبایل */}
        <button
          type="button"
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-admin-text-muted hover:text-admin-text hover:bg-admin-surface transition-colors"
          aria-label="بستن منو"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>

      {/* لیست منوها */}
      <nav className="flex-1 p-3.5 space-y-4 overflow-y-auto">
        {navGroups.map((group) => {
          const isCollapsed = collapsed[group.title];
          const groupHasActive = group.items.some(isActive);

          return (
            <div key={group.title} className="space-y-1">
              <button
                type="button"
                onClick={() => toggleGroup(group.title)}
                className={`w-full flex items-center justify-between px-3 py-1 text-[10px] font-black tracking-wider uppercase transition-colors rounded-lg ${
                  groupHasActive ? 'text-admin-primary' : 'text-admin-text-muted hover:text-admin-text'
                }`}
              >
                <span>{group.title}</span>
                {isCollapsed ? (
                  <ChevronLeftIcon className="w-3 h-3 stroke-[2.5]" />
                ) : (
                  <ChevronDownIcon className="w-3 h-3 stroke-[2.5]" />
                )}
              </button>

              {!isCollapsed && (
                <div className="space-y-1 pt-0.5">
                  {group.items.map((item) => {
                    const active = isActive(item);
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleLinkClick}
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 group ${
                          active
                            ? 'bg-admin-primary-soft text-admin-primary border border-admin-primary/20'
                            : 'border border-transparent text-admin-text-muted hover:bg-admin-background hover:text-admin-text'
                        }`}
                      >
                        <div
                          className={`p-1.5 rounded-lg transition-colors ${
                            active
                              ? 'bg-admin-primary text-white'
                              : 'text-admin-text-muted group-hover:text-admin-primary'
                          }`}
                        >
                          <Icon className="w-4 h-4 stroke-[2]" />
                        </div>
                        <span className="truncate">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-3.5 border-t border-admin-border bg-admin-background text-[10px] text-admin-text-muted font-bold text-center shrink-0">
        Erfan Apparel · v1.0
      </div>
    </aside>
  );
}