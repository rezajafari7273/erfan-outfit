'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Squares2X2Icon, 
  ShoppingBagIcon, 
  FolderIcon, 
  UsersIcon,
  Cog6ToothIcon 
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'داشبورد', href: '/admin-panel', icon: Squares2X2Icon },
  { name: 'محصولات', href: '/admin-panel/products', icon: ShoppingBagIcon },
  { name: 'دسته‌بندی‌ها', href: '/admin-panel/categories', icon: FolderIcon },
  { name: 'تنظیمات', href: '/admin-panel/settings', icon: Cog6ToothIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col border-l border-slate-800 shrink-0">
      <div className="h-16 flex items-center justify-between px-6 bg-slate-950/50 border-b border-slate-800">
        <span className="font-bold text-base text-white">پنل مدیریت</span>
        <span className="text-[10px] bg-amber-500/10 text-amber-400 font-bold px-2 py-0.5 rounded border border-amber-500/20">
          ادمین
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}