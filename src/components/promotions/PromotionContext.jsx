"use client";

import React, { createContext, useContext } from "react";
import { mockPromotionsData } from "@/data/mockPromotions";

const PromotionContext = createContext(mockPromotionsData);

export function PromotionProvider({ children, initialData = mockPromotionsData }) {
  return (
    <PromotionContext.Provider value={initialData}>
      {children}
    </PromotionContext.Provider>
  );
}

export function usePromotions() {
  const context = useContext(PromotionContext);
  if (!context) {
    throw new Error("usePromotions must be used within a PromotionProvider");
  }
  return context;
}