import { useState, useEffect, useCallback } from "react";
import {
  getAmazingProducts,
  getBestSellingProducts,
  getInstantOffers,
  getLatestProducts,
} from "../api/homeApi";

export function useHomeData() {
  const [amazingData, setAmazingData] = useState({ targetDate: null, products: [] });
  const [bestSellingData, setBestSellingData] = useState([]);
  const [instantOffersData, setInstantOffersData] = useState({ targetDate: null, offers: [], quickAccess: [] });
  const [latestData, setLatestData] = useState({ categories: [], products: [], pagination: {} });
  
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [latestPage, setLatestPage] = useState(1);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isLatestLoading, setIsLatestLoading] = useState(false);
  const [error, setError] = useState(null);

  // دریافت اولیه کلیه داده‌های صفحه اصلی
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const [amazingRes, bestSellingRes, instantRes, latestRes] = await Promise.all([
          getAmazingProducts(),
          getBestSellingProducts(),
          getInstantOffers(),
          getLatestProducts({ category: "all", page: 1 }),
        ]);

        setAmazingData(amazingRes.data || { targetDate: null, products: [] });
        setBestSellingData(bestSellingRes.data?.products || []);
        setInstantOffersData(instantRes.data || { targetDate: null, offers: [], quickAccess: [] });
        setLatestData(latestRes.data || { categories: [], products: [], pagination: {} });
      } catch (err) {
        console.error("خطا در دریافت اطلاعات صفحه اصلی:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // تغییر فیلتر دسته‌بندی یا صفحه در بخش جدیدترین محصولات
  const fetchFilteredLatestProducts = useCallback(async (category, page = 1) => {
    try {
      setIsLatestLoading(true);
      const res = await getLatestProducts({ category, page });
      setLatestData((prev) => ({
        ...prev,
        products: res.data?.products || [],
        pagination: res.data?.pagination || {},
      }));
    } catch (err) {
      console.error("خطا در فیلتر جدیدترین محصولات:", err);
    } finally {
      setIsLatestLoading(false);
    }
  }, []);

  const changeCategory = (catId) => {
    setSelectedCategory(catId);
    setLatestPage(1);
    fetchFilteredLatestProducts(catId, 1);
  };

  const changeLatestPage = (page) => {
    setLatestPage(page);
    fetchFilteredLatestProducts(selectedCategory, page);
  };

  return {
    amazingData,
    bestSellingData,
    instantOffersData,
    latestData,
    selectedCategory,
    latestPage,
    isLoading,
    isLatestLoading,
    error,
    changeCategory,
    changeLatestPage,
  };
}