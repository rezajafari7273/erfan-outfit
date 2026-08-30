'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDownIcon,
  CpuChipIcon,
  UserIcon,
  HomeIcon,
  FaceSmileIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';

export default function CategoryTree({ onItemClick }) {
  const [openCategory, setOpenCategory] = useState(null);

  // دیتای استاتیک داخلی
  const categoriesData = [
    {
      id: 'electronics',
      title: 'لوازم الکترونیکی',
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

  const toggleCategory = (id) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  return (
    <div className="w-full space-y-2">
      {categoriesData.map((cat) => {
        const Icon = cat.icon;
        const isOpen = openCategory === cat.id;

        return (
          <div key={cat.id} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
            <button
              onClick={() => toggleCategory(cat.id)}
              className="w-full flex items-center justify-between p-3 text-right hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gray-100 text-[#6f0000]">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-gray-800">{cat.title}</span>
              </div>
              <ChevronDownIcon
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-[#6f0000]' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="bg-gray-50/70 p-3 border-t border-gray-100 space-y-4">
                {cat.subcategories.map((sub) => (
                  <div key={sub.id} className="space-y-2">
                    <span className="text-xs font-bold text-[#6f0000] block pr-2 border-r-2 border-[#6f0000]">
                      {sub.title}
                    </span>
                    <div className="grid grid-cols-2 gap-2 pr-3">
                      {sub.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={`/category/${cat.id}/${sub.id}`}
                          onClick={onItemClick}
                          className="text-xs text-gray-600 hover:text-black py-1 px-2 rounded-lg hover:bg-white transition-colors truncate"
                        >
                          • {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}