"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

// ۱. ایمپورت کامپوننت Backdrop اختصاصی شما
import Backdrop from "@/components/ui/Backdrop"; // مسیر فایل Backdrop خود را بررسی کنید

import PhoneStep from "./PhoneStep";
import OtpStep from "./OtpStep";

export default function AuthModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(120);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  // ریست کردن استیت‌ها هنگام بسته‌شدن مودال
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setPhoneNumber("");
      setOtp(["", "", "", ""]);
      setIsTimerActive(false);
    }, 300);
  };

  useEffect(() => {
    let interval = null;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setStep(2);
      setTimer(120);
      setIsTimerActive(true);
      setTimeout(() => inputRefs[0].current?.focus(), 150);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const fullCode = otp.join("");
    if (fullCode.length === 4) {
      handleClose();
    }
  };

  const handleResendCode = () => {
    setTimer(120);
    setIsTimerActive(true);
    setOtp(["", "", "", ""]);
    inputRefs[0].current?.focus();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    // ۲. استفاده از کامپوننت Backdrop شما
    <Backdrop
      isOpen={isOpen}
      onClose={handleClose}
      zIndex="z-50"
      className="flex items-center justify-center p-4 overflow-hidden"
      dir="rtl"
    >
      <AnimatePresence>
        {isOpen && (
          /* ۳. باکس اصلی مودال با انیمیشن ورود و خروج روانی Framer Motion */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()} // جلوگیری از بسته‌شدن مودال هنگام کلیک داخل باکس
            className="relative w-full max-w-sm bg-white/95 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl p-6 overflow-hidden z-10"
          >
            {/* دکمه بستن */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute left-4 top-4 w-9 h-9 rounded-full bg-gray-100/80 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors z-20 cursor-pointer"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            {/* انیمیشن سوییچ بین فرم شماره موبایل و کد تایید OTP */}
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step-phone"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <PhoneStep
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    onSubmit={handlePhoneSubmit}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="step-otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <OtpStep
                    phoneNumber={phoneNumber}
                    otp={otp}
                    otpRefs={inputRefs}
                    timer={timer}
                    isTimerActive={isTimerActive}
                    onOtpChange={handleOtpChange}
                    onKeyDown={handleKeyDown}
                    onVerify={handleVerifyOtp}
                    onBack={() => setStep(1)}
                    onResend={handleResendCode}
                    formatTime={formatTime}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </Backdrop>
  );
}