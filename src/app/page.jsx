"use client";

import React from "react";
import PromotionRenderer from "@/components/promotions/PromotionRenderer";
import PopularCategories from "@/features/home/components/PopularCategories";
import ProductCard from "@/features/products/components/ProductCard";
import InstantOffers from "@/features/home/components/InstantOffers";
import AmazingProducts from "@/features/home/components/AmazingProducts"


export default function Home() {
  return (
      <div className="min-h-screen space-y-12 md:space-y-14">

        {/* stories */}
        <section className="container">
          <PromotionRenderer type="stories" />
        </section>

        
        {/* slider banner */}
        <section className=" mx-auto 2xl:container">
          <PromotionRenderer type="bannerSlider" />
        </section>


        {/* Popular Categories */}
        <section className="container">
          <PopularCategories />
        </section>


        {/* Instans Offers and banners */}
        <section className="container mx-auto ">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch">

            <div className="w-full lg:w-[40%] min-w-0">
              <InstantOffers />
            </div>

            <div className="w-full lg:w-[60%] min-w-0">
              <PromotionRenderer 
                type="smallBanner" 
                slotKey="instantBanners" 
                className="grid-cols-2 gap-3 lg:gap-4 h-full"
              />
            </div>
            
          </div>
        </section>


        <section className="container">
          <AmazingProducts />
        </section>
        



        {/* Categories Section (حفظ شده به صورت ثابت) */}
        <section className="py-16 bg-white mt-10 rounded-t-[3rem]">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">دسته‌بندی‌های محبوب</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "پوشاک زنانه", icon: "👗", color: "bg-pink-100" },
                { name: "پوشاک مردانه", icon: "👔", color: "bg-blue-100" },
                { name: "کیف و کفش", icon: "👠", color: "bg-purple-100" },
                { name: "اکسسوری", icon: "💎", color: "bg-yellow-100" },
              ].map((category, index) => (
                <div
                  key={index}
                  className={`${category.color} rounded-2xl p-8 text-center hover:scale-105 transition-transform cursor-pointer`}
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-gray-800">{category.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products (حفظ شده به صورت ثابت) */}
        {/* <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">محصولات ویژه</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "کیف چرمی زنانه", price: "۱,۲۵۰,۰۰۰ تومان", image: "👜" },
                { name: "کفش اسپرت مردانه", price: "۹۸۰,۰۰۰ تومان", image: "👟" },
                { name: "عینک آفتابی", price: "۴۵۰,۰۰۰ تومان", image: "🕶️" },
                { name: "ساعت مچی لوکس", price: "۲,۸۰۰,۰۰۰ تومان", image: "⌚" },
              ].map((product, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="text-6xl mb-4 text-center">{product.image}</div>
                  <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-amber-600 font-bold">{product.price}</p>
                  <button className="mt-4 w-full bg-amber-600 text-white py-2 rounded-full hover:bg-amber-700 transition-colors">
                    افزودن به سبد
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* 6. استفاده از Small Banners در میانه صفحه */}
        {/* <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">پیشنهادهای ویژه سرچ</h2>
            
            <PromotionRenderer type="smallBanner" slotKey="searchModal" className="md:grid-cols-2" />
          </div>
        </section> */}

        {/* Brands Section (حفظ شده به صورت ثابت) */}
        {/* <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">برندهای معروف</h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
              {["Zara", "H&M", "Nike", "Adidas", "Gucci", "Chanel"].map((brand, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-2xl p-6 text-center hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-gray-700">{brand}</span>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Features (حفظ شده به صورت ثابت) */}
        {/* <section className="py-16 bg-gray-50 rounded-b-[3rem]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: "🚚", title: "ارسال رایگان", desc: "برای خرید بالای ۵۰۰ هزار تومان" },
                { icon: "🔒", title: "پرداخت امن", desc: "ضمانت بازگشت وجه" },
                { icon: "⭐", title: "کیفیت تضمینی", desc: "محصولات اصل و با کیفیت" },
                { icon: "💬", title: "پشتیبانی ۲۴/۷", desc: "پاسخگویی سریع" },
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Newsletter (حفظ شده به صورت ثابت) */}
        {/* <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-2xl">
            <h2 className="text-3xl font-bold text-center mb-4">عضویت در خبرنامه</h2>
            <p className="text-gray-600 text-center mb-8">
              از جدیدترین محصولات و تخفیف‌ها با خبر شوید
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="flex-1 px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-amber-600"
              />
              <button className="px-8 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors whitespace-nowrap">
                ثبت‌نام
              </button>
            </div>
          </div>
        </section> */}

        {/* نمونه استفاده از اسمال بنر در منوی موبایل (به صورت کامنت) */}
        {/* <aside className="md:hidden">
          <PromotionRenderer type="smallBanner" slotKey="mobileMenu" className="h-24 rounded-lg" />
        </aside> */}
      </div>
  
  );
}