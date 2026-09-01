"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBagIcon,
  SparklesIcon,
  HeartIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  Squares2X2Icon,
  EyeIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { FireIcon } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/solid";
import SectionHeader from "@/components/common/SectionHeader";

const categories = [
  {
    id: "coat",
    title: "مانتو و کت",
    icon: ShoppingBagIcon,
    count: 24,
  },
  {
    id: "dress",
    title: "لباس مجلسی",
    icon: SparklesIcon,
    count: 18,
  },
  {
    id: "pants",
    title: "شلوار و دامن",
    icon: Squares2X2Icon,
    count: 32,
  },
  {
    id: "shoes",
    title: "کفش زنانه",
    icon: ShoppingBagIcon,
    count: 15,
  },
  {
    id: "bag",
    title: "شومیز و بلوز",
    icon: HeartIcon,
    count: 21,
  },
  {
    id: "accessory",
    title: "اکسسوری",
    icon: SparklesIcon,
    count: 27,
  },
];

const products = [
  {
    id: 1,
    title: "پیراهن زنانه گل‌دار",
    price: 690000,
    originalPrice: 850000,
    discount: 24,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=85",
    colors: ["#ef4444", "#3b82f6", "#f59e0b"],
    rating: 4.8,
    reviews: 124,
    category: "لباس مجلسی",
    isNew: true,
  },
  {
    id: 2,
    title: "پیراهن زنانه مشکی",
    price: 450000,
    originalPrice: 620000,
    discount: 27,
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=85",
    colors: ["#111827", "#f59e0b"],
    rating: 4.6,
    reviews: 89,
    category: "مانتو و کت",
    isNew: false,
  },
  {
    id: 3,
    title: "پیراهن زنانه قرمز",
    price: 390000,
    originalPrice: 520000,
    discount: 25,
    image:
      "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=700&q=85",
    colors: ["#111827", "#84cc16", "#d1d5db"],
    rating: 4.9,
    reviews: 203,
    category: "شلوار و دامن",
    isNew: true,
  },
  {
    id: 4,
    title: "پیراهن تابستانی زنانه",
    price: 350000,
    originalPrice: 480000,
    discount: 18,
    image:
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=700&q=85",
    colors: ["#111827", "#3b82f6", "#f59e0b"],
    rating: 4.7,
    reviews: 156,
    category: "کفش زنانه",
    isNew: false,
  },
  {
    id: 5,
    title: "کت اسپرت زنانه",
    price: 1250000,
    originalPrice: 1680000,
    discount: 26,
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=700&q=85",
    colors: ["#1a1a2e", "#d4a373", "#e63946"],
    rating: 4.5,
    reviews: 67,
    category: "مانتو و کت",
    isNew: true,
  },
  {
    id: 6,
    title: "شومیز مجلسی",
    price: 850000,
    originalPrice: 1200000,
    discount: 29,
    image:
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=700&q=85",
    colors: ["#f8f9fa", "#ced4da", "#6c757d"],
    rating: 4.8,
    reviews: 98,
    category: "شومیز و بلوز",
    isNew: false,
  },
];

export default function LatestProducts() {
  const [activeCategory, setActiveCategory] = useState("pants");
  const [currentPage, setCurrentPage] = useState(0);

  // فیلتر محصولات بر اساس دسته
  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter((p) => {
        const categoryMap = {
          coat: "مانتو و کت",
          dress: "لباس مجلسی",
          pants: "شلوار و دامن",
          shoes: "کفش زنانه",
          bag: "شومیز و بلوز",
          accessory: "اکسسوری",
        };
        return p.category === categoryMap[activeCategory];
      });

  // محصولات هر صفحه (۲ عدد در هر صفحه)
  const productsPerPage = 2;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section dir="rtl" className="w-full bg-[#fcf8ff] py-10 sm:py-14 lg:py-16">
      <div className="mx-auto w-full">
        {/* Header با SectionHeader - هم دکمه و هم ساب تایتل */}
        <div className="mb-7">
          <SectionHeader
            icon={FireIcon}
            titlePrimary="جدیدترین"
            titleSecondary="محصولات"
            watermarkText="NEW PRODUCTS"
            watermarkTextMobile="NEW"
            subtitleMain="آخرین و جدیدترین محصولات"
            subtitleHighlight="جدیدترین"
            subtitleSub="با بهترین کیفیت و قیمت مناسب"
            showSubtitle={true}
            showButton={true}
            buttonText="مشاهده همه محصولات"
            buttonTextMobile="مشاهده همه"
            buttonHref="/products"
          />
        </div>

        {/* نوار فیلتر - فقط در سایز کمتر از lg (موبایل و تبلت) */}
        <div className="lg:hidden mb-4">
          <div className="flex items-center gap-2 p-1.5 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/10 shadow-sm overflow-x-auto no-scrollbar">
            {categories.map((category) => {
              const active = category.id === activeCategory;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setCurrentPage(0);
                  }}
                  className={`
                    px-4 py-2 rounded-xl font-black text-xs transition-all duration-300 whitespace-nowrap
                    ${
                      active
                        ? "bg-gradient-to-l from-[#ff3ea5] to-[#ff65bc] text-white shadow-lg shadow-pink-500/25"
                        : "text-gray-500 hover:bg-white/50 transition-all duration-300"
                    }
                  `}
                >
                  {category.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main box */}
        <div className="relative rounded-[32px] bg-white/60 p-3 shadow-[0_15px_60px_rgba(92,55,130,0.06)] sm:p-4 lg:p-5 backdrop-blur-sm border border-white/50">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[235px_minmax(0,1fr)]">
            {/* =========================
                Sidebar - فقط در سایزهای بزرگتر از lg (دسکتاپ)
            ========================== */}
            <aside className="hidden lg:block order-1 rounded-[26px] bg-white p-3 shadow-[0_8px_40px_rgba(0,0,0,0.025)] lg:order-none">
              <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const active = category.id === activeCategory;

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => {
                        setActiveCategory(category.id);
                        setCurrentPage(0);
                      }}
                      className={`
                        group
                        flex
                        min-w-max
                        items-center
                        justify-between
                        gap-5
                        rounded-[18px]
                        px-4
                        py-3.5
                        text-right
                        text-sm
                        transition-all
                        duration-300
                        lg:w-full
                        relative
                        ${active
                          ? `
                            bg-gradient-to-l
                            from-[#ff3ea5]
                            to-[#ff65bc]
                            text-white
                            shadow-[0_8px_25px_rgba(255,62,165,0.25)]
                          `
                          : `
                            bg-transparent
                            text-zinc-400
                            hover:bg-pink-50
                            hover:text-pink-500
                          `
                        }
                      `}
                    >
                      <span className="font-medium flex items-center gap-2">
                        {category.title}
                        <span className={`
                          text-[10px] px-1.5 py-0.5 rounded-full
                          ${active
                            ? "bg-white/20 text-white"
                            : "bg-gray-100 text-gray-400"
                          }
                        `}>
                          {category.count}
                        </span>
                      </span>

                      <Icon
                        className={`
                          h-[19px]
                          w-[19px]
                          shrink-0
                          stroke-[1.4]
                          ${active
                            ? "text-white"
                            : "text-zinc-300 group-hover:text-pink-400"
                          }
                        `}
                      />
                    </button>
                  );
                })}
              </div>

              {/* بنر تبلیغاتی در سایدبار */}
              <div className="mt-4 p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl border border-pink-100/50 hidden lg:block">
                <div className="text-center">
                  <span className="text-3xl block mb-2">🎯</span>
                  <h4 className="text-sm font-bold text-gray-800">تخفیف ویژه</h4>
                  <p className="text-[10px] text-gray-500 mt-1">تا ۵۰٪ تخفیف برای اعضای جدید</p>
                  <Link
                    href="/offers"
                    className="inline-block mt-3 px-4 py-1.5 bg-gradient-to-l from-[#ff3ea5] to-[#ff65bc] text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all"
                  >
                    مشاهده پیشنهادات
                  </Link>
                </div>
              </div>
            </aside>

            {/* =========================
                Products Area - سمت چپ
            ========================== */}
            <div className="relative min-w-0">
              {/* Navigation buttons - عمودی سمت چپ */}
              <div className="absolute -left-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentPage === 0}
                  aria-label="محصولات قبلی"
                  className={`
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-[10px]
                    transition
                    duration-200
                    ${
                      currentPage === 0
                        ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                        : "bg-gradient-to-b from-[#ff3fa7] to-[#f8379b] text-white shadow-[0_6px_18px_rgba(248,55,155,0.28)] hover:-translate-y-0.5"
                    }
                  `}
                >
                  <ChevronUpIcon className="h-4 w-4 stroke-[1.5]" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentPage >= totalPages - 1}
                  aria-label="محصولات بعدی"
                  className={`
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-[10px]
                    transition
                    duration-200
                    ${
                      currentPage >= totalPages - 1
                        ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                        : "border border-pink-200 bg-white text-pink-400 hover:border-pink-400 hover:bg-pink-50"
                    }
                  `}
                >
                  <ChevronDownIcon className="h-4 w-4 stroke-[1.5]" />
                </button>
              </div>

              {/* Products grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {displayedProducts.length > 0 ? (
                  displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12 text-gray-400">
                    <span className="text-4xl block mb-3">🛍️</span>
                    <p className="text-sm">محصولی در این دسته‌بندی یافت نشد</p>
                  </div>
                )}
              </div>

              {/* Pagination indicators */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-5 lg:hidden">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className={`
                        w-2 h-2 rounded-full transition-all duration-300
                        ${currentPage === index
                          ? "bg-pink-500 w-6"
                          : "bg-gray-300 hover:bg-gray-400"
                        }
                      `}
                    />
                  ))}
                </div>
              )}

              {/* تعداد محصولات */}
              <div className="text-center text-xs text-gray-400 mt-4 lg:hidden">
                {filteredProducts.length} محصول
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const brand = product.category || "برند";

  return (
    <div
      className="product-card group relative bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-gray-200 p-2 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-600/20 hover:-translate-y-2 overflow-hidden"
      data-category={product.category}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* واترمارک NEW - در پس‌زمینه سمت چپ */}
      <span className="absolute -left-2 bottom-0 text-6xl sm:text-7xl lg:text-8xl font-black text-gray-100 group-hover:text-pink-100 transition-colors duration-500 -z-10 select-none tracking-tighter">
        NEW
      </span>

      <div className="flex h-[220px]">
        {/* سمت چپ: تصویر و برچسب‌ها */}
        <div className="w-2/5 relative bg-gradient-to-br from-secondary-50 to-transparent rounded-[2rem] overflow-hidden flex items-center justify-center m-1 transition-all duration-500">
          <Image
            src={product.image}
            alt={product.title}
            width={128}
            height={128}
            unoptimized={true}
            className="w-32 h-32 object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6"
          />

          {/* برچسب‌ها */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-emerald-500 text-white text-[9px] font-black px-2.5 py-1 rounded-lg shadow-lg">
                جدید
              </span>
            )}
            {product.discount && (
              <span className="bg-rose-500 text-white text-[9px] font-black px-2.5 py-1 rounded-lg shadow-lg">
                {product.discount}%
              </span>
            )}
          </div>

          {/* دکمه لایک */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute bottom-3 left-3 z-20 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all hover:scale-110"
          >
            <HeartIcon
              className={`w-4 h-4 transition-colors ${
                isLiked ? "fill-rose-500 text-rose-500" : "text-gray-600"
              }`}
            />
          </button>
        </div>

        {/* سمت راست: اطلاعات محصول */}
        <div className="w-3/5 p-5 flex flex-col justify-between relative z-10">
          <div>
            <span className="text-[10px] font-bold text-primary-600 tracking-tighter opacity-80 mb-1 block">
              {brand}
            </span>
            <h3 className="font-black text-gray-900 text-base leading-tight mb-2 line-clamp-2">
              {product.title}
            </h3>
            <p className="text-[10px] text-gray-500 font-medium line-clamp-2 leading-relaxed">
              {product.rating && (
                <span className="flex items-center gap-1">
                  <StarIcon className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                  <span className="text-[10px] text-gray-400">({product.reviews} نظر)</span>
                </span>
              )}
            </p>
          </div>

          <div className="mt-auto">
            <div className="mb-3 text-left">
              <div className="flex items-baseline justify-end gap-1">
                <span className="text-[10px] text-gray-400 line-through ml-2">
                  {new Intl.NumberFormat("fa-IR").format(product.originalPrice)}
                </span>
                <span className="text-xl font-black text-gray-900 tracking-tighter">
                  {new Intl.NumberFormat("fa-IR").format(product.price)}
                </span>
                <span className="text-[10px] font-bold text-gray-500">تومان</span>
              </div>
            </div>

            <Link
              href={`/products/${product.id}`}
              className="w-full py-3 bg-gradient-to-l from-[#ff3ea5] to-[#ff65bc] text-white rounded-xl text-[11px] font-black shadow-lg transition-all flex items-center justify-center gap-2 group/btn hover:shadow-xl"
            >
              <span>خرید سریع</span>
              <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}