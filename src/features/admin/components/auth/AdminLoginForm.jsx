"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "../../api/adminApi";

export default function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ارسال کلید phone به بک‌اند جهت تطابق با AdminLoginSerializer
      const data = await adminApi.login({
        phone: username,
        password: password,
      });

      // ذخیره توکن‌های JWT دریافتی در localStorage
      if (data?.access) {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);

        // انتقال به صفحه اصلی پنل مدیریت
        router.push("/admin-panel");
      } else {
        setError("پاسخ نامعتبر از سرور دریافت شد.");
      }
    } catch (err) {
      console.error("Admin Login Error:", err);

      const resData = err?.response?.data;

      // استخراج پیام خطا براساس ساختارهای مختلف پاسخ DRF
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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 dir-rtl">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          ورود به پنل مدیریت
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              شماره موبایل / نام کاربری
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800 dir-ltr text-right"
              placeholder="09123456789"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              رمز عبور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-800"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? "در حال ورود..." : "ورود به داشبورد"}
          </button>
        </form>
      </div>
    </div>
  );
}