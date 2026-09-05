"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  EyeIcon,
  EyeSlashIcon,
  SparklesIcon,
  ShoppingBagIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? "Login Data:" : "Register Data:", formData);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FDFBF7] p-4 sm:p-6 lg:p-8 select-none font-sans dir-rtl">
      {/* کارت اصلی با افکت شیشه‌ای و سایه لایه‌ای */}
      <div className="relative w-full max-w-5xl h-auto min-h-[620px] bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-stone-200/60 shadow-[0_20px_70px_rgba(0,0,0,0.08)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* =========================================
            بخش سمت راست: بنر تبلیغاتی و استایل مد (فقط دسکتاپ)
           ========================================= */}
        <div className="relative hidden lg:flex lg:col-span-5 bg-gradient-to-br from-rose-950 via-neutral-900 to-black p-8 text-white flex-col justify-between overflow-hidden">
          {/* پس‌زمینه دکوراتیو با افکت نوری و واترمارک */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <span className="absolute -left-10 bottom-10 text-[110px] font-black text-white/5 tracking-tighter uppercase pointer-events-none font-serif leading-none">
            FASHION
          </span>

          {/* هدر بنر */}
          <div className="relative z-10 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <ShoppingBagIcon className="w-5 h-5" />
              </div>
              <span className="font-black text-lg tracking-tight text-stone-100">
                LUXE<span className="text-amber-400">MODE</span>
              </span>
            </Link>
          </div>

          {/* محتوای متنی بنر */}
          <div className="relative z-10 my-auto py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 text-xs font-bold mb-4"
            >
              <SparklesIcon className="w-4 h-4" />
              <span>کالکشن جدید زمستانه رسید</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl font-black leading-tight text-white mb-4"
            >
              استایل خاص خودت را <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-300 to-amber-400">
                کشف و خلق کن
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs text-stone-300 font-medium leading-relaxed max-w-xs"
            >
              با عضویت در لوکس‌مد، از جدیدترین تخفیف‌های داغ، پیشنهادات شگفت‌انگیز و ارسال رایگان بهره‌مند شوید.
            </motion.p>
          </div>

          {/* فوتر بنر */}
          <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/10 text-stone-400 text-xs font-medium">
            <span>© ۲۰۲۶ تمامی حقوق محفوظ است</span>
            <Link href="/" className="hover:text-amber-300 transition-colors flex items-center gap-1">
              بازگشت به فروشگاه
              <ArrowRightIcon className="w-3.5 h-3.5 rotate-180" />
            </Link>
          </div>
        </div>

        {/* =========================================
            بخش سمت چپ: فرم لاگین / ثبت‌نام
           ========================================= */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between relative z-10">
          
          {/* هدر موبایل (در دسکتاپ مخفی است) */}
          <div className="flex lg:hidden items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-rose-950 text-amber-400 flex items-center justify-center">
                <ShoppingBagIcon className="w-5 h-5" />
              </div>
              <span className="font-black text-base text-stone-900">
                LUXE<span className="text-rose-900">MODE</span>
              </span>
            </Link>
            <Link href="/" className="text-xs font-bold text-stone-500 hover:text-rose-900">
              فروشگاه ←
            </Link>
          </div>

          <div className="max-w-md w-full mx-auto my-auto">
            
            {/* دکمه‌های سوییچ بین ورود و ثبت نام */}
            <div className="relative p-1.5 bg-stone-100/80 rounded-2xl flex items-center mb-8 border border-stone-200/50">
              <button
                onClick={() => setIsLogin(true)}
                className={`relative flex-1 py-2.5 text-xs sm:text-sm font-bold transition-all duration-300 z-10 ${
                  isLogin ? "text-stone-900" : "text-stone-500 hover:text-stone-800"
                }`}
              >
                ورود به حساب
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`relative flex-1 py-2.5 text-xs sm:text-sm font-bold transition-all duration-300 z-10 ${
                  !isLogin ? "text-stone-900" : "text-stone-500 hover:text-stone-800"
                }`}
              >
                ایجاد حساب جدید
              </button>

              {/* بک‌گراند متحرم برای لغزش روی تب‌ها */}
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute inset-y-1.5 rounded-xl bg-white shadow-sm border border-stone-200/80"
                style={{
                  width: "calc(50% - 6px)",
                  right: isLogin ? "6px" : "calc(50%)",
                }}
              />
            </div>

            {/* تیتر فرم */}
            <div className="mb-6 text-right">
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 mb-1">
                {isLogin ? "خوش آمدید! 👋" : "به خانواده ما بپیوندید ✨"}
              </h2>
              <p className="text-xs text-stone-500 font-medium">
                {isLogin
                  ? "جهت ورود به حساب کاربری، اطلاعات خود را وارد کنید"
                  : "برای تجربه یک خرید لذت‌بخش، اطلاعات زیر را تکمیل کنید"}
              </p>
            </div>

            {/* فرم اصلی */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {/* فیلد نام کامل (فقط در حالت ثبت‌نام) */}
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-1.5"
                  >
                    <label className="block text-xs font-bold text-stone-700 mr-1">
                      نام و نام خانوادگی
                    </label>
                    <div className="relative">
                      <UserIcon className="w-5 h-5 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="مانند: علی محمدی"
                        required={!isLogin}
                        className="w-full pl-4 pr-11 py-3 text-xs sm:text-sm bg-stone-50/60 border border-stone-200 rounded-2xl focus:outline-none focus:border-rose-900 focus:bg-white focus:ring-4 focus:ring-rose-900/10 transition-all font-medium text-stone-800 placeholder:text-stone-400"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* فیلد ایمیل */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 mr-1">
                  ایمیل یا شماره موبایل
                </label>
                <div className="relative">
                  <EnvelopeIcon className="w-5 h-5 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@mail.com"
                    required
                    dir="ltr"
                    className="w-full pl-4 pr-11 py-3 text-xs sm:text-sm bg-stone-50/60 border border-stone-200 rounded-2xl focus:outline-none focus:border-rose-900 focus:bg-white focus:ring-4 focus:ring-rose-900/10 transition-all font-medium text-stone-800 placeholder:text-stone-400 text-left"
                  />
                </div>
              </div>

              {/* فیلد رمز عبور */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between px-1">
                  <label className="block text-xs font-bold text-stone-700">
                    رمز عبور
                  </label>
                  {isLogin && (
                    <Link
                      href="#"
                      className="text-[11px] font-bold text-rose-900 hover:underline"
                    >
                      رمز عبور را فراموش کرده‌اید؟
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <LockClosedIcon className="w-5 h-5 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    dir="ltr"
                    className="w-full pl-11 pr-11 py-3 text-xs sm:text-sm bg-stone-50/60 border border-stone-200 rounded-2xl focus:outline-none focus:border-rose-900 focus:bg-white focus:ring-4 focus:ring-rose-900/10 transition-all font-medium text-stone-800 placeholder:text-stone-400 text-left"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* دکمه ارسال اصلی */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3.5 mt-2 bg-gradient-to-r from-rose-950 via-rose-900 to-neutral-900 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-rose-950/20 hover:shadow-rose-950/30 transition-all duration-300"
              >
                {isLogin ? "ورود به حساب کاربری" : "تکمیل ثبت‌نام و ورود"}
              </motion.button>
            </form>

            {/* خط جداکننده */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="h-px w-full bg-stone-200" />
              <span className="absolute bg-white px-3 text-[11px] font-bold text-stone-400">
                یا ورود با
              </span>
            </div>

            {/* دکمه‌های ورود سریع اجتماعی */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-2xl text-xs font-bold text-stone-700 transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                گوگل
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-2xl text-xs font-bold text-stone-700 transition-all duration-300"
              >
                <span>📱</span>
                شماره همراه
              </button>
            </div>
          </div>

          {/* قوانین و شرایط پایین فرم */}
          <p className="mt-8 text-center text-[11px] text-stone-400 font-medium">
            با ورود یا ثبت‌نام در لوکس‌مد،{" "}
            <Link href="#" className="underline hover:text-stone-600">
              شرایط و قوانین
            </Link>{" "}
            استفاده از آن را می‌پذیرید.
          </p>
        </div>

      </div>
    </div>
  );
}