'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import PromotionRenderer from "@/components/promotions/PromotionRenderer";
import Input from '@/components/ui/Input';
import Backdrop from '@/components/ui/Backdrop';
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  EyeIcon,
  ClockIcon,
  MicrophoneIcon,
  XMarkIcon,
  ArrowRightIcon,
  PhotoIcon,
  SwatchIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// لیست جستجوهای ترند برگرفته دقیقاً از مگامنو
const MEGAMENU_TRENDING_ITEMS = [
  'پوشاک مردانه',
  'پوشاک زنانه',
  'کیف و کفش',
  'پوشاک بچگانه',
  'اکسسوری و زیورآلات',
];

async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, {
      ...options,
      headers: { Accept: 'application/json', ...(options.headers || {}) },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('[SEARCH FETCH]', url, err);
    return null;
  }
}

function formatPrice(v) {
  if (v === null || v === undefined) return '';
  return Number(v).toLocaleString('fa-IR');
}

export default function ClothingSearch() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopFocused, setIsDesktopFocused] = useState(false);

  // ست کردن آیتم‌های مگامنو به عنوان مقدار اولیه
  const [trendingSearches, setTrendingSearches] = useState(MEGAMENU_TRENDING_ITEMS);
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const [isImageUploading, setIsImageUploading] = useState(false);
  const [colors, setColors] = useState([]);
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false); // استیت باز/بسته بودن آکاردئون رنگ‌ها

  const recognitionRef = useRef(null);
  const mobileInputRef = useRef(null);
  const suggestTimerRef = useRef(null);
  const imageInputRef = useRef(null);

  // mount: recent + popular + colors
  useEffect(() => {
    (async () => {
      const [trending, recent, popular, colorsData] = await Promise.all([
        safeFetch(`${API_BASE}/search/trending/`),
        safeFetch(`${API_BASE}/search/recent/`),
        safeFetch(`${API_BASE}/search/products/?page_size=2`),
        safeFetch(`${API_BASE}/search/colors/`),
      ]);

      if (Array.isArray(trending) && trending.length > 0) {
        setTrendingSearches(trending.map((t) => t.term));
      }
      if (Array.isArray(recent)) setRecentSearches(recent.map((r) => r.query));
      if (popular && Array.isArray(popular.results)) {
        setPopularProducts(popular.results.slice(0, 2));
      }
      if (Array.isArray(colorsData)) setColors(colorsData);
    })();
  }, []);

  // autocomplete debounce
  useEffect(() => {
    if (suggestTimerRef.current) clearTimeout(suggestTimerRef.current);

    const q = searchTerm.trim();
    if (q.length < 2) {
      setSuggestions([]);
      return;
    }

    suggestTimerRef.current = setTimeout(async () => {
      const data = await safeFetch(
        `${API_BASE}/search/suggest/?q=${encodeURIComponent(q)}`
      );
      if (Array.isArray(data)) setSuggestions(data);
    }, 300);

    return () => clearTimeout(suggestTimerRef.current);
  }, [searchTerm]);

  // lock scroll موبایل
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

  const goToResults = useCallback(
    (q) => {
      const term = (q ?? searchTerm).trim();
      if (!term) return;
      setIsMobileOpen(false);
      setIsDesktopFocused(false);
      router.push(`/products?q=${encodeURIComponent(term)}`);
    },
    [router, searchTerm]
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    goToResults();
  };

  const handleTrendingClick = (term) => {
    setSearchTerm(term);
    goToResults(term);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImageUploading(true);
    setIsDesktopFocused(false);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`${API_BASE}/search/image/`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        alert('خطا در جستجوی تصویر');
        return;
      }

      const data = await res.json();
      const results = data?.results || [];
      const ids = results.map((p) => p.id).join(',');

      if (!ids) {
        alert('محصول مشابهی یافت نشد.');
        return;
      }

      setIsMobileOpen(false);
      router.push(`/products?ids=${ids}`);
    } catch (err) {
      console.error('[IMAGE SEARCH]', err);
      alert('خطا در جستجوی تصویر');
    } finally {
      setIsImageUploading(false);
      e.target.value = '';
    }
  };

  // انتخاب تک‌رنگ و هدایت آنی به صفحه محصولات
  const handleColorClick = (colorId) => {
    setIsDesktopFocused(false);
    setIsMobileOpen(false);
    router.push(`/products?colors=${colorId}&color_ids=${colorId}`);
  };

  // منوی باز شونده رنگ‌ها
  const renderColorPanel = () => (
    <div className="bg-secondary/5 border border-secondary/15 rounded-2xl mb-6 overflow-hidden transition-all duration-300">
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setIsColorMenuOpen(!isColorMenuOpen)}
        className="w-full p-4 flex items-center justify-between hover:bg-secondary/10 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <SwatchIcon className="w-4 h-4 text-secondary stroke-[2]" />
          <span className="text-xs font-rokh font-black text-primary uppercase">
            جستجو بر اساس رنگ
          </span>
        </div>
        <ChevronDownIcon
          className={`w-4 h-4 text-secondary transition-transform duration-300 ${
            isColorMenuOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isColorMenuOpen && (
        <div className="p-4 pt-0 border-t border-secondary/10 mt-2">
          <div className="flex flex-wrap gap-2.5 pt-2">
            {colors.map((c) => (
              <button
                key={c.id}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleColorClick(c.id)}
                className="flex items-center gap-2 px-3 py-2 text-[11px] font-bold rounded-xl border border-secondary/10 bg-white/80 text-gray-700 hover:bg-white hover:border-secondary/40 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="w-[28px] h-[28px] rounded-lg overflow-hidden border border-black/10 shrink-0 relative bg-gray-100 flex items-center justify-center">
                  {c.image ? (
                    <img
                      src={c.image.startsWith('http') ? c.image : `http://127.0.0.1:8000${c.image}`}
                      alt={c.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error(`خطا در بارگذاری تصویر رنگ (${c.name}):`, e.currentTarget.src);
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </div>
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* ================= دسکتاپ ================= */}
      <div
        id="search-wrapper"
        className="hidden lg:flex flex-1 max-w-2xl relative group/search mx-auto"
      >
        <Backdrop
          isOpen={isDesktopFocused}
          onClick={() => setIsDesktopFocused(false)}
          className="top-31.25"
        />

        <div
          className="relative w-full z-[10000]"
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setIsDesktopFocused(false);
            }
          }}
        >
          <form onSubmit={handleSearchSubmit} className="relative w-full z-[10000]">
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-gray-400 pointer-events-none">
              <MagnifyingGlassIcon className="w-5 h-5 stroke-[2.5]" />
            </div>

            <Input
              id="main-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsDesktopFocused(true)}
              autoComplete="off"
              placeholder="جستجوی پوشاک ..."
              className="py-3 bg-gray-200/60 backdrop-blur-md border-secondary/10 rounded-full pr-12 pl-44 text-sm font-bold ring-primary/40 shadow-md"
            />

            <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center h-[75%] gap-2 z-10">
              <div className="h-full w-px bg-secondary/20 ml-1"></div>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
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

          <div
            id="mega-search-panel"
            className={`absolute -top-3 left-[-15px] right-[-15px] pt-[65px] bg-white/95 backdrop-blur-2xl border border-white/40 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] transition-all duration-500 z-[9999] ${
              isDesktopFocused
                ? 'opacity-100 visible translate-y-0'
                : 'opacity-0 invisible translate-y-4'
            }`}
          >
            <div className="p-8">
              {/* Autocomplete */}
              {suggestions.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3 text-gray-800">
                    <MagnifyingGlassIcon className="w-4 h-4 text-primary stroke-[2]" />
                    <span className="text-xs font-black uppercase">پیشنهادات</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <Link
                        key={s.id}
                        href={`/products/${s.slug}`}
                        className="px-4 py-2 bg-gray-100 text-[11px] font-bold text-gray-600 rounded-full hover:bg-primary/10 hover:text-primary transition-all"
                        onClick={() => setIsDesktopFocused(false)}
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* جستجو با تصویر */}
              <div className="mb-6">
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => imageInputRef.current?.click()}
                  disabled={isImageUploading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-dashed border-primary/40 bg-primary/5 text-primary text-xs font-bold hover:bg-primary/10 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isImageUploading ? (
                    <>
                      <ArrowPathIcon className="w-4 h-4 animate-spin" />
                      در حال جستجو...
                    </>
                  ) : (
                    <>
                      <PhotoIcon className="w-4 h-4" />
                      جستجو با تصویر
                    </>
                  )}
                </button>
              </div>

              {/* منوی باز شونده رنگ‌ها */}
              {colors.length > 0 && renderColorPanel()}

              {/* محصولات پربازدید */}
              {popularProducts.length > 0 && (
                <>
                  <div className="flex items-center justify-start gap-3 mb-6">
                    <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                      <EyeIcon className="w-4 h-4 stroke-[2]" />
                    </div>
                    <span className="text-[13px] font-black text-gray-800 uppercase tracking-tighter">
                      محصولات پوشاک پربازدید هفته
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                    {popularProducts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/products/${p.slug}`}
                        onClick={() => setIsDesktopFocused(false)}
                        className="group/card relative flex items-center p-2 bg-white/40 border border-gray-200/50 rounded-[1.8rem] hover:bg-white transition-all duration-500 cursor-pointer shadow-sm"
                      >
                        <div className="relative w-20 h-20 bg-gray-100 rounded-[1.5rem] p-2 flex-shrink-0">
                          {p.thumbnail ? (
                            <Image
                              src={p.thumbnail}
                              alt={p.title}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover rounded-xl group-hover/card:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                              —
                            </div>
                          )}
                        </div>
                        <div className="flex-1 pr-4">
                          <h4 className="text-[12px] font-bold text-gray-800 mb-2 group-hover/card:text-primary transition-colors line-clamp-1">
                            {p.title}
                          </h4>
                          <div className="flex items-center justify-between">
                            <div className="px-3 py-1 bg-gray-100 rounded-xl text-[14px] font-black text-gray-900">
                              {formatPrice(p.final_price)}{' '}
                              <span className="text-[9px] text-gray-400 mr-1 font-bold">
                                تومان
                              </span>
                            </div>
                            <ChevronLeftIcon className="w-4 h-4 ml-2 text-primary opacity-0 -translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all stroke-[3]" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {/* ترند + recent + بنر */}
              <div className="border-t border-dashed border-gray-200 pt-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <span className="text-[13px] font-black text-gray-800 uppercase tracking-tighter">
                    جستجوهای ترند پوشاک
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleTrendingClick(item)}
                        className="px-4 py-2 bg-gray-100 text-[11px] font-bold text-gray-600 hover:border-primary hover:text-primary border border-transparent transition-all cursor-pointer rounded-full"
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  {recentSearches.length > 0 && (
                    <div className="pt-4">
                      <div className="flex items-center gap-2 mb-2 text-gray-800">
                        <ClockIcon className="w-4 h-4 text-primary stroke-[2]" />
                        <span className="text-xs font-black uppercase">
                          جستجوهای اخیر شما
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((item, index) => (
                          <button
                            key={index}
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleTrendingClick(item)}
                            className="px-3 py-1.5 bg-gray-50 text-[11px] font-bold text-gray-500 rounded-full hover:text-primary transition-all cursor-pointer"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-r border-gray-100">
                  <PromotionRenderer type="smallBanner" slotKey="searchModal" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= موبایل ================= */}
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
          <div className="fixed inset-0 z-[99999] bg-white flex flex-col h-full w-full overflow-y-auto">
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

              {suggestions.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <Link
                      key={s.id}
                      href={`/products/${s.slug}`}
                      onClick={() => setIsMobileOpen(false)}
                      className="px-3.5 py-1.5 bg-gray-100 text-xs font-bold text-gray-600 rounded-full"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 p-5 space-y-8">
              {/* جستجو با تصویر */}
              <div>
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  disabled={isImageUploading}
                  className="w-full flex items-center justify-center gap-2 px-3 py-3 rounded-2xl border border-dashed border-primary/40 bg-primary/5 text-primary text-xs font-bold disabled:opacity-50"
                >
                  {isImageUploading ? (
                    <ArrowPathIcon className="w-4 h-4 animate-spin" />
                  ) : (
                    <PhotoIcon className="w-4 h-4" />
                  )}
                  جستجو با تصویر
                </button>
              </div>

              {/* منوی باز شونده رنگ‌ها در موبایل */}
              {colors.length > 0 && renderColorPanel()}

              {popularProducts.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4 text-gray-800">
                    <EyeIcon className="w-4 h-4 text-primary stroke-[2]" />
                    <span className="text-xs font-black uppercase">
                      پوشاک پربازدید هفته
                    </span>
                  </div>
                  <div className="space-y-3">
                    {popularProducts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/products/${p.slug}`}
                        onClick={() => setIsMobileOpen(false)}
                        className="flex items-center p-2.5 bg-gray-50 border border-gray-100 rounded-2xl active:bg-gray-100 transition-colors"
                      >
                        <div className="relative w-16 h-16 bg-white rounded-xl p-1 flex-shrink-0">
                          {p.thumbnail ? (
                            <Image
                              src={p.thumbnail}
                              alt={p.title}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px]">
                              —
                            </div>
                          )}
                        </div>
                        <div className="flex-1 pr-3">
                          <h4 className="text-xs font-bold text-gray-800 mb-1 line-clamp-1">
                            {p.title}
                          </h4>
                          <div className="text-xs font-black text-gray-900">
                            {formatPrice(p.final_price)}{' '}
                            <span className="text-[10px] text-gray-400">تومان</span>
                          </div>
                        </div>
                        <ChevronLeftIcon className="w-4 h-4 text-gray-400 stroke-[2.5]" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {trendingSearches.length > 0 && (
                <div>
                  <span className="block text-xs font-black text-gray-800 uppercase mb-3">
                    جستجوهای ترند پوشاک
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleTrendingClick(item)}
                        className="px-3.5 py-1.5 bg-gray-100 text-xs font-bold text-gray-600 rounded-full active:bg-primary active:text-white transition-all"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3 text-gray-800">
                    <ClockIcon className="w-4 h-4 text-primary stroke-[2]" />
                    <span className="text-xs font-black uppercase">جستجوهای اخیر</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleTrendingClick(item)}
                        className="px-3.5 py-1.5 bg-gray-50 text-xs font-bold text-gray-500 rounded-full"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div onClick={() => setIsMobileOpen(false)}>
                <PromotionRenderer type="smallBanner" slotKey="searchModal" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* hidden file input */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </>
  );
}