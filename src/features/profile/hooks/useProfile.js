"use client";

import { useState, useCallback } from "react";
import { profileApi } from "../api/profileApi";

export function useProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      return await profileApi.getProfile();
    } catch (err) {
      setError(err.response?.data || "خطا در دریافت پروفایل");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      return await profileApi.updateProfile(payload);
    } catch (err) {
      setError(err.response?.data || "خطا در بروزرسانی پروفایل");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getProfile,
    updateProfile,
  };
}