'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PromotionRenderer from "@/components/promotions/PromotionRenderer";
import Input from '@/components/ui/Input';
import Backdrop from '@/components/ui/Backdrop';
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  EyeIcon,
  ClockIcon,
  MicrophoneIcon,
  XMarkIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

export default function ClothingSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopFocused, setIsDesktopFocused] = useState(false);
  
  const recognitionRef = useRef(null);
  const mobileInputRef = useRef(null);

  // جستجوهای ترند مرتبط با پوشاک
  const trendingSearches = [
    'کت شلوار مجلسی',
    'تیشرکت مردانه',
    'پیراهن زنانه',
    'کیف چرمی',
    'کفش اسپرت',
  ];

  // جستجوهای اخیر مرتبط با پوشاک
  const recentSearches = ['شلوار جین', 'مانتو', 'پالتو', 'کیف دستی'];

  // جلوگیری از اسکرول صفحه در زمان باز بودن مودال موبایل
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => mobileInputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileOpen]);

  const handleVoiceSearch = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('مرورگر شما از قابلیت جستجوی صوتی پشتیبانی نمی‌کند.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.lang = 'fa-IR';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('خطای جستجوی صوتی:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          alert('دسترسی به میکروفن مسدود است.');
        }
      };

      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (err) {
      console.error('خطا در اجرای SpeechRecognition:', err);
      setIsListening(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log('Searching for clothing:', searchTerm);
      setIsMobileOpen(false);
      setIsDesktopFocused(false);
    }
  };

  return (
    <>
      {/* ----------------- حالت دسکتاپ ----------------- */}
      <div
        id="search-wrapper"
        className="hidden lg:flex flex-1 max-w-2xl relative group/search mx-auto"
      >
        <Backdrop 
          isOpen={isDesktopFocused} 
          onClick={() => setIsDesktopFocused(false)} 
          className="top-31.25" 
        />

        <div className="relative w-full z-[10000]">
          <form onSubmit={handleSearchSubmit} className="relative w-full z-[10000]">
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-gray-400 pointer-events-none">
              <MagnifyingGlassIcon className="w-5 h-5 stroke-[2.5]" />
            </div>

            <Input
              id="main-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsDesktopFocused(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setIsDesktopFocused(false);
                }
              }}
              autoComplete="off"
              placeholder="جستجوی پوشاک ..."
              className="py-3 bg-gray-200/60 backdrop-blur-md border-secondary/10 rounded-full pr-12 pl-44 text-sm font-bold ring-primary/40 shadow-md"
            />

            <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center h-[75%] gap-2 z-10">
              <div className="h-full w-px bg-secondary/20 ml-1"></div>
              <button
                type="button"
                onClick={handleVoiceSearch}
                title="جستجوی صوتی"
                className={`p-2.5 px-5.5 rounded-xl transition-all duration-300 group/archive bg-white shadow-sm cursor-pointer ${
                  isListening
                    ? 'bg-secondary text-white animate-pulse shadow-md shadow-primary/30'
                    : 'border-0 text-secondary/80 hover:text-secondary hover:scale-110'
                }`}
              >
                <MicrophoneIcon className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </form>

          {/* پنل مگاسرچ دسکتاپ */}
          <div
            id="mega-search-panel"
            className={`absolute -top-3 left-[-15px] right-[-15px] pt-[65px] bg-white/95 backdrop-blur-2xl border border-white/40 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] transition-all duration-500 z-[9999] ${
              isDesktopFocused
                ? 'opacity-100 visible translate-y-0'
                : 'opacity-0 invisible translate-y-4'
            }`}
          >
            <div className="p-8">
              <div className="flex items-center justify-start gap-3 mb-6">
                <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                  <EyeIcon className="w-4 h-4 stroke-[2]" />
                </div>
                <span className="text-[13px] font-black text-gray-800 uppercase tracking-tighter">
                  محصولات پوشاک پربازدید هفته
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                {[1, 2].map((id) => (
                  <div
                    key={id}
                    className="group/card relative flex items-center p-2 bg-white/40 border border-gray-200/50 rounded-[1.8rem] hover:bg-white transition-all duration-500 cursor-pointer shadow-sm"
                  >
                    <div className="relative w-20 h-20 bg-gray-100 rounded-[1.5rem] p-2 flex-shrink-0">
                      <Image
                        src={`/assets/images/clothing/clothing-${id}.jpg`}
                        alt="پوشاک"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover rounded-xl group-hover/card:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 pr-4">
                      <h4 className="text-[12px] font-bold text-gray-800 mb-2 group-hover/card:text-primary transition-colors line-clamp-1">
                        {id === 1 ? 'کت و شلوار مجلسی مردانه' : 'مانتو زنانه بهاره'}
                      </h4>
                      <div className="flex items-center justify-between">
                        <div className="px-3 py-1 bg-gray-100 rounded-xl text-[14px] font-black text-gray-900">
                          {id === 1 ? '۴,۵۰۰,۰۰۰' : '۳,۲۰۰,۰۰۰'}{' '}
                          <span className="text-[9px] text-gray-400 mr-1 font-bold">
                            تومان
                          </span>
                        </div>
                        <ChevronLeftIcon className="w-4 h-4 ml-2 text-primary opacity-0 -translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all stroke-[3]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-gray-200 pt-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <span className="text-[13px] font-black text-gray-800 uppercase tracking-tighter">
                    جستجوهای ترند پوشاک
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((item, index) => (
                      <Link
                        key={index}
                        href="#"
                        className="px-4 py-2 bg-gray-100 text-[11px] font-bold text-gray-500 rounded-full hover:border-primary hover:text-primary border border-transparent transition-all"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="border-r border-gray-100">
                  <PromotionRenderer type="smallBanner" slotKey="searchModal" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- حالت موبایل ----------------- */}
      <div className="flex lg:hidden w-full items-center gap-2">
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center gap-2 flex-1 py-2.5 px-4 bg-gray-200/60 backdrop-blur-md rounded-full text-gray-400 text-sm font-bold shadow-sm"
        >
          <MagnifyingGlassIcon className="w-5 h-5 stroke-[2.5]" />
          <span>جستجوی پوشاک ...</span>
        </button>

        <button
          type="button"
          onClick={handleVoiceSearch}
          title="جستجوی صوتی"
          className={`p-2.5 rounded-xl border border-secondary/10 bg-gray-100 text-secondary flex items-center gap-1.5 active:scale-95 transition-all flex-shrink-0 ${
            isListening
              ? 'bg-secondary text-white animate-pulse shadow-md'
              : 'bg-gray-200/60 backdrop-blur-md text-gray-700 hover:bg-gray-300/80'
          }`}
        >
          <MicrophoneIcon className="w-5 h-5 stroke-[2]" />
        </button>

        {isMobileOpen && (
          <div className="fixed inset-0 z-[99999] bg-white flex flex-col h-full w-full overflow-y-auto animate-in fade-in slide-in-from-bottom duration-300">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 shadow-sm z-10">
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 text-gray-600 hover:text-black rounded-full"
                >
                  <ArrowRightIcon className="w-6 h-6 stroke-[2]" />
                </button>

                <div className="relative flex-1">
                  <Input
                    ref={mobileInputRef}
                    id="mobile-search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoComplete="off"
                    placeholder="جستجوی پوشاک ..."
                    className="py-2.5 bg-gray-100 border-none rounded-full pr-4 pl-12 text-sm font-bold w-full focus:ring-2 focus:ring-primary/40"
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm('')}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      <XMarkIcon className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleVoiceSearch}
                  className={`p-2.5 rounded-full transition-all ${
                    isListening
                      ? 'bg-secondary text-white animate-pulse'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <MicrophoneIcon className="w-5 h-5 stroke-[2]" />
                </button>
              </form>
            </div>

            <div className="flex-1 p-5 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4 text-gray-800">
                  <EyeIcon className="w-4 h-4 text-primary stroke-[2]" />
                  <span className="text-xs font-black uppercase">
                    پوشاک پربازدید هفته
                  </span>
                </div>
                <div className="space-y-3">
                  {[1, 2].map((id) => (
                    <div
                      key={id}
                      className="flex items-center p-2.5 bg-gray-50 border border-gray-100 rounded-2xl active:bg-gray-100 transition-colors"
                    >
                      <div className="relative w-16 h-16 bg-white rounded-xl p-1 flex-shrink-0">
                        <Image
                          src={`/assets/images/clothing/clothing-${id}.jpg`}
                          alt="پوشاک"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 pr-3">
                        <h4 className="text-xs font-bold text-gray-800 mb-1 line-clamp-1">
                          {id === 1 ? 'کت و شلوار مجلسی مردانه' : 'مانتو زنانه بهاره'}
                        </h4>
                        <div className="text-xs font-black text-gray-900">
                          {id === 1 ? '۴,۵۰۰,۰۰۰' : '۳,۲۰۰,۰۰۰'}{' '}
                          <span className="text-[10px] text-gray-400">تومان</span>
                        </div>
                      </div>
                      <ChevronLeftIcon className="w-4 h-4 text-gray-400 stroke-[2.5]" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-xs font-black text-gray-800 uppercase mb-3">
                  جستجوهای ترند پوشاک
                </span>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSearchTerm(item)}
                      className="px-3.5 py-1.5 bg-gray-100 text-xs font-bold text-gray-600 rounded-full active:bg-primary active:text-white transition-all"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div onClick={() => setIsMobileOpen(false)}>
                  <PromotionRenderer type="smallBanner" slotKey="searchModal" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}