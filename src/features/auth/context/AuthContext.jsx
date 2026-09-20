"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // بررسی وضعیت لاگین و دریافت پروفایل هنگام لود اولیه برنامه
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await authApi.getProfile();
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("خطا در دریافت اطلاعات کاربر:", error);
        // در صورت عدم معتبر بودن توکن، خروج انجام می‌شود
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // ذخیره توکن‌ها و به‌روزرسانی استیت‌ها پس از تایید موفق OTP
  const login = async (tokens) => {
    if (tokens?.access) {
      localStorage.setItem("accessToken", tokens.access);
    }
    if (tokens?.refresh) {
      localStorage.setItem("refreshToken", tokens.refresh);
    }

    try {
      const userData = await authApi.getProfile();
      setUser(userData);
      setIsAuthenticated(true);
      return userData;
    } catch (error) {
      console.error("خطا در بارگذاری پروفایل پس از ورود:", error);
      throw error;
    }
  };

  // خروج از حساب کاربری
  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("خطا در سمت سرور هنگام خروج:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // به‌روزرسانی دستی اطلاعات پروفایل (مثلاً پس از ویرایش نام یا آدرس)
  const updateUserProfile = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// هوک اختصاصی برای استفاده راحت‌تر از کانتکست
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext باید داخل AuthProvider استفاده شود.");
  }
  return context;
};