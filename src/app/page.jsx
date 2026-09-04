"use client";

import React from "react";
import PromotionRenderer from "@/components/promotions/PromotionRenderer";
import PopularCategories from "@/features/home/components/PopularCategories";
import ProductCard from "@/features/products/components/ProductCard";
import InstantOffers from "@/features/home/components/InstantOffers";
import AmazingProducts from "@/features/home/components/AmazingProducts"
import LatestProducts from "@/features/home/components/LatestProducts/LatestProducts";
import BestSellingProducts from "@/features/home/components/BestSellingProducts";
import MagazineSection from "@/features/home/components/MagazineSection";
import Timer from "@/components/common/Timer";


export default function Home() {
  return (
      <div className="min-h-screen space-y-12 md:space-y-14">

        {/* stories */}
        <section className="container">
          <PromotionRenderer type="stories" />
        </section>

        
        {/* slider banner */}
        <section className=" mx-auto 2xl:container">
          <PromotionRenderer type="bannerSlider" />
        </section>


        {/* Popular Categories */}
        <section className="container">
          <PopularCategories />
        </section>


        {/* Instans Offers and Promotion */}
        <section className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch">
            <div className="w-full lg:w-[40%] min-w-0">
              <InstantOffers />
            </div>

            <div className="w-full lg:w-[60%] min-w-0">
              <PromotionRenderer 
                type="smallBanner" 
                slotKey="instantBanners" 
                className="grid-cols-2 gap-3 lg:gap-4 h-full"
              />
            </div>
          </div>
        </section>


        {/* Amazing Products */}
        <section className="container">
          <AmazingProducts />
        </section>


          {/* Promotion */}
        <div className="container mx-auto">
          <PromotionRenderer type="smallBanner" slotKey="searchModal" className="w-full" />
        </div>


        {/* Latest Prosucts */}
        <section className="container">
          <LatestProducts />
        </section>

        
        {/* Promotion */}
        <section className="container">
          <PromotionRenderer type="smallBanner" slotKey="megaMenu" className="w-full grid-cols-2 gap-4" />
        </section>

        
        {/* Best Selling Products */}
        <section className="container">
         <BestSellingProducts />
        </section>
 
        <section className="container">
          <MagazineSection />
        </section>


      </div>
  
  );
}