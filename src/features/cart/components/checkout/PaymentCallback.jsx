"use client";

import React from "react";
import Link from "next/link";
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowLeftIcon,
  PrinterIcon,
  MapPinIcon,
  UserIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";

export default function PaymentCallback({
  isSuccess,
  orderId,
  referenceId,
  shippingData = {},
}) {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const {
    recipientName = "رضا جعفری",
    phoneNumber = "۰۹۱۲۳۴۵۶۷۸۹",
    address = "تهران، خیابان ولیعصر، بالاتر از میدان ونک، کوچه نگار، پلاک ۱۲، واحد ۴",
    postalCode = "۱۹۶۹۷۵۴۳۲۱",
  } = shippingData;

  return (
    <div className="border border-rose-100 rounded-3xl p-6 sm:p-8 bg-white/80 backdrop-blur-md shadow-xs max-w-xl mx-auto dir-rtl print:border-none print:shadow-none print:bg-white print:p-0">
      {isSuccess ? (
        <div className="space-y-6">
          {/* هدر موفقیت - در چاپ مخفی یا ساده می‌شود */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500 print:hidden">
              <CheckCircleIcon className="w-10 h-10 sm:w-12 sm:h-12 stroke-1.5" />
            </div>

            <h2 className="text-base sm:text-xl font-black text-gray-800">
              پرداخت با موفقیت انجام شد!
            </h2>

            <p className="text-xs text-gray-500 leading-relaxed print:hidden">
              سفارش شما با موفقیت ثبت شد و در حال پردازش است.
            </p>
          </div>

          {/* اطلاعات پرداخت و سفارش */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs space-y-2.5 text-gray-700 print:bg-white print:border-gray-300">
            <h3 className="font-bold text-gray-800 pb-2 border-b border-gray-200 text-xs">
              مشخصات تراکنش
            </h3>
            {orderId && (
              <div className="flex justify-between items-center">
                <span className="text-gray-500">شماره سفارش:</span>
                <span className="font-bold tabular-nums text-gray-800">{orderId}</span>
              </div>
            )}
            {referenceId && (
              <div className="flex justify-between items-center">
                <span className="text-gray-500">کد پیگیری پرداخت:</span>
                <span className="font-bold tabular-nums text-gray-800 break-all pl-2">{referenceId}</span>
              </div>
            )}
          </div>

          {/* اطلاعات گیرنده و آدرس */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs space-y-3 text-gray-700 print:bg-white print:border-gray-300">
            <h3 className="font-bold text-gray-800 pb-2 border-b border-gray-200 flex items-center gap-1.5">
              <UserIcon className="w-4 h-4 text-rose-500 print:hidden" />
              اطلاعات تحویل‌گیرنده
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">نام گیرنده:</span>
                <span className="font-semibold text-gray-800">{recipientName}</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="w-3.5 h-3.5 text-gray-400 print:hidden" />
                <span className="text-gray-500">شماره تماس:</span>
                <span className="font-semibold tabular-nums text-gray-800">{phoneNumber}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 space-y-1.5">
              <div className="flex items-start gap-1.5">
                <MapPinIcon className="w-4 h-4 text-gray-400 shrink-0 mt-0.5 print:hidden" />
                <div>
                  <span className="text-gray-500">آدرس تحویل: </span>
                  <span className="font-medium text-gray-800 leading-relaxed">{address}</span>
                </div>
              </div>
              {postalCode && (
                <div className="text-gray-500 pr-5">
                  کد پستی: <span className="font-semibold tabular-nums text-gray-800">{postalCode}</span>
                </div>
              )}
            </div>
          </div>

          {/* دکمه‌های عملیات (در هنگام پرینت مخفی می‌شوند) */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 print:hidden">
            <Button
              variant="outline"
              size="lg"
              icon={PrinterIcon}
              onClick={handlePrint}
              className="w-full sm:w-1/2"
            >
              چاپ فاکتور
            </Button>

            <Link href="/profile/orders" className="w-full sm:w-1/2">
              <Button
                variant="gradient"
                size="lg"
                icon={ArrowLeftIcon}
                iconPosition="left"
                className="w-full"
              >
                مشاهده سفارش‌ها
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        /* بخش تراکنش ناموفق (بدون تغییر) */
        <div className="space-y-4 text-center">
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500">
            <XCircleIcon className="w-12 h-12 stroke-1.5" />
          </div>

          <h2 className="text-base sm:text-lg font-black text-gray-800">
            پرداخت ناموفق بود
          </h2>

          <p className="text-xs text-gray-500 leading-relaxed">
            تراکنش انجام نشد. در صورت کسر وجه از حساب شما، مبلغ ظرف ۷۲ ساعت آینده به حسابتان بازمی‌گردد.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link href="/cart" className="w-full">
              <Button variant="outline" size="lg" className="w-full">
                بازگشت به سبد خرید
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}