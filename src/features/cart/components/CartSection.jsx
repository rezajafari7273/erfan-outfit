"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FreeShippingBar from "./FreeShippingBar";
import CartItemCard from "./CartItemCard";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";
import { useCart } from "../hooks/useCart";

const FREE_SHIPPING_THRESHOLD = 1500000;

export default function CartSection() {
  const router = useRouter();
  const {
    items,
    totalItemsCount,
    finalPrice,
    loading,
    error,
    updateItem,
    removeItem,
  } = useCart();

  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const normalizedItems = items.map((it) => ({
    id: it.id,
    title: it.product_title,
    slug: it.product_slug,
    color: it.color_name || "—",
    size: (it.sizes || []).join("، ") || "—",
    seller: "",
    image: it.image,
    quantity: it.quantity,
    price: Number(it.final_price) / (it.quantity || 1),
  }));

  const rawTotalPrice = normalizedItems.reduce(
    (acc, i) => acc + i.price * i.quantity,
    0
  );
  const totalDiscount = 0;
  const payable = rawTotalPrice - appliedDiscount;

  const progressPercent = Math.min(
    100,
    Math.round((payable / FREE_SHIPPING_THRESHOLD) * 100)
  );
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - payable;

  const handleIncrease = async (id) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    await updateItem(id, item.quantity + 1);
  };

  const handleDecrease = async (id) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    if (item.quantity <= 1) {
      await removeItem(id);
    } else {
      await updateItem(id, item.quantity - 1);
    }
  };

  const handleApplyCoupon = (code) => {
    if (code.trim().toLowerCase() === "off20") {
      setAppliedDiscount(100000);
    } else {
      alert("کد تخفیف نامعتبر است (کد آزمایشی: off20)");
    }
  };

  const handleGoToCheckout = () => {
    router.push("/checkout");
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8 text-center text-gray-500 font-bold">
        در حال بارگذاری سبد خرید...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8 text-center text-rose-500 font-bold">
        {error}
      </div>
    );
  }

  if (normalizedItems.length === 0) {
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
            {normalizedItems.map((item) => (
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
            finalPrice={payable}
            isFreeShipping={remainingForFreeShipping <= 0}
            onApplyCoupon={handleApplyCoupon}
            appliedDiscount={appliedDiscount}
            onNextStep={handleGoToCheckout}
          />
        </div>
      </div>
    </div>
  );
}