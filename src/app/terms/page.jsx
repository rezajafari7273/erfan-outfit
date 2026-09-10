"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheckIcon,
  ShoppingBagIcon,
  TruckIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  ChevronDownIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

// ایمپورت دکمه اختصاصی شما
import Button from "@/components/ui/Button"; // مسیر فایل Button خود را بررسی کنید

const TERMS_DATA = [
  {
    id: "general",
    title: "شرایط و قوانین عمومی",
    icon: ShieldCheckIcon,
    colorClass: "bg-blue-50 text-blue-600 border-blue-100",
    activeColorClass: "bg-blue-600 text-white border-blue-600",
    dotColor: "bg-blue-500",
    content: [
      "ورود کاربران به وب‌سایت و استفاده از خدمات به معنای آگاه بودن و پذیرفتن شرایط و قوانین فروشگاه است.",
      "تمام فعالیت‌های این سایت منطبق با قوانین جمهوری اسلامی ایران، قانون تجارت الکترونیک و قانون حمایت از حقوق مصرف‌کننده است.",
      "هرگونه تغییر در قوانین و مقررات سایت از طریق همین صفحه اطلاع‌رسانی می‌شود و استفاده مستمر کاربر به منزله پذیرش آخرین تغییرات است.",
    ],
  },
  {
    id: "orders",
    title: "ثبت، پردازش و ارسال سفارش",
    icon: ShoppingBagIcon,
    colorClass: "bg-amber-50 text-amber-600 border-amber-100",
    activeColorClass: "bg-amber-500 text-white border-amber-500",
    dotColor: "bg-amber-500",
    content: [
      "روز کاری به معنی روز شنبه تا پنج شنبه هر هفته، به استثنای تعطیلات عمومی در ایران است و کلیه سفارش‌های ثبت‌شده در طول روزهای کاری و اولین روز پس از تعطیلات پردازش می‌شوند.",
      "کاربران باید هنگام سفارش کالای مورد نظر خود، فرم سفارش را با اطلاعات صحیح و به طور کامل تکمیل کنند. تبعات ورود اطلاعات نادرست بر عهده خریدار خواهد بود.",
      "فروشگاه همواره در ارسال و تحویل کلیه سفارش‌های ثبت‌شده، نهایت دقت و تلاش خود را می‌نماید. با این حال، در صورتی که موجودی محصولی به پایان برسد، حق کنسل کردن آن سفارش و استرداد وجه برای فروشگاه محفوظ است.",
    ],
  },
  {
    id: "delivery",
    title: "شیوه و هزینه‌های ارسال",
    icon: TruckIcon,
    colorClass: "bg-emerald-50 text-emerald-600 border-emerald-100",
    activeColorClass: "bg-emerald-600 text-white border-emerald-600",
    dotColor: "bg-emerald-500",
    content: [
      "ارسال سفارش‌ها در شهر تهران از طریق پیک اختصاصی و برای سایر استان‌ها از طریق پست پیشتاز یا تیپاکس انجام می‌پذیرد.",
      "هزینه ارسال بر اساس وزن، ابعاد و مقصد محموله محاسبه شده و پیش از پرداخت نهایی در سبد خرید به کاربر نمایش داده می‌شود.",
      "تحویل سفارش در اماکن عمومی همچون کافه، کافی نت، هتل و مانند آن امکان‌پذیر نیست و لازم است آدرس تحویل دقیق و قابل استناد باشد.",
    ],
  },
  {
    id: "returns",
    title: "رویه بازگرداندن کالا و استرداد وجه",
    icon: ArrowPathIcon,
    colorClass: "bg-rose-50 text-rose-600 border-rose-100",
    activeColorClass: "bg-rose-600 text-white border-rose-600",
    dotColor: "bg-rose-500",
    content: [
      "خریداران مهلت ۷ روزه جهت تست و بازگرداندن کالا طبق شرایط گارانتی و اصالت سلامت فیزیکی را دارند.",
      "کالاهای مرجوعی باید در بسته‌بندی اولیه، بدون آسیب‌دیدگی ظاهری و به همراه تمامی اقلام و اقلام جانبی همراه بازگردانده شوند.",
      "در صورت انصراف کاربر از خرید (در صورتی که پلمپ کالا باز نشده باشد)، هزینه عودت کالا بر عهده خریدار خواهد بود.",
      "پس از دریافت کالای مرجوعی و تایید واحد کارشناسی، مبلغ طی ۲۴ الی ۴۸ ساعت کاری به حساب خریدار واریز خواهد شد.",
    ],
  },
  {
    id: "privacy",
    title: "حفظ حریم خصوصی اطلاعات",
    icon: DocumentTextIcon,
    colorClass: "bg-purple-50 text-purple-600 border-purple-100",
    activeColorClass: "bg-purple-600 text-white border-purple-600",
    dotColor: "bg-purple-500",
    content: [
      "فروشگاه متعهد می‌شود که از اطلاعات شخصی و هویت کاربران محافظت کرده و این اطلاعات را در اختیار هیچ سازمان یا فرد ثالثی قرار ندهد.",
      "شماره تماس و ایمیل ثبت‌شده توسط کاربر تنها جهت اطلاع‌رسانی مراحل ارسال سفارش، کد تایید ورود و پیشنهادات ویژه فروشگاه استفاده خواهد شد.",
    ],
  },
];

export default function TermsPage() {
  const [openAccordion, setOpenAccordion] = useState("general");

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="bg-gray-50/50 min-h-screen py-8 lg:py-12" dir="rtl">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* هدر صفحه */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 mb-4 shadow-sm border border-blue-100">
            <ShieldCheckIcon className="w-8 h-8 stroke-[1.8]" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-rokh font-black text-gray-900 mb-3">
            شرایط و قوانین استفاده
          </h1>
          <p className="text-xs lg:text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
            لطفاً جهت استفاده بهینه از خدمات و محصولات، قوانین و مقررات زیر را به دقت مطالعه فرمایید.
          </p>
        </div>

        {/* لیست آکاردئونی قوانین */}
        <div className="space-y-4">
          {TERMS_DATA.map((section) => {
            const IconComponent = section.icon;
            const isOpen = openAccordion === section.id;

            return (
              <div
                key={section.id}
                className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden transition-all"
              >
                {/* دکمه آکاردئون */}
                <button
                  onClick={() => toggleAccordion(section.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-right transition-colors hover:bg-gray-50/80 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                        isOpen
                          ? section.activeColorClass
                          : section.colorClass
                      }`}
                    >
                      <IconComponent className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <span className="text-sm lg:text-base font-rokh font-bold text-gray-900">
                      {section.title}
                    </span>
                  </div>

                  <ChevronDownIcon
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-gray-700" : ""
                    }`}
                  />
                </button>

                {/* محتوای متنی */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-50 bg-gray-50/30">
                    <ul className="space-y-3">
                      {section.content.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-xs lg:text-sm text-gray-600 leading-relaxed">
                          <span className={`w-2 h-2 rounded-full ${section.dotColor} mt-2 shrink-0`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* باکس پشتیبانی و پاسخ به سوالات */}
        <div className="mt-12 bg-white border border-gray-100 rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-1">
              سوالی در مورد قوانین دارید؟
            </h3>
            <p className="text-xs text-gray-500">
              تیم پشتیبانی ما همه روزه آماده پاسخگویی به سوالات و ابهامات شماست.
            </p>
          </div>

          <Link href="/contact">
            <Button
              variant="gradient"
              size="lg"
              icon={PhoneIcon}
              iconPosition="right"
            >
              تماس با پشتیبانی
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}