"use client";

import { ArrowRightIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

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
        className="absolute right-4 top-4 text-xs font-semibold text-gray-400 hover:text-gray-700 flex items-center gap-1 transition-colors"
      >
        <ArrowRightIcon className="w-4 h-4" />
        ویرایش شماره
      </button>

      <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 shadow-inner border border-emerald-100 mt-2">
        <ShieldCheckIcon className="w-7 h-7" />
      </div>

      <h3 className="text-lg font-black text-gray-900 mb-1">کد تایید را وارد کنید</h3>
      <p className="text-xs text-gray-500 mb-6 dir-ltr">
        کد ۴ رقمی به شماره <span className="font-bold text-gray-800">{phoneNumber}</span> ارسال شد
      </p>

      <div className="flex items-center justify-center gap-3 dir-ltr w-full mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={otpRefs[index]}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => onOtpChange(index, e.target.value)}
            onKeyDown={(e) => onKeyDown(index, e)}
            className="w-13 h-14 bg-gray-50 border border-gray-200 rounded-2xl text-center text-xl font-black text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white transition-all shadow-sm"
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={otp.some((digit) => !digit)}
        className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-600/25 active:scale-98 transition-all"
      >
        تایید و ورود
      </button>

      <div className="mt-5 text-xs text-gray-500">
        {isTimerActive ? (
          <span>ارسال مجدد کد تا <strong className="text-gray-800 font-bold">{formatTime(timer)}</strong> دیگر</span>
        ) : (
          <button
            type="button"
            onClick={onResend}
            className="text-rose-600 font-bold hover:underline"
          >
            ارسال مجدد کد
          </button>
        )}
      </div>
    </form>
  );
}