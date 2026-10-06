"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "../../api/adminApi";
import {
  PhoneIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowLeftOnRectangleIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await adminApi.login({
        phone: username,
        password: password,
      });

      if (data?.access) {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        router.push("/admin-panel");
      } else {
        setError("پاسخ نامعتبر از سرور دریافت شد.");
      }
    } catch (err) {
      console.error("Admin Login Error:", err);

      const resData = err?.response?.data;
      let message = "نام کاربری یا رمز عبور اشتباه است، یا دسترسی ادمین ندارید.";

      if (typeof resData === "string") {
        message = resData;
      } else if (resData?.detail) {
        message = resData.detail;
      } else if (resData?.non_field_errors?.[0]) {
        message = resData.non_field_errors[0];
      } else if (resData?.phone?.[0]) {
        message = resData.phone[0];
      } else if (resData?.password?.[0]) {
        message = resData.password[0];
      } else if (err?.message) {
        message = err.message;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-admin-background p-4 sm:p-6 dir-rtl select-none">
      {/* دایره‌های نورانی دکوراتیو پس‌زمینه (Glow Effect) */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-admin-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* کارت اصلی ورود با افکت Glassmorphism */}
      <div className="relative w-full max-w-md bg-admin-surface/80 backdrop-blur-2xl rounded-3xl border border-admin-border/80 shadow-2xl p-6 sm:p-8 transition-all duration-300">
        
        {/* هدر فرم */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-admin-primary/10 border border-admin-primary/20 flex items-center justify-center text-admin-primary mb-3 shadow-inner">
            <ShieldCheckIcon className="w-7 h-7" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-admin-text tracking-tight">
            ورود به پنل مدیریت
          </h1>
          <p className="text-xs font-bold text-admin-text-muted mt-1.5">
            احراز هویت حساب کاربری ارشد
          </p>
        </div>

        {/* پیام خطا */}
        {error && (
          <div className="mb-6 p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold rounded-2xl flex items-center gap-2.5 animate-headShake">
            <ExclamationTriangleIcon className="w-5 h-5 shrink-0" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* ورودی شماره موبایل / نام کاربری */}
          <div>
            <label className="block text-xs font-bold text-admin-text mb-2">
              شماره موبایل / نام کاربری
            </label>
            <div className="relative flex items-center">
              <PhoneIcon className="absolute right-3.5 w-4 h-4 text-admin-text-muted pointer-events-none" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pr-10 pl-4 py-3 bg-admin-background border border-admin-border/70 rounded-2xl text-xs text-admin-text dir-ltr text-right focus:outline-none focus:ring-2 focus:ring-admin-primary/50 transition-all placeholder:text-admin-text-muted/50"
                placeholder="09123456789"
                required
              />
            </div>
          </div>

          {/* ورودی رمز عبور */}
          <div>
            <label className="block text-xs font-bold text-admin-text mb-2">
              رمز عبور
            </label>
            <div className="relative flex items-center">
              <LockClosedIcon className="absolute right-3.5 w-4 h-4 text-admin-text-muted pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-10 pl-11 py-3 bg-admin-background border border-admin-border/70 rounded-2xl text-xs text-admin-text dir-ltr text-left focus:outline-none focus:ring-2 focus:ring-admin-primary/50 transition-all placeholder:text-admin-text-muted/50 font-mono"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3.5 text-admin-text-muted hover:text-admin-text transition-colors p-1"
                title={showPassword ? "مخفی کردن" : "نمایش"}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-4 h-4" />
                ) : (
                  <EyeIcon className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* دکمه ارسال */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-admin-primary hover:opacity-90 active:scale-[0.99] text-white font-bold text-xs rounded-2xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-admin-primary/25 mt-2"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>در حال ورود به سامانه...</span>
              </div>
            ) : (
              <>
                <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                <span>ورود به داشبورد</span>
              </>
            )}
          </button>
        </form>

        {/* فوتر کوچک */}
        <div className="mt-8 pt-4 border-t border-admin-border/50 text-center">
          <p className="text-[11px] font-bold text-admin-text-muted">
            سامانه مدیریت یکپارچه | تمامی حقوق محفوظ است
          </p>
        </div>
      </div>
    </div>
  );
}