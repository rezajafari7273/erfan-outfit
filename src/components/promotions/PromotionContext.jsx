"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { promotionService } from "./services/promotionService";

const PromotionContext = createContext({ promotions: null, isLoading: true });

export function PromotionProvider({ children }) {
  const [promotions, setPromotions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    promotionService.getPlacements()
      .then((data) => {
        if (isMounted) setPromotions(data);
      })
      .catch((err) => {
        console.error("Error updating promotion state:", err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PromotionContext.Provider value={{ promotions, isLoading }}>
      {children}
    </PromotionContext.Provider>
  );
}

export function usePromotions() {
  return useContext(PromotionContext);
}