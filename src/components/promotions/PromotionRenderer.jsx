"use client";

import React from "react";
import { usePromotions } from "./PromotionContext";
import TopBanner from "./TopBanner/TopBanner";
import Stories from "./Stories/Stories";
import BannerSlider from "./BannerSlider/BannerSlider";
import SmallBanner from "./SmallBanner/SmallBanner";
import FooterBanner from "./FooterBanner/FooterBanner";
import Skeleton from "@/components/ui/Skeleton";

// کامپوننت کمکی برای رندر اسکلتون‌ها
function PromotionSkeleton({ type, slotKey, className }) {
  switch (type) {
    case "stories":
      return (
        <div className="flex gap-4 overflow-x-hidden py-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2 shrink-0">
              <Skeleton variant="circular" className="w-16 h-16 md:w-20 md:h-20" />
              <Skeleton className="w-12 h-3" />
            </div>
          ))}
        </div>
      );

    case "bannerSlider":
      return <Skeleton className="w-full h-48 sm:h-64 md:h-96 rounded-3xl" />;

    case "footerBanners":
    case "footerBanner":
      return <Skeleton className="w-full h-20 md:h-24 rounded-2xl" />;

    case "smallBanner":
      return (
        <div className={`grid grid-cols-2 gap-3 lg:gap-4 ${className}`}>
          <Skeleton className="w-full h-36 md:h-48 rounded-2xl" />
          <Skeleton className="w-full h-36 md:h-48 rounded-2xl" />
        </div>
      );

    default:
      return <Skeleton className="w-full h-32 rounded-2xl" />;
  }
}

export default function PromotionRenderer({ type, slotKey, className = "" }) {
  const { promotions, isLoading } = usePromotions();

  // 🔴 به جای return null، اسکلتون متناسب رندر می‌شود
  if (isLoading || !promotions) {
    return <PromotionSkeleton type={type} slotKey={slotKey} className={className} />;
  }

  switch (type) {
    case "topBanner":
      if (!promotions.topBanner) return null;
      return <TopBanner data={promotions.topBanner} />;

    case "stories":
      if (!promotions.stories || !promotions.stories.length) return null;
      return <Stories items={promotions.stories} />;

    case "bannerSlider":
      if (!promotions.bannerSlider || !promotions.bannerSlider.length) return null;
      return <BannerSlider slides={promotions.bannerSlider} />;

    case "footerBanners":
    case "footerBanner": {
      const bannerData = promotions.footerBanners;
      if (!bannerData) return null;
      const bannerList = Array.isArray(bannerData) ? bannerData : [bannerData];
      if (bannerList.length === 0) return null;

      return (
        <div className={`w-full h-full ${className}`}>
          {bannerList.map((banner) => (
            <FooterBanner key={banner.id} data={banner} />
          ))}
        </div>
      );
    }

    case "smallBanner": {
      let bannerData = null;
      let isFooterSlot = false;

      if (slotKey === "homeMiddle" || slotKey === "instantBanners") {
        bannerData = promotions.homeMiddleBanners;
      } else if (slotKey === "footer") {
        bannerData = promotions.footerBanners;
        isFooterSlot = true;
      } else if (slotKey) {
        bannerData = promotions[`${slotKey}Banners`] || promotions[slotKey];
      }

      if (!bannerData) return null;

      const bannerList = Array.isArray(bannerData) ? bannerData : [bannerData];
      if (bannerList.length === 0) return null;

      return (
        <div className={`grid gap-3 ${className}`}>
          {bannerList.map((banner) =>
            isFooterSlot ? (
              <FooterBanner key={banner.id} data={banner} />
            ) : (
              <SmallBanner key={banner.id} banner={banner} />
            )
          )}
        </div>
      );
    }

    default:
      return null;
  }
}