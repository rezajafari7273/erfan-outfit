"use client";

import { createContext, useState, useCallback, useEffect, useContext } from "react";
import { profileApi } from "../api/profileApi";

export const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [measurements, setMeasurements] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- Profile Actions ---
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await profileApi.getProfile();
      setProfile(data);
      return data;
    } catch (err) {
      setError(err.response?.data || "خطا در دریافت اطلاعات پروفایل");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await profileApi.updateProfile(payload);
      setProfile(updated);
      return updated;
    } catch (err) {
      setError(err.response?.data || "خطا در بروزرسانی پروفایل");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // --- Measurements Actions ---
  const fetchMeasurements = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await profileApi.getMeasurements();
      setMeasurements(data);
      return data;
    } catch (err) {
      if (err.response?.status === 404) {
        setMeasurements(null);
      } else {
        setError(err.response?.data || "خطا در دریافت اندازه‌ها");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const updateMeasurements = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await profileApi.updateMeasurements(payload);
      setMeasurements(updated);
      return updated;
    } catch (err) {
      setError(err.response?.data || "خطا در ثبت اندازه‌ها");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // --- Address Actions ---
  const fetchAddresses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await profileApi.getAddresses();
      const list = Array.isArray(data) ? data : data?.results || [];
      setAddresses(list);
      return list;
    } catch (err) {
      setError(err.response?.data || "خطا در دریافت آدرس‌ها");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createAddress = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      await profileApi.createAddress(payload);
      const updatedList = await fetchAddresses();
      return updatedList;
    } catch (err) {
      setError(err.response?.data || "خطا در ثبت آدرس جدید");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateAddress = async (id, payload) => {
    setLoading(true);
    setError(null);
    try {
      await profileApi.updateAddress(id, payload);
      const updatedList = await fetchAddresses();
      return updatedList;
    } catch (err) {
      setError(err.response?.data || "خطا در ویرایش آدرس");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await profileApi.deleteAddress(id);
      setAddresses((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.response?.data || "خطا در حذف آدرس");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // دریافت اولیه اطلاعات تنها در صورت وجود توکن معتبر
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (token) {
      fetchProfile();
      fetchAddresses();
    }
  }, [fetchProfile, fetchAddresses]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        measurements,
        addresses,
        loading,
        error,
        fetchProfile,
        updateProfile,
        fetchMeasurements,
        updateMeasurements,
        fetchAddresses,
        createAddress,
        updateAddress,
        deleteAddress,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileContext() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
}