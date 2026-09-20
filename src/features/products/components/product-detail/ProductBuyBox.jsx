"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  BuildingStorefrontIcon,
  ShieldCheckIcon,
  TruckIcon,
  SparklesIcon,
  PlusIcon,
  MinusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import { cartApi } from "@/features/cart/api/cartApi";

const PERFORMANCE_LABELS = {
  excellent: "عالی",
  good: "خوب",
  average: "متوسط",
  poor: "ضعیف",
};

const PERFORMANCE_COLORS = {
  excellent: "text-emerald-600",
  good: "text-emerald-600",
  average: "text-amber-500",
  poor: "text-rose-500",
};

const DEFAULT_WARRANTY = "گارانتی اصالت و سلامت فیزیکی کالا";
const DEFAULT_DELIVERY = "تحویل عادی آنلاین مد • وابسته به سبد";

function formatPrice(value) {
  if (value === null || value === undefined) return "";
  return Number(value).toLocaleString("fa-IR");
}

export default function ProductBuyBox({ product, selectedVariant = null }) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [cartItem, setCartItem] = useState(null);
  const [loadingCart, setLoadingCart] = useState(false);

  if (!product) return null;

  const vendor = product.vendor_info || {};
  const sellersCount = product.other_sellers?.length || 0;
  const performanceLabel = PERFORMANCE_LABELS[vendor.performance] || "";
  const performanceColor = PERFORMANCE_COLORS[vendor.performance] || "text-gray-500";
  const hasDiscount = Number(product.discount_percent) > 0;

  const warrantyText = product.warranty_text || DEFAULT_WARRANTY;
  const deliveryText = product.delivery_text || DEFAULT_DELIVERY;

  // استعلام وضعیت محصول/واریانت در سبد خرید
  const checkCartStatus = useCallback(async () => {
    try {
      const cartData = await cartApi.getCart();
      const items = Array.isArray(cartData?.items)
        ? cartData.items
        : Array.isArray(cartData)
        ? cartData
        : [];

      const targetProductId = Number(product.id);
      const targetVariantId = selectedVariant?.id ? Number(selectedVariant.id) : null;

      const found = items.find((item) => {
        const itemProductId = Number(item.product_id || item.product?.id || item.product);
        const itemVariantId = item.variant_id || item.variant?.id || item.variant
          ? Number(item.variant_id || item.variant?.id || item.variant)
          : null;

        if (targetVariantId) {
          return itemProductId === targetProductId && itemVariantId === targetVariantId;
        }
        return itemProductId === targetProductId;
      });

      setCartItem(found || null);
    } catch (err) {
      console.error("[CHECK CART]", err);
    }
  }, [product.id, selectedVariant?.id]);

  useEffect(() => {
    checkCartStatus();

    const onCartUpdated = () => checkCartStatus();
    window.addEventListener("cart:updated", onCartUpdated);
    return () => window.removeEventListener("cart:updated", onCartUpdated);
  }, [checkCartStatus]);

  // افزودن اولیه به سبد خرید
  const handleAddToCart = async () => {
    if (adding) return;
    setAdding(true);
    try {
      const res = await cartApi.addItem({
        product_id: product.id,
        variant_id: selectedVariant?.id || null,
        quantity: 1,
      });

      if (typeof window !== "undefined" && res?.session_key) {
        localStorage.setItem("guestSessionKey", res.session_key);
      }

      setAdded(true);

      setTimeout(async () => {
        await checkCartStatus();
        setAdded(false);

        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("cart:updated"));
        }
      }, 1200);
    } catch (err) {
      console.error("[ADD TO CART]", err);
      alert("خطا در افزودن به سبد خرید");
    } finally {
      setAdding(false);
    }
  };

  // افزایش / کاهش / حذف تعداد در بای‌باکس
  const handleUpdateQuantity = async (newQuantity) => {
    if (!cartItem || loadingCart) return;

    const itemId = cartItem.id || cartItem.cart_item_id;
    if (!itemId) {
      await checkCartStatus();
      return;
    }

    setLoadingCart(true);

    try {
      if (newQuantity <= 0) {
        // حذف از سبد
        await cartApi.removeItem(itemId);
        setCartItem(null);
      } else {
        // ارسال عدد ساده مطابق با تعریف updateItem(itemId, quantity) در cartApi.js
        await cartApi.updateItem(itemId, Number(newQuantity));
        
        // به‌روزرسانی آنی استیت محلی
        setCartItem((prev) => (prev ? { ...prev, quantity: newQuantity } : null));
      }

      // اطلاع‌رسانی برای به‌روزرسانی بقیه بخش‌ها (مانند آیکون سبد در هدر)
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("cart:updated"));
      }
    } catch (err) {
      console.error("[UPDATE QUANTITY]", err);
      alert("خطا در تغییر تعداد محصول");
      await checkCartStatus();
    } finally {
      setLoadingCart(false);
    }
  };

  return (
    <div className="flex flex-col justify-between lg:h-[480px] border border-secondary/15 rounded-3xl p-5 bg-surface/60 backdrop-blur-md shadow-xs">
      {/* اطلاعات فروشنده و گارانتی */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-secondary/10">
          <span className="font-bold text-sm text-gray-800">فروشنده</span>
          {sellersCount > 0 && (
            <a href="#sellers" className="text-xs text-primary font-bold hover:underline transition-all">
              {sellersCount.toLocaleString("fa-IR")} فروشنده دیگر
            </a>
          )}
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-start gap-2.5">
            <BuildingStorefrontIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-gray-800 flex items-center gap-1.5">
                {vendor.store_name || "فروشنده"}
                {vendor.is_official && (
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                    رسمی
                  </span>
                )}
              </div>
              <div className="text-gray-500 mt-1">
                {Number(vendor.satisfaction_rate) > 0 && (
                  <>
                    <span className="text-emerald-600 font-bold">
                      {Number(vendor.satisfaction_rate).toLocaleString("fa-IR")}٪
                    </span>{" "}
                    رضایت |{" "}
                  </>
                )}
                عملکرد{" "}
                <span className={`${performanceColor} font-bold`}>
                  {performanceLabel}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 pt-3 border-t border-secondary/10">
            <ShieldCheckIcon className="w-5 h-5 text-primary shrink-0" />
            <span className="font-bold text-gray-700">{warrantyText}</span>
          </div>

          <div className="flex items-start gap-2.5 pt-3 border-t border-secondary/10">
            <TruckIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-gray-800">روش و هزینه تحویل</div>
              <div className="text-gray-500 text-[11px] mt-0.5">{deliveryText}</div>
            </div>
          </div>
        </div>
      </div>

      {/* بخش قیمت و اکشن دکمه / کنترلر تعداد */}
      <div className="hidden lg:block space-y-3 pt-3 border-t border-secondary/10">
        <div className="flex items-center justify-between">
          {hasDiscount && (
            <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-xs">
              {Number(product.discount_percent).toLocaleString("fa-IR")}٪
            </span>
          )}

          <div className="text-left font-faNum mr-auto">
            {hasDiscount && product.base_price != null && (
              <span className="text-xs text-gray-400 font-bold line-through decoration-red-400/50 tabular-nums block">
                {formatPrice(product.base_price)}
              </span>
            )}
            <div className="text-base sm:text-lg font-black text-[#263238] tabular-nums tracking-tighter">
              {formatPrice(product.final_price)}{" "}
              <span className="text-[10px] sm:text-xs text-gray-500 font-bold">تومان</span>
            </div>
          </div>
        </div>

        {/* ۱. نمایش وضعیت انیمیشن اضافه شدن */}
        {adding || added ? (
          <Button
            variant="gradient"
            size="lg"
            className="w-full"
            disabled={adding}
          >
            {adding ? "در حال افزودن..." : "✓ افزوده شد"}
          </Button>
        ) : cartItem ? (
          /* ۲. اگر در سبد بود: نمایش پیغام و باکس کم/زیاد کردن تعداد */
          <div className="space-y-2">
            <div className="text-center text-xs font-bold text-emerald-600 bg-emerald-50 py-1.5 px-3 rounded-xl border border-emerald-100">
              این محصول در سبد شما موجود می‌باشد
            </div>

            <div className="flex items-center justify-between border border-secondary/20 rounded-2xl p-1 bg-white">
              <button
                type="button"
                disabled={loadingCart}
                onClick={() => handleUpdateQuantity(cartItem.quantity + 1)}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
              >
                <PlusIcon className="w-4 h-4 stroke-2" />
              </button>

              <span className="font-extrabold text-sm text-gray-800 tabular-nums">
                {cartItem.quantity.toLocaleString("fa-IR")}
              </span>

              <button
                type="button"
                disabled={loadingCart}
                onClick={() => handleUpdateQuantity(cartItem.quantity - 1)}
                className="w-10 h-10 flex items-center justify-center bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
              >
                {cartItem.quantity === 1 ? (
                  <TrashIcon className="w-4 h-4 stroke-2" />
                ) : (
                  <MinusIcon className="w-4 h-4 stroke-2" />
                )}
              </button>
            </div>
          </div>
        ) : (
          /* ۳. حالت پیش‌فرض: دکمه افزودن به سبد خرید */
          <Button
            variant="gradient"
            size="lg"
            className="w-full"
            onClick={handleAddToCart}
          >
            افزودن به سبد خرید
          </Button>
        )}

        <div className="pt-2 text-xs text-gray-400 flex items-center justify-center gap-1.5 border-t border-secondary/10">
          <SparklesIcon className="w-4 h-4 text-amber-500 shrink-0" />
          <span className="font-medium text-gray-500 text-[11px]">
            تضمین بهترین کیفیت و اصالت استایل شما با آنلاین مد
          </span>
        </div>
      </div>
    </div>
  );
}