"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import MegaMenu from './components/MegaMenu';
import GlobalSearch from './components/GlobalSearch';
import Logo from '@/components/ui/Logo';
import AuthModal from '@/features/auth/components/AuthModal';

import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  EyeIcon,
  ClockIcon,
  UserIcon,
  ShoppingBagIcon,
  QuestionMarkCircleIcon,
  MapPinIcon,
  Bars3Icon,
  FireIcon,
  SparklesIcon,
  BookOpenIcon,
  InformationCircleIcon,
  PhoneIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';

const NAV_ITEMS = [
  { href: '/deals', label: 'شگفت‌انگیزها', icon: FireIcon },
  { href: '/best-sellers', label: 'پرفروش‌ترین‌ها', icon: SparklesIcon },
  { href: '/blog', label: 'وبلاگ', icon: BookOpenIcon },
  { href: '/about', label: 'درباره ما', icon: InformationCircleIcon },
  { href: '/contact', label: 'تماس باما', icon: PhoneIcon },
];

export default function DesktopHeader() {
  const [hideNav, setHideNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [topHeaderHeight, setTopHeaderHeight] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // ۲. استیت مدیریت وضعیت نمایش مودال ورود / ثبت‌نام
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const topHeaderRef = useRef(null);

  // اندازه‌گیری ارتفاع بخش بالایی
  useEffect(() => {
    if (topHeaderRef.current) {
      setTopHeaderHeight(topHeaderRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHideNav(true); 
      } else if (currentScrollY < lastScrollY) {
        setHideNav(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="sticky top-0 z-50">
      
      {/* Top Section - Always Visible */}
      <div
        ref={topHeaderRef}
        className={`bg-white relative z-50 transition-all duration-300 ${
          hideNav
            ? 'border-b border-secondary/20 shadow-sm'
            : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto px-4">
          <div className="flex items-center justify-between h-20 gap-8">
            
            {/* بخش راست: لوگو + گلوبال سرچ */}
            <div className="flex items-center gap-6 flex-1 max-w-3xl">
              {/* Logo */}
              <Logo width={150} height={45} priority={true} />

              {/* Search Bar & Mega Dropdown */}
              <GlobalSearch />
            </div>

            {/* بخش چپ: دکمه‌های اکشن */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Cart Button */}
              <Link
                href="/cart"
                id="cart-btn"
                className="relative p-3 rounded-full border border-secondary/10 bg-gray-200/60 backdrop-blur-md hover:border-secondary/20 hover:bg-gray-200 hover:text-white transition-all duration-300 group shadow-lg shadow-secondary-500/10"
              >
                <ShoppingBagIcon className="w-5 h-5 text-secondary transition-colors stroke-[1.8]" />
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-lg">
                  2
                </span>
              </Link>

              {/* ۳. دکمه باز کردن مودال ورود / ثبت‌نام */}
              <button
                type="button"
                id="login-btn"
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 px-4 py-3 rounded-full border border-secondary/10 bg-gray-200/60 backdrop-blur-md hover:border-secondary/20 hover:bg-gray-200 transition-all duration-300 group shadow-md cursor-pointer"
              >
                <UserIcon className="w-5 h-5 text-secondary group-hover:text-primary-600 transition-colors stroke-[1.8]" />
                <span className="text-xs font-black text-primary hidden lg:block uppercase tracking-tighter">
                  ورود یا ثبت‌نام
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav
        className="bg-white border-b border-secondary/20 shadow-sm transition-transform duration-500 ease-in-out relative"
        style={{
          transform: hideNav ? `translateY(-${topHeaderHeight}px)` : 'translateY(0)',
          willChange: 'transform',
        }}
      >
        <div className="mx-auto px-8">
          <ul 
            className="flex items-center gap-x-6 py-3"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Mega Menu Integration */}
            <MegaMenu 
              isHovered={hoveredIndex === 'mega'} 
              onMouseEnter={() => setHoveredIndex('mega')} 
            />

            <div className="h-4 w-[1px] bg-gray-200 shrink-0"></div>

            {/* Navigation Items */}
            {NAV_ITEMS.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li 
                  key={item.href + index}
                  className="relative py-2 cursor-pointer group"
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-gray-600 flex items-center gap-1.5 transition-colors"
                  >
                    <IconComponent className="w-4 h-4 text-gray-400 stroke-[1.8]" />
                    <span>{item.label}</span>
                  </Link>

                  {/* Dynamic Framer Motion Underline */}
                  {hoveredIndex === index && (
                    <motion.div
                      layoutId="activeHeaderUnderline"
                      className="absolute -bottom-[12px] right-0 left-0 h-[2px] bg-primary rounded-full z-20"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}

            <div className="h-4 w-[1px] bg-gray-200 shrink-0"></div>

            {/* Collaboration Link */}
            <li 
              className="relative py-2 cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(99)}
            >
              <Link
                href="/partnership"
                className="text-sm font-medium text-gray-600 flex items-center gap-1.5 transition-colors"
              >
                <BriefcaseIcon className="w-4 h-4 text-gray-400 stroke-[1.8]" />
                <span>همکاری</span>
              </Link>
              {hoveredIndex === 99 && (
                <motion.div
                  layoutId="activeHeaderUnderline"
                  className="absolute -bottom-[12px] right-0 left-0 h-[2px] bg-primary rounded-full z-20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </li>

            <li className="mr-auto flex items-center gap-4">
              <div className="h-4 w-[1px] bg-gray-200"></div>

              <Link
                href="/location"
                className="flex items-center gap-1.5 text-xs font-bold text-primary/80 hover:text-primary transition-colors"
              >
                <MapPinIcon className="w-5 h-5 text-secondary " />
                ارسال به:{' '}
                <span className="text-gray-800">
                  تهران، سعادت‌آباد
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* ۴. کامپوننت مودال ثبت‌نام/ورود */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
}