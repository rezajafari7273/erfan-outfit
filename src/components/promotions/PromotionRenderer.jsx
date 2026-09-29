"use client";

import React from "react";
import { usePromotions } from "./PromotionContext";
import TopBanner from "./TopBanner/TopBanner";
import Stories from "./Stories/Stories";
import BannerSlider from "./BannerSlider/BannerSlider";
import SmallBanner from "./SmallBanner/SmallBanner";

export default function PromotionRenderer({ type, slotKey, className = "" }) {
  const { promotions, isLoading } = usePromotions();

  if (isLoading || !promotions) return null;

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

    case "smallBanner": {
      let bannerData = null;

      if (slotKey === "homeMiddle" || slotKey === "instantBanners") {
        bannerData = promotions.homeMiddleBanners;
      } else if (slotKey) {
        bannerData = promotions[`${slotKey}Banners`] || promotions[slotKey];
      }

      if (!bannerData) return null;

      const bannerList = Array.isArray(bannerData) ? bannerData : [bannerData];
      if (bannerList.length === 0) return null;

      return (
        <div className={`grid gap-3 ${className}`}>
          {bannerList.map((banner) => (
            <SmallBanner key={banner.id} banner={banner} />
          ))}
        </div>
      );
    }

    default:
      return null;
  }
}