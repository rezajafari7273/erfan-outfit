// src/context/BreadcrumbContext.jsx
"use client";

import { createContext, useContext, useState } from "react";

const BreadcrumbContext = createContext();

export function BreadcrumbProvider({ children }) {
  const [isCustomBreadcrumbRendered, setIsCustomBreadcrumbRendered] = useState(false);

  return (
    <BreadcrumbContext.Provider
      value={{
        isCustomBreadcrumbRendered,
        setIsCustomBreadcrumbRendered,
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
}

export const useBreadcrumb = () => useContext(BreadcrumbContext);