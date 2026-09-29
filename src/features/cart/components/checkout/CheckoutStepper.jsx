"use client";

import React from "react";
import { ShoppingBagIcon, MapPinIcon, CreditCardIcon, CheckIcon } from "@heroicons/react/24/outline";

const STEPS = [
  { id: 1, title: "سبد خرید", icon: ShoppingBagIcon },
  { id: 2, title: "آدرس و ارسال", icon: MapPinIcon },
  { id: 3, title: "پرداخت و ثبت", icon: CreditCardIcon },
];

export default function CheckoutStepper({ currentStep = 2 }) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8 dir-rtl">
      <div className="flex items-center justify-between relative">
        {/* خط اتصال بین مراحل */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 bg-gray-200 -z-10" />
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 h-0.5 bg-rose-500 transition-all duration-300 -z-10"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((step) => {
          const Icon = step.icon;
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center gap-2 bg-white px-2">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                  isCompleted
                    ? "bg-emerald-500 text-white shadow-xs"
                    : isCurrent
                    ? "bg-rose-500 text-white shadow-md ring-4 ring-rose-100"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {isCompleted ? <CheckIcon className="w-5 h-5 stroke-2" /> : <Icon className="w-5 h-5 stroke-2" />}
              </div>
              <span
                className={`text-xs font-bold ${
                  isCurrent ? "text-gray-900 font-black" : isCompleted ? "text-emerald-600" : "text-gray-400"
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}