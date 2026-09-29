"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PaymentCallback from "@/features/cart/components/checkout/PaymentCallback";

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [verificationResult, setVerificationResult] = useState({
    isSuccess: false,
    orderId: null,
    referenceId: null,
  });

  const authority = searchParams.get("Authority");
  const status = searchParams.get("Status");

  useEffect(() => {
    // اگر کاربر بدون داشتن پارامترهای درگاه وارد این صفحه شود، به سبد خرید هدایت می‌شود
    if (!authority && !status) {
      router.replace("/cart");
      return;
    }

    // بررسی نتیجه پرداخت
    if (status === "OK" && authority) {
      // در پروژه واقعی: فراخوانی API مانند profileApi.verifyPayment({ authority })
      setVerificationResult({
        isSuccess: true,
        orderId: "ORD-10024",
        referenceId: authority,
      });
    } else {
      setVerificationResult({
        isSuccess: false,
        orderId: null,
        referenceId: null,
      });
    }

    setLoading(false);
  }, [authority, status, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4">
        <div className="text-sm font-bold text-gray-500 animate-pulse">
          در حال بررسی نتیجه پرداخت...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6">
      <PaymentCallback
        isSuccess={verificationResult.isSuccess}
        orderId={verificationResult.orderId}
        referenceId={verificationResult.referenceId}
      />
    </div>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4">
          <div className="text-sm font-bold text-gray-500">در حال بارگذاری...</div>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}