"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Input from "@/components/ui/Input";
import {
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  TruckIcon,
  CreditCardIcon,
  BuildingOffice2Icon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";

function FAQContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl);
    }
  }, [searchParams]);

  const categories = [
    { id: "all", name: "همه", icon: QuestionMarkCircleIcon },
    { id: "orders", name: "نحوه ثبت سفارش", icon: ShoppingBagIcon },
    { id: "shipping", name: "رویه ارسال کالا", icon: TruckIcon },
    { id: "payment", name: "شیوه‌های پرداخت", icon: CreditCardIcon },
    { id: "returns", name: "مرجوعی و تعویض", icon: ArrowPathIcon },
    { id: "wholesale", name: "خرید عمده و سفارشی", icon: BuildingOffice2Icon },
  ];

  const faqs = [
    // ================= نحوه ثبت سفارش =================
    {
      category: "orders",
      question: "مراحل ثبت سفارش در سایت به چه صورت است؟",
      answer: (
        <div className="space-y-3">
          <p>ثبت سفارش در مجموعه ما بسیار ساده و سریع طراحی شده است:</p>
          <ol className="list-decimal list-inside space-y-1.5 pr-2 text-slate-700 font-semibold">
            <li>محصول مورد نظر خود را انتخاب کرده و وارد صفحه جزییات شوید.</li>
            <li>رنگ، سایز و تعداد درخواستی را مشخص کرده و بر روی دکمه «افزودن به سبد خرید» کلیک کنید.</li>
            <li>وارد سبد خرید شوید و آدرس دقیق تحویل‌گیرنده و کد پستی را وارد کنید.</li>
            <li>درگاه پرداخت مورد نظر را انتخاب کرده و پرداخت را نهایی کنید.</li>
          </ol>
          <p className="text-xs text-slate-500 pt-1">
            * پس از ثبت موفق، کد پیگیری سفارش از طریق پیامک برای شما ارسال خواهد شد.
          </p>
        </div>
      ),
    },
    {
      category: "orders",
      question: "چگونه سایز مناسب خود را انتخاب کنم تا دچار مشکل نشوم؟",
      answer:
        "در صفحه هر محصول، دکمه «جدول سایزبندی» قرار دارد که ابعاد دقیق هر سایز (عرض سینه، قد لباس، طول آستین و...) به سانتی‌متر درج شده است. پیشنهاد می‌کنیم یکی از لباس‌های خوش‌دوخت خود را روی سطح صاف اندازه‌گیری کرده و با جدول سایز منطبق کنید.",
    },
    {
      category: "orders",
      question: "آیا برای ثبت سفارش حتماً باید در سایت ثبت‌نام کنم؟",
      answer:
        "بله، ثبت‌نام اولیه تنها با وارد کردن شماره موبایل و دریافت کد تایید (OTP) کمتر از ۳۰ ثانیه زمان می‌برد. این کار برای ذخیره آدرس شما، پیگیری لحظه‌ای مرسوله و دسترسی به فاکتورهای خرید الزامی است.",
    },
    {
      category: "orders",
      question: "امکان تغییر یا لغو سفارش پس از ثبت وجود دارد؟",
      answer:
        "تا زمانی که وضعیت سفارش شما در حالت «در حال پردازش» باشد، می‌توانید از طریق تماس با پشتیبانی یا پنل کاربری سفارش را لغو یا ویرایش کنید. در صورت ورود سفارش به مرحله بسته‌بندی و خروج از کارخانه، لغو آن طبق رویه مرجوعی انجام خواهد شد.",
    },

    // ================= رویه ارسال کالا =================
    {
      category: "shipping",
      question: "شیوه‌ها و زمان‌بندی ارسال سفارشات به چه صورت است؟",
      answer:
        "ارسال سفارشات بر اساس مقصد و حجم خرید به ۳ روش انجام می‌شود:\n• پست پیشتاز: ویژه تمامی شهرهای کشور (تحویل ۲ تا ۴ روز کاری پس از تحویل به پست).\n• تیپاکس: ارسال سریع‌تر به سراسر کشور با قابلیت پرداخت کرایه در محل (تحویل ۱ تا ۳ روز کاری).\n• پیک اختصاصی (ویژه تهران/کرج): تحویل سریع در همان روز یا روز کاری بعد.\n• باربری اختصاصی: ویژه سفارشات عمده و حجم بالا با هماهنگی پیش‌فرض.",
    },
    {
      category: "shipping",
      question: "هزینه ارسال کالا چگونه محاسبه می‌شود؟",
      answer:
        "هزینه ارسال با پست پیشتاز بر اساس وزن مرسوله و نرخ مصوب پستی به‌صورت خودکار در مرحله نهایی سبد خرید محاسبه می‌شود. سفارشات بالای سقف تعیین‌شده (خرید خرده‌فروشی) مشمول طرح «ارسال رایگان» خواهند شد.",
    },
    {
      category: "shipping",
      question: "چگونه وضعیت مرسوله خود را پیگیری کنم؟",
      answer:
        "پس از تحویل بسته به اداره پست یا تیپاکس، کد رهگیری ۲۴ رقمی پستی از طریق پیامک ارسال می‌شود. همچنین با مراجعه به «پنل کاربری > بخش سفارش‌های من» می‌توانید کد رهگیری را مشاهده کرده و مستقیماً وضعیت آن را در سامانه پست پیگیری کنید.",
    },

    // ================= شیوه‌های پرداخت =================
    {
      category: "payment",
      question: "چه روش‌هایی برای پرداخت وجه سفارش وجود دارد؟",
      answer:
        "شما می‌توانید هزینه سفارش خود را از روش‌های زیر پرداخت کنید:\n۱. پرداخت آنلاین: از طریق درگاه‌های امن شتابی با تمامی کارت‌های بانکی عضو شتاب.\n۲. کارت به کارت: در موارد خاص یا سفارشات عمده با هماهنگی واحد پشتیبانی.\n۳. پرداخت مرحله‌ای (ویژه سفارشات عمده): ثبت پیش‌فاکتور با تسویه اولیه و تسویه نهایی هنگام تحویل بار.",
    },
    {
      category: "payment",
      question: "آیا درگاه پرداخت آنلاین سایت امن است؟",
      answer:
        "تمامی درگاه‌های پرداخت سایت متصل به شبکه الکترونیکی پرداخت کارت (شاپرک) و دارای گواهی امنیتی SSL هستند. اطلاعات کارت بانکی شما مستقیماً در درگاه رسمی بانک وارد شده و در سایت ما ذخیره نمی‌شود.",
    },
    {
      category: "payment",
      question: "در صورت پرداخت ناموفق و کسر وجه از حساب چه کنم؟",
      answer:
        "در اکثر موارد اگر درگاه بانک تراکنش را ناموفق اعلام کند، مبلغ کسر شده حداکثر ظرف ۷۲ ساعت کاری به‌صورت خودکار توسط سیستم بانکی به حساب شما بازگردانده می‌شود. در صورت عدم بازگشت، با پشتیبانی ما تماس بگیرید تا شماره پیگیری بانکی بررسی شود.",
    },

    // ================= رویه مرجوعی و تعویض =================
    {
      category: "returns",
      question: "شرایط تعویض یا مرجوعی کالا چیست؟",
      answer:
        "سلامت و رضایت شما اولویت اصلی ماست. تا ۷ روز پس از دریافت بسته، در صورت وجود هرگونه آسیب‌دیدگی، ایراد دوخت یا پارچه، و یا مغایرت سایز و رنگ، امکان تعویض یا مرجوعی کالا وجود دارد.",
    },
    {
      category: "returns",
      question: "ضوابط پذیرش کالا برای مرجوعی شامل چه مواردی است؟",
      answer:
        "لباس نباید بوی عطر، بوی بدن یا شستشو گرفته باشد. تمامی اتیکت‌ها، مارک و بسته‌بندی اولیه کارخانه باید کاملاً سالم و متصل به لباس باقی مانده باشند.",
    },
    {
      category: "returns",
      question: "هزینه بازگشت کالا بر عهده چه کسی است؟",
      answer:
        "اگر مرجوعی به دلیل وجود ایراد کیفی در دوخت، پارچه یا اشتباه مجموعه در ارسال سایز/رنگ باشد، تمام هزینه رفت و برگشت بر عهده کارخانه است. در صورتی که تعویض صرفاً به دلیل سلیقه شخصی یا انتخاب نادرست سایز از سوی مشتری باشد، هزینه ارسال با مشتری محترم خواهد بود.",
    },

    // ================= خرید عمده و کارخانه =================
    {
      category: "wholesale",
      question: "شرایط ثبت سفارش عمده و حداقل تعداد خرید چقدر است؟",
      answer:
        "حداقل تعداد ثبت سفارش عمده از هر مدل، یک سری کامل (جین) شامل سایزبندی و رنگ‌بندی‌های استاندارد کارخانه است. برای دریافت لیست قیمت عمده، کاتالوگ و شرایط سفارشی‌سازی (Private Label)، می‌توانید با بخش فروش عمده تماس بگیرید.",
    },
    {
      category: "wholesale",
      question: "چرا قیمت محصولات شما نسبت به بازار مناسب‌تر است؟",
      answer:
        "علت اصلی قیمت مناسب، حذف کامل واسطه‌ها، بنکداران و دلالان صنعت پوشاک است. شما کالا را مستقیماً از خط تولید کارخانه دریافت می‌کنید و تنها هزینه واقعی تولید همراه با سود منصفانه تولیدکننده را می‌پردازید.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      typeof faq.question === "string" && faq.question.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div  className=" container w-full min-h-screen text-slate-800 py-8 ">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* ================= HERO & SEARCH SECTION ================= */}
        <section className="relative overflow-hidden bg-white border border-slate-200/80 rounded-[2.5rem] p-6 sm:p-12 shadow-sm text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black">
            <QuestionMarkCircleIcon className="w-4 h-4" />
            <span>پاسخ به سوالات و راهنمای کامل مشتریان</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-rokh font-bold text-slate-900">
            پرسش‌های متداول <span className="text-primary">و راهنمای خرید</span>
          </h1>

          <p className="text-xs sm:text-sm font-medium text-slate-600 max-w-2xl mx-auto leading-relaxed">
            پاسخ جامع درباره نحوه ثبت سفارش، رویه‌های ارسال، شیوه‌های پرداخت، تعویض کالا و خرید عمده مستقیم از کارخانه.
          </p>

          <div className="max-w-xl mx-auto pt-2">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="سوال یا کلمه مورد نظر خود را جستجو کنید..."
              startIcon={MagnifyingGlassIcon}
              className="py-3.5 text-xs sm:text-sm"
            />
          </div>
        </section>

        {/* ================= QUICK PROCESS STEPS ================= */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <ClipboardDocumentCheckIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900">ثبت سفارش آسان</h4>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">انتخاب سریع سایز و رنگ</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <CreditCardIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900">پرداخت امن</h4>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">درگاه مستقیم و بانکی</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <TruckIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900">ارسال به سراسر کشور</h4>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">پست، تیپاکس و باربری</p>
            </div>
          </div>
        </section>

        {/* ================= CATEGORY TABS ================= */}
        <div className="w-full overflow-x-auto pb-4 pt-1 px-2 scrollbar-none">
          <div className="flex items-center gap-2.5 min-w-max justify-start sm:justify-center mx-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenIndex(null);
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "bg-white border border-slate-200/80 text-slate-600 hover:border-primary/30 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= FAQ ACCORDION LIST ================= */}
        <section className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:border-primary/30 transition-colors"
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-right font-bold text-slate-900 text-xs sm:text-sm leading-snug gap-4 focus:outline-none"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      {faq.question}
                    </span>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-3 text-xs sm:text-sm font-medium text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 whitespace-pre-line">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 text-center space-y-3">
              <p className="text-sm font-bold text-slate-600">پاسخی برای جستجوی شما یافت نشد.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="text-xs font-bold text-primary underline"
              >
                پاک کردن فیلترها
              </button>
            </div>
          )}
        </section>

        {/* ================= STILL HAVE QUESTIONS / CONTACT CARD ================= */}
        <section className="bg-primary/5 border border-primary/15 rounded-[2.5rem] p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-8 space-y-2 text-right">
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                سوال دیگری دارید یا نیاز به مشاوره خرید عمده دارید؟
              </h3>
              <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
                تیم پشتیبانی و مشاوره فروش کارخانه در تمامی روزهای کاری آماده پاسخگویی و راهنمایی شما هستند.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-wrap md:flex-col sm:flex-row gap-3 justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-xs font-bold shadow-sm shadow-primary/20 hover:opacity-95 transition-all w-full sm:w-auto"
              >
                <ChatBubbleLeftRightIcon className="w-4 h-4" />
                <span>ارتباط با پشتیبانی</span>
              </Link>
              <a
                href="tel:02112345678"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-primary text-xs font-bold hover:bg-slate-50 transition-colors w-full sm:w-auto"
              >
                <PhoneIcon className="w-4 h-4 text-secondary" />
                <span>تماس تلفنی با دفتر کارخانه</span>
              </a>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <Suspense fallback={<div className="text-center py-10 font-bold">در حال بارگذاری...</div>}>
      <FAQContent />
    </Suspense>
  );
}