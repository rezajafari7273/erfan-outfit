"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation"; // اضافه شده برای روتینگ
import { XMarkIcon } from "@heroicons/react/24/outline";
import { cartApi } from "@/features/cart/api/cartApi";
import Backdrop from "@/components/ui/Backdrop";
import PhoneStep from "./PhoneStep";
import OtpStep from "./OtpStep";

import { authApi } from "../api/authApi";
import { useAuthContext } from "../context/AuthContext";

export default function AuthModal({ isOpen, onClose }) {
  const router = useRouter();
  const { login } = useAuthContext(); 

  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [timer, setTimer] = useState(120);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setPhoneNumber("");
      setOtp(["", "", "", "", ""]);
      setIsTimerActive(false);
      setError("");
      setLoading(false);
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

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setLoading(true);
      setError("");
      try {
        await authApi.sendOtp(phoneNumber);
        setStep(2);
        setTimer(120);
        setIsTimerActive(true);
        setTimeout(() => {
          inputRefs[0].current?.focus();
        }, 100);
      } catch (err) {
        setError(err?.message || err?.detail || "خطا در ارسال کد تایید");
      } finally {
        setLoading(false);
      }
    }
  };
  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 4) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const fullCode = otp.join("");

    if (fullCode.length === 5) {
      setLoading(true);
      setError("");
      try {
        const guestSessionKey =
          typeof window !== "undefined"
            ? localStorage.getItem("guestSessionKey")
            : null;

        const res = await authApi.verifyOtp(phoneNumber, fullCode);
        const tokens = res?.data || res;
        await login(tokens);

        // ادغام سبد خرید مهمان با کاربر
        if (guestSessionKey && typeof window !== "undefined") {
          try {
            await cartApi.mergeGuestCart(guestSessionKey);
            localStorage.removeItem("guestSessionKey");
          } catch (e) {
            console.error("[MERGE CART]", e);
          }
        }

        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("cart:updated"));
        }

        handleClose();

        // هدایت کاربر به صفحه پروفایل پس از ورود موفق
        router.push("/profile");
      } catch (err) {
        setError(err?.message || err?.detail || "کد وارد شده اشتباه است");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    setError("");
    try {
      await authApi.sendOtp(phoneNumber);
      setTimer(120);
      setIsTimerActive(true);
      setOtp(["", "", "", "", ""]);
      inputRefs[0].current?.focus();
    } catch (err) {
      setError(err?.message || err?.detail || "خطا در ارسال مجدد کد");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Backdrop
      isOpen={isOpen}
      onClose={handleClose}
      zIndex="z-[10000]"
      className="flex items-center justify-center p-4 overflow-hidden"
      dir="rtl"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm bg-white/95 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl p-6 overflow-hidden z-10"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute left-4 top-4 w-9 h-9 rounded-full bg-gray-100/80 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors z-20 cursor-pointer"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

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
                    loading={loading}
                    error={error}
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
                    onBack={() => {
                      setError("");
                      setStep(1);
                    }}
                    onResend={handleResendCode}
                    formatTime={formatTime}
                    loading={loading}
                    error={error}
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