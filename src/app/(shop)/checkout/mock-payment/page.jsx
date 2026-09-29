"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircleIcon, XCircleIcon, BuildingLibraryIcon } from "@heroicons/react/24/outline";

export default function MockPaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const amount = searchParams.get("amount") || "0";
  const callbackUrl = searchParams.get("callbackUrl") || "/checkout/callback";

  const [loading, setLoading] = useState(false);

  const handleSimulateResponse = (status) => {
    setLoading(true);
    // شبیه‌سازی تاخیر درگاه بانک
    setTimeout(() => {
      const authority = "A00000000000000000000000000" + Math.floor(1000 + Math.random() * 9000);
      const target = decodeURIComponent(callbackUrl);
      const redirectUrl = `${target}?Authority=${authority}&Status=${status}`;
      
      router.push(redirectUrl);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 dir-rtl">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 space-y-6 text-center border border-gray-200">
        <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto text-rose-600">
          <BuildingLibraryIcon className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800">درگاه پرداخت آزمایشی (زرین‌پال)</h2>
          <p className="text-xs text-gray-500 mt-1">محیط تست و شبیه‌سازی پرداخت آنلاین</p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>مبلغ قابل پرداخت:</span>
            <span className="font-bold text-gray-900">{Number(amount).toLocaleString("fa-IR")} تومان</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>پذیرنده:</span>
            <span className="font-semibold text-gray-800">فروشگاه آنلاین</span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={() => handleSimulateResponse("OK")}
            disabled={loading}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <CheckCircleIcon className="w-5 h-5" />
            {loading ? "در حال انتقال..." : "تأیید و پرداخت موفق"}
          </button>

          <button
            onClick={() => handleSimulateResponse("NOK")}
            disabled={loading}
            className="w-full py-3 px-4 bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <XCircleIcon className="w-5 h-5" />
            انصراف / پرداخت ناموفق
          </button>
        </div>
      </div>
    </div>
  );
}