"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function AdminGuard({ children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.replace("/admin-panel/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-admin-background dir-rtl select-none p-4">
        <div className="flex flex-col items-center gap-4 bg-admin-surface/60 backdrop-blur-xl p-8 rounded-3xl border border-admin-border/70 shadow-2xl max-w-sm w-full text-center">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-admin-primary/10 text-admin-primary">
            <ShieldCheckIcon className="w-8 h-8 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-admin-primary rounded-full animate-ping" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-black text-admin-text">ارزیابی سطح دسترسی</h3>
            <p className="text-xs font-bold text-admin-text-muted">لطفاً چند لحظه شکیبا باشید...</p>
          </div>
          <div className="w-full bg-admin-border/50 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-admin-primary h-full w-1/2 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return children;
}