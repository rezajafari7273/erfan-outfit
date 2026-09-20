"use client";

import Link from "next/link";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo"; // ایمپورت کامپوننت لوگو

export default function PhoneStep({ phoneNumber, setPhoneNumber, onSubmit, loading, error }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center text-center">
      {/* استفاده از لوگو به جای آیکون */}
      <div className="mb-4">
        <Logo width={140} height={40} priority />
      </div>

      <h3 className="text-lg font-rokh font-black text-gray-900 mb-1">ورود یا ثبت‌نام</h3>
      <p className="text-xs  text-gray-500 mb-6 leading-relaxed">
        برای ادامه، لطفاً شماره موبایل خود را وارد کنید
      </p>

      {/* ورودی شماره موبایل */}
      <div className="w-full mb-5">
        <Input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          maxLength={11}
          startIcon={DevicePhoneMobileIcon}
          className="text-center tracking-widest font-bold text-base py-3 dir-ltr"
          required
          autoFocus
          error={error}
        />
      </div>

      {/* دکمه با واریانت گرادیانت */}
      <Button
        type="submit"
        variant="gradient"
        size="lg"
        disabled={phoneNumber.length < 10 || loading}
        isLoading={loading}
        className="w-full"
      >
        ارسال کد تایید
      </Button>

      {/* لینک به شرایط و قوانین */}
      <p className="text-[11px] text-gray-400 mt-4 leading-relaxed">
        ورود شما به معنای پذیرش{" "}
        <Link
          href="/terms"
          className="text-gray-700 font-bold underline hover:text-primary transition-colors"
        >
          شرایط و قوانین
        </Link>{" "}
        است.
      </p>
    </form>
  );
}