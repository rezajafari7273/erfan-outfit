"use client";

import { useState } from "react";
import FreeShippingBar from "./FreeShippingBar";
import CartItemCard from "./CartItemCard";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";
import { initialCartItems, FREE_SHIPPING_THRESHOLD } from "../mocks/cartMockData";

export default function CartSection() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const rawTotalPrice = cartItems.reduce(
    (acc, item) => acc + item.originalPrice * item.quantity,
    0
  );

  const totalDiscount = cartItems.reduce(
    (acc, item) => acc + (item.originalPrice - item.price) * item.quantity,
    0
  );

  const finalPrice = rawTotalPrice - totalDiscount - appliedDiscount;

  const progressPercent = Math.min(
    100,
    Math.round((finalPrice / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - finalPrice;

  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleApplyCoupon = (code) => {
    if (code.trim().toLowerCase() === "off20") {
      setAppliedDiscount(100000);
    } else {
      alert("کد تخفیف نامعتبر است (کد آزمایشی: off20)");
    }
  };

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 dir-rtl">
      <FreeShippingBar
        progressPercent={progressPercent}
        remainingForFreeShipping={remainingForFreeShipping}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-sm font-black text-gray-800 flex items-center gap-2">
              <span>سبد خرید</span>
              <span className="text-xs font-bold text-rose-500 bg-rose-50 border border-rose-100 px-2.5 py-0.5 rounded-full tabular-nums">
                {totalItemsCount.toLocaleString("fa-IR")} کالا
              </span>
            </h2>
          </div>

          <div className="space-y-3">
            {cartItems.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 sticky top-6">
          <CartSummary
            totalItemsCount={totalItemsCount}
            rawTotalPrice={rawTotalPrice}
            totalDiscount={totalDiscount}
            finalPrice={finalPrice}
            isFreeShipping={remainingForFreeShipping <= 0}
            onApplyCoupon={handleApplyCoupon}
            appliedDiscount={appliedDiscount}
          />
        </div>
      </div>
    </div>
  );
}