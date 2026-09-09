"use client";

import { PhoneIcon } from "@heroicons/react/24/outline";

export default function PhoneStep({ phoneNumber, setPhoneNumber, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center text-center">
      <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 shadow-inner border border-rose-100">
        <PhoneIcon className="w-7 h-7" />
      </div>

      <h3 className="text-lg font-black text-gray-900 mb-1">ورود یا ثبت‌نام</h3>
      <p className="text-xs text-gray-500 mb-6 leading-relaxed">
        برای ادامه، لطفاً شماره موبایل خود را وارد کنید
      </p>

      <div className="relative w-full mb-5">
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-3.5 text-center text-base font-bold text-gray-900 tracking-widest placeholder:text-gray-400 placeholder:font-normal placeholder:tracking-normal focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all"
          maxLength={11}
          required
          autoFocus
        />
      </div>

      <button
        type="submit"
        disabled={phoneNumber.length < 10}
        className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-sm rounded-2xl shadow-lg shadow-rose-600/25 active:scale-98 transition-all"
      >
        ارسال کد تایید
      </button>

      <p className="text-[10px] text-gray-400 mt-4">
        ورود شما به معنای پذیرش <span className="text-gray-700 underline cursor-pointer">شرایط و قوانین</span> است.
      </p>
    </form>
  );
}