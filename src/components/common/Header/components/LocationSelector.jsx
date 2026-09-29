"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { profileApi } from "@/features/profile/api/profileApi";
import { useProfileContext } from "@/features/profile/hooks/useProfileContext";

function LocationContent() {
  const [addressState, setAddressState] = useState(null);
  let contextAddresses = null;

  // بررسی ایمن وجود ProfileContext
  try {
    const context = useProfileContext();
    contextAddresses = context?.addresses;
  } catch {
    contextAddresses = null;
  }

  // دریافت مستقیم آدرس‌ها از API در صورت عدم وجود Context
  const fetchAddressesDirectly = useCallback(async () => {
    try {
      const data = await profileApi.getAddresses();
      const list = Array.isArray(data) ? data : data?.results || [];
      return list;
    } catch {
      return [];
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const resolveLocation = async () => {
      let list = contextAddresses;

      // اگر Context موجود نبود یا لیستی نداشت، از API فراخوانی انجام می‌شود
      if (!list || list.length === 0) {
        list = await fetchAddressesDirectly();
      }

      if (!isMounted) return;

      if (list && list.length > 0) {
        // ۱. پیدا کردن آدرس پیش‌فرض
        const defaultAddress = list.find((a) => a.is_default || a.isDefault);
        // ۲. انتخاب آدرس پیش‌فرض یا آخرین آدرس ثبت‌شده
        const target = defaultAddress || list[list.length - 1];

        if (target) {
          if (target.province && target.city) {
            setAddressState(`${target.province}، ${target.city}`);
          } else if (target.city) {
            setAddressState(target.city);
          } else {
            setAddressState("انتخاب آدرس");
          }
        }
      } else {
        setAddressState("انتخاب آدرس");
      }
    };

    resolveLocation();

    return () => {
      isMounted = false;
    };
  }, [contextAddresses, fetchAddressesDirectly]);

  return (
    <Link
      href="/profile?tab=addresses"
      className="flex items-center gap-1.5 text-xs font-bold text-primary/80 hover:text-primary transition-colors"
    >
      <MapPinIcon className="w-5 h-5 text-secondary shrink-0" />
      <span>ارسال به:</span>
      <span className="text-gray-800 font-semibold truncate max-w-[140px]">
        {addressState || "در حال دریافت..."}
      </span>
    </Link>
  );
}

export default function LocationSelector() {
  return <LocationContent />;
}