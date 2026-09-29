"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // ۱. استیت کنترل نمایش مودال ورود/ثبت‌نام
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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
      setIsAuthModalOpen(false); // پس از لاگین موفق، مودال را می‌بندیم
      return userData;
    } catch (error) {
      console.error("خطا در بارگذاری پروفایل پس از ورود:", error);
      throw error;
    }
  };

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

  const updateUserProfile = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  // ۲. توابع کنترل مودال
  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  // ۳. تابع کلیدی: بررسی لاگین بودن کاربر
  // اگر لاگین بود اکشن مورد نظر اجرا می‌شود، اگر نبود مودال باز می‌شود
  const requireAuth = (actionCallback) => {
    if (isAuthenticated) {
      if (typeof actionCallback === "function") {
        actionCallback();
      }
      return true;
    } else {
      openAuthModal();
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        requireAuth,
        login,
        logout,
        updateUserProfile,
      }}
    >
      {children}
      {/* در صورت داشتن کامپوننت مودال عمومی لاگین می‌توانید آن را همینجا رندر کنید */}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext باید داخل AuthProvider استفاده شود.");
  }
  return context;
};