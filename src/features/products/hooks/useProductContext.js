import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext باید درون ProductProvider قرار گیرد.");
  }
  return context;
}