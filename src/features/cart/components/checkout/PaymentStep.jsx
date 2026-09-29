"use client";

import { useState } from "react";
import { CreditCardIcon, ShieldCheckIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";

export default function PaymentStep({ checkoutData, onBack, onSubmitOrder }) {
  const [paymentGateway, setPaymentGateway] = useState("zarinpal");
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      await onSubmitOrder({ paymentGateway, ...checkoutData });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 dir-rtl">
      {/* انتخاب درگاه */}
      <div className="border border-rose-100 rounded-3xl p-5 bg-white/80 backdrop-blur-md shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-gray-800 flex items-center gap-2 pb-3 border-b border-gray-100">
          <CreditCardIcon className="w-5 h-5 text-rose-500" />
          انتخاب درگاه پرداخت
        </h3>

        <div className="space-y-3">
          <label
            className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
              paymentGateway === "zarinpal"
                ? "border-rose-500 bg-rose-50/20 shadow-xs"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="gateway"
                checked={paymentGateway === "zarinpal"}
                onChange={() => setPaymentGateway("zarinpal")}
                className="text-rose-600 focus:ring-rose-500"
              />
              <span className="text-xs font-bold text-gray-800">درگاه پرداخت آنلاین (زرین‌پال / کارت‌های شتاب)</span>
            </div>
            <ShieldCheckIcon className="w-5 h-5 text-emerald-500" />
          </label>
        </div>
      </div>

      {/* دکمه‌های ناوبری و ثبت نهایی */}
      <div className="flex items-center justify-between pt-2">
        <Button variant="outline" onClick={onBack} disabled={loading}>
          بازگشت به مرحله قبل
        </Button>
        <Button
          variant="primary"
          size="lg"
          icon={ArrowLeftIcon}
          iconPosition="left"
          onClick={handlePay}
          disabled={loading}
        >
          {loading ? "در حال اتصال به درگاه..." : "پرداخت و ثبت نهایی سفارش"}
        </Button>
      </div>
    </div>
  );
}