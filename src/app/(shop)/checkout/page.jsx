"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProfileProvider } from "@/features/profile/context/ProfileContext";
import CheckoutStepper from "@/features/cart/components/checkout/CheckoutStepper";
import AddressStep from "@/features/cart/components/checkout/AddressStep";
import PaymentStep from "@/features/cart/components/checkout/PaymentStep";

function CheckoutContent() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(2);
  const [checkoutData, setCheckoutData] = useState({
    selectedAddress: null,
    shippingMethod: "express",
  });

  const handleAddressNext = (data) => {
    setCheckoutData((prev) => ({ ...prev, ...data }));
    setCurrentStep(3);
  };

  const handleBackToCart = () => {
    router.push("/cart");
  };

  const handleBackToAddress = () => {
    setCurrentStep(2);
  };

  // 🟢 هندلر پرداخت و هدایت به درگاه فیک
  const handleSubmitOrder = async (finalData) => {
    try {
      // آدرس بازگشت پس از پرداخت
      const callbackUrl = encodeURIComponent(
        `${window.location.origin}/checkout/callback`
      );

      // هدایت کاربر به صفحه درگاه فیک
      router.push(
        `/checkout/mock-payment?gateway=${finalData.paymentGateway}&amount=1500000&callbackUrl=${callbackUrl}`
      );
    } catch (error) {
      console.error("خطا در ثبت سفارش:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <CheckoutStepper currentStep={currentStep} />

        {currentStep === 2 && (
          <AddressStep
            onNext={handleAddressNext}
            onBack={handleBackToCart}
          />
        )}

        {currentStep === 3 && (
          <PaymentStep
            checkoutData={checkoutData}
            onBack={handleBackToAddress}
            onSubmitOrder={handleSubmitOrder}
          />
        )}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <ProfileProvider>
      <CheckoutContent />
    </ProfileProvider>
  );
}