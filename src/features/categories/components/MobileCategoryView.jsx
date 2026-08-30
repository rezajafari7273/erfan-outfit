'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronLeftIcon,
  SparklesIcon,
  CpuChipIcon,
  UserIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';

export default function MobileCategoryView() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(null);

  // دیتای استاتیک دسته‌بندی‌ها
  const categoriesData = [
    {
      id: 'electronics',
      title: 'الکترونیک',
      icon: CpuChipIcon,
      subcategories: [
        {
          id: 'mobile',
          title: 'موبایل و تبلت',
          items: ['اپل (Apple)', 'سامسونگ (Samsung)', 'شیائومی (Xiaomi)', 'هواوی (Huawei)'],
        },
        {
          id: 'laptops',
          title: 'لپ‌تاپ و کامپیوتر',
          items: ['ایسوس (Asus)', 'دِل (Dell)', 'لنوو (Lenovo)', 'مک‌بوک'],
        },
      ],
    },
    {
      id: 'fashion',
      title: 'پوشاک و مد',
      icon: UserIcon,
      subcategories: [
        {
          id: 'men',
          title: 'مردانه',
          items: ['پیراهن', 'شلوار', 'کفش ورزشی', 'کت و شلوار'],
        },
        {
          id: 'women',
          title: 'زنانه',
          items: ['مانتو و پالتو', 'کیف و کفش', 'شومیز', 'زیورآلات'],
        },
      ],
    },
    {
      id: 'home',
      title: 'لوازم خانگی',
      icon: HomeIcon,
      subcategories: [
        {
          id: 'kitchen',
          title: 'آشپزخانه',
          items: ['یخچال و فریزر', 'مایکروویو', 'ماشین لباسشویی', 'قهوه‌ساز'],
        },
      ],
    },
  ];

  const [selectedCatId, setSelectedCatId] = useState(categoriesData[0].id);
  const activeCategory = categoriesData.find((c) => c.id === selectedCatId);

  // بررسی سایز صفحه و ریدایرکت در صورت قرار داشتن در دسکتاپ
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        router.replace('/');
      } else {
        setIsMobile(true);
      }
    };

    handleResize(); // بررسی اولیه موقع لود
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [router]);

  // تا زمان مشخص شدن سایز مرورگر چیزی رندر نمی‌شود تا لرزش صفحه ایجاد نشود
  if (isMobile === null) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-130px)] bg-white rounded-2xl border border-gray-100 overflow-hidden my-2" dir="rtl">
      {/* هدر بالای صفحه */}
      <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between shrink-0">
        <h1 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <SparklesIcon className="w-5 h-5 text-primary" />
          دسته‌بندی محصولات
        </h1>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ستون راست (تب دسته‌ها) */}
        <div className="w-28 bg-gray-50 border-l border-gray-100 overflow-y-auto shrink-0">
          {categoriesData.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCatId === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCatId(cat.id)}
                className={`w-full flex flex-col items-center justify-center py-4 px-2 text-center transition-all relative border-b border-gray-100 ${
                  isActive ? 'bg-white text-primary font-bold' : 'text-gray-500'
                }`}
              >
                {isActive && (
                  <span className="absolute right-0 top-0 bottom-0 w-1 bg-primary rounded-l-full" />
                )}
                <div
                  className={`p-2.5 rounded-2xl mb-1 transition-all ${
                    isActive
                      ? 'bg-primary/10 text-primary scale-110'
                      : 'bg-white text-gray-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px]">{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* ستون چپ (نمایش زیرمجموعه‌ها) */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {activeCategory?.subcategories.map((sub) => (
            <div
              key={sub.id}
              className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3 border-b border-gray-50 pb-2">
                <span className="text-xs font-bold text-gray-800">{sub.title}</span>
                <Link
                  href={`/category/${activeCategory.id}/${sub.id}`}
                  className="text-[10px] text-primary font-semibold flex items-center"
                >
                  همه <ChevronLeftIcon className="w-3 h-3" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {sub.items.map((item, idx) => (
                  <Link
                    key={idx}
                    href={`/category/${activeCategory.id}/${sub.id}`}
                    className="p-2 rounded-xl bg-gray-50 text-xs text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors text-center border border-gray-100 truncate"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}