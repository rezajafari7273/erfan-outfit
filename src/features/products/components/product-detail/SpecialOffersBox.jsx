"use client";

import { SparklesIcon } from "@heroicons/react/24/outline";

export default function ProductBenefitsBox({
  title = "ارسال رایگان + امکان پرداخت قسطی",
  items = [
    "ارسال رایگان برای سفارش‌های بالای ۱.۵ میلیون تومان",
    "امکان پرداخت در ۴ قسط با اسنپ‌پی (بدون کارمزد)",
    "۷ روز ضمانت تعویض سایز رایگان",
  ],
  className = "",
}) {
  return (
    <div
      className={`relative border border-amber-500/20 bg-amber-500/5 p-4 rounded-2xl backdrop-blur-md shadow-xs ${className}`}
    >
      <div className="flex items-center gap-2 text-amber-700 font-bold mb-2">
        <SparklesIcon className="w-4 h-4 shrink-0 text-amber-600 stroke-[2]" />
        <span>{title}</span>
      </div>

      <ul className="text-xs text-gray-600 space-y-1.5 pr-6 list-disc marker:text-amber-500">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}