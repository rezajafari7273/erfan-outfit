"use client";

import React from "react";
import { usePromotions } from "./PromotionContext";
import TopBanner from "./TopBanner/TopBanner";
import Stories from "./Stories/Stories";
import BannerSlider from "./BannerSlider/BannerSlider";
import SmallBanner from "./SmallBanner/SmallBanner";

export default function PromotionRenderer({ type, slotKey, className = "" }) {
  const promotionsData = usePromotions();

  if (!promotionsData) return null;

  switch (type) {
    case "topBanner":
      return <TopBanner data={promotionsData.topBanner} />;

    case "stories":
      return <Stories items={promotionsData.stories} />;

    case "bannerSlider":
      return <BannerSlider slides={promotionsData.bannerSlider} />;

    case "smallBanner": {
      const bannerData =
        promotionsData[`${slotKey}Banners`] ||
        promotionsData[slotKey] ||
        promotionsData.smallBanners?.[slotKey];

      if (!bannerData) return null;

      const bannerList = Array.isArray(bannerData) ? bannerData : [bannerData];

      if (bannerList.length === 0) return null;

      return (
        <div className={`grid gap-3 ${className.includes('grid-cols') ? '' : 'grid-cols-1'} ${className}`}>
          {bannerList.map((banner) => (
            <SmallBanner key={banner.id || banner.title} banner={banner} />
          ))}
        </div>
      );
    }

    default:
      return null;
  }
}