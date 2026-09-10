"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

export default function OtpStep({
  phoneNumber,
  otp,
  otpRefs,
  timer,
  isTimerActive,
  onOtpChange,
  onKeyDown,
  onVerify,
  onBack,
  onResend,
  formatTime,
}) {
  return (
    <form onSubmit={onVerify} className="flex flex-col items-center text-center">
      <button
        type="button"
        onClick={onBack}
        className="absolute right-4 top-4 text-xs font-semibold text-gray-400 hover:text-gray-700 flex items-center gap-1 transition-colors cursor-pointer"
      >
        <ArrowRightIcon className="w-4 h-4" />
        ویرایش شماره
      </button>

      {/* لوگو وب‌سایت */}
      <div className="mb-4 mt-2">
        <Logo width={140} height={40} priority />
      </div>

      <h3 className="text-lg font-black font-rokh text-gray-900 mb-1">کد تایید را وارد کنید</h3>
      <p className="text-xs text-gray-500 mb-6 dir-ltr">
        کد ۵ رقمی به شماره <span className="font-bold text-gray-800">{phoneNumber}</span> ارسال شد
      </p>

      {/* ورودی‌های ۵ رقمی کد تایید با پر شدن دقیق از چپ‌ترین باکس */}
      <div className="flex flex-row-reverse items-center justify-center gap-2.5 dir-ltr w-full mb-6">
        {otp.slice(0, 5).map((digit, index) => (
          <input
            key={index}
            ref={otpRefs[index]}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => onOtpChange(index, e.target.value)}
            autoFocus={index === 0}
            onKeyDown={(e) => onKeyDown(index, e)}
            className="w-11 h-13 bg-gray-100/80 border border-gray-200 focus:border-transparent focus:ring-4 focus:ring-emerald-500/30 focus:bg-white rounded-2xl text-center text-xl font-black text-gray-900 outline-none transition-all duration-200"
          />
        ))}
      </div>

      {/* دکمه تایید و ورود */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={otp.length < 5 || otp.some((digit) => !digit)}
        className="w-full !bg-emerald-600 hover:!bg-emerald-700 shadow-emerald-600/20"
      >
        تایید و ورود
      </Button>

      <div className="mt-5 text-xs text-gray-500">
        {isTimerActive ? (
          <span>
            ارسال مجدد کد تا <strong className="text-gray-800 font-bold">{formatTime(timer)}</strong> دیگر
          </span>
        ) : (
          <button
            type="button"
            onClick={onResend}
            className="text-rose-600 font-bold hover:underline cursor-pointer"
          >
            ارسال مجدد کد
          </button>
        )}
      </div>
    </form>
  );
}