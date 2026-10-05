"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const STORAGE_PREFIX = "scrollY:";

export default function ScrollRestoration() {
  const pathname = usePathname();
  const prevPathRef = useRef(null);

  // ---------- ذخیره اسکرول مسیر قبلی قبل از تغییر ----------
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prev = prevPathRef.current;
    if (prev && prev !== pathname) {
      try {
        sessionStorage.setItem(`${STORAGE_PREFIX}${prev}`, String(window.scrollY));
      } catch {}
    }

    prevPathRef.current = pathname;
  }, [pathname]);

  // ---------- بازگردانی اسکرول موقع mount مسیر جدید ----------
  useEffect(() => {
    if (typeof window === "undefined") return;

    // توی صفحه محصول، اسکرول رو برنگردون (می‌خوایم از بالا دیده بشه)
    const isProductPage = /^\/products\/[^/]+/.test(pathname);
    if (isProductPage) return;

    const key = `${STORAGE_PREFIX}${pathname}`;
    let saved = null;
    try {
      saved = sessionStorage.getItem(key);
    } catch {}

    if (saved !== null && !isNaN(Number(saved))) {
      const y = Number(saved);

      // چند بار تلاش کن چون ممکنه محتوا هنوز کامل لود نشده
      const t1 = setTimeout(() => {
        window.scrollTo({ top: y, behavior: "instant" });
      }, 60);
      const t2 = setTimeout(() => {
        window.scrollTo({ top: y, behavior: "instant" });
      }, 250);
      const t3 = setTimeout(() => {
        window.scrollTo({ top: y, behavior: "instant" });
      }, 600);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [pathname]);

  // ---------- ذخیره اسکرول موقع unmount (اختیاری، برای back) ----------
  useEffect(() => {
    if (typeof window === "undefined") return;

    const save = () => {
      try {
        sessionStorage.setItem(
          `${STORAGE_PREFIX}${pathname}`,
          String(window.scrollY)
        );
      } catch {}
    };

    // ذخیره در هر اسکرول (throttle نرم با rAF)
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        save();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      save();
    };
  }, [pathname]);

  return null;
}