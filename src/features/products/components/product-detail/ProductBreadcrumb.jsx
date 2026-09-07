import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function ProductBreadcrumb() {
  return (
    <nav className="flex items-center gap-2 text-xs text-gray-400 py-2 overflow-x-auto">
      <a href="#" className="hover:text-gray-600 shrink-0">کالای دیجیتال</a>
      <ChevronLeftIcon className="w-3 h-3 shrink-0" />
      <a href="#" className="hover:text-gray-600 shrink-0">لوازم جانبی کامپیوتر</a>
      <ChevronLeftIcon className="w-3 h-3 shrink-0" />
      <a href="#" className="hover:text-gray-600 shrink-0">ماوس</a>
      <ChevronLeftIcon className="w-3 h-3 shrink-0" />
      <span className="text-gray-600 font-medium truncate">ماوس بی سیم هیسکا مدل HX-MO365</span>
    </nav>
  );
}