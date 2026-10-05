import { useState, useEffect, useCallback } from "react";
import {
  getAmazingProducts,
  getBestSellingProducts,
  getInstantOffers,
  getLatestProducts,
} from "../api/homeApi";

// تابع کمکی برای استخراج امن داده‌ها با توجه به Response Interceptor در baseApi
function extractData(res) {
  if (!res) return null;
  return res.data !== undefined ? res.data : res;
}

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

  // دریافت اولیه کلیه داده‌های صفحه اصلی به صورت مقاوم در برابر خطای مجزا
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const results = await Promise.allSettled([
          getAmazingProducts(),
          getBestSellingProducts(),
          getInstantOffers(),
          getLatestProducts({ category: "all", page: 1 }),
        ]);

        const [amazingRes, bestSellingRes, instantRes, latestRes] = results;

        if (amazingRes.status === "fulfilled") {
          const data = extractData(amazingRes.value);
          setAmazingData(data || { targetDate: null, products: [] });
        }

        if (bestSellingRes.status === "fulfilled") {
          const data = extractData(bestSellingRes.value);
          setBestSellingData(data?.products || (Array.isArray(data) ? data : []));
        }

        if (instantRes.status === "fulfilled") {
          const data = extractData(instantRes.value);
          setInstantOffersData(data || { targetDate: null, offers: [], quickAccess: [] });
        }

        if (latestRes.status === "fulfilled") {
          const data = extractData(latestRes.value);
          setLatestData(data || { categories: [], products: [], pagination: {} });
        }

        // اگر همگی ریجکت شدند، خطا ثبت شود
        const allRejected = results.every((r) => r.status === "rejected");
        if (allRejected) {
          setError(results[0].reason);
        }
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
      const data = extractData(res);
      setLatestData((prev) => ({
        ...prev,
        products: data?.products || [],
        pagination: data?.pagination || {},
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