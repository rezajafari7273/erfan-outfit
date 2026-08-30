"use client";

import React from "react";
import HeroBannerBlock from "./blocks/HeroBannerBlock";
import ProductSliderBlock from "./blocks/ProductSliderBlock";
import BannerGridBlock from "./blocks/BannerGridBlock";

export default function BlockRenderer({ block }) {
  if (!block || !block.type) return null;

  switch (block.type) {
    case "heroBanner":
      return <HeroBannerBlock block={block} />;

    case "productSlider":
      return <ProductSliderBlock block={block} />;

    case "bannerGrid":
      return <BannerGridBlock block={block} />;

    default:
      return null;
  }
}