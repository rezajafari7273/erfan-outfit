// app/page.jsx
"use client";

import React from "react";
import { useHomeData } from "@/features/home/hooks/useHomeData"; 
import PromotionRenderer from "@/components/promotions/PromotionRenderer";
import PopularCategories from "@/features/home/components/PopularCategories";
import InstantOffers from "@/features/home/components/InstantOffers";
import AmazingProducts from "@/features/home/components/AmazingProducts";
import LatestProducts from "@/features/home/components/LatestProducts/LatestProducts";
import BestSellingProducts from "@/features/home/components/BestSellingProducts";
import MagazineSection from "@/features/home/components/MagazineSection";

export default function Home() {
  const {
    amazingData,
    bestSellingData,
    instantOffersData,
    latestData,
    selectedCategory,
    latestPage,
    isLoading,
    isLatestLoading,
    changeCategory,
    changeLatestPage,
  } = useHomeData();

  return (
    <div className="min-h-screen space-y-12 md:space-y-14">
      {/* 1. Stories */}
      <section className="container mx-auto">
        <PromotionRenderer type="stories" />
      </section>

      {/* 2. Slider Banner */}
      <section className="mx-auto">
        <PromotionRenderer type="bannerSlider" />
      </section>

      {/* 3. Popular Categories */}
      <section className="container mx-auto">
        <PopularCategories />
      </section>

      {/* 4. Instant Offers & Home Middle Banner */}
      <section className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch">
          <div className="w-full lg:w-[40%] min-w-0">
            <InstantOffers 
              instantOffersData={instantOffersData} 
              isLoading={isLoading} 
            />
          </div>

          <div className="w-full lg:w-[60%] min-w-0">
            {/* کلید slotKey روی homeMiddle تنظیم شد */}
            <PromotionRenderer
              type="smallBanner"
              slotKey="homeMiddle"
              className="grid-cols-2 gap-3 lg:gap-4 h-full"
            />
          </div>
        </div>
      </section>

      {/* 5. Amazing Products */}
      <section className="container mx-auto">
        <AmazingProducts 
          amazingData={amazingData} 
          isLoading={isLoading} 
        />
      </section>

      {/* 6. Latest Products */}
      <section className="container mx-auto">
        <LatestProducts
          latestData={latestData}
          selectedCategory={selectedCategory}
          latestPage={latestPage}
          isLatestLoading={isLatestLoading}
          changeCategory={changeCategory}
          changeLatestPage={changeLatestPage}
        />
      </section>

      {/* 7. Best Selling Products */}
      <section className="container mx-auto">
        <BestSellingProducts 
          bestSellingData={bestSellingData} 
          isLoading={isLoading} 
        />
      </section>

      {/* 8. Magazine Section */}
      <section className="container mx-auto">
        <MagazineSection />
      </section>
    </div>
  );
}