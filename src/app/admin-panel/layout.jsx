"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import AdminSidebar from "@/features/admin/components/common/AdminSidebar";
import AdminHeader from "@/features/admin/components/common/AdminHeader";
import AdminGuard from "@/features/admin/components/auth/AdminGuard";
import Backdrop from "@/components/ui/Backdrop";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  if (pathname === "/admin-panel/login") {
    return <>{children}</>;
  }

  return (
    <AdminGuard>
      <div className="min-h-screen flex bg-admin-background text-admin-text" dir="rtl">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:flex relative z-20 flex-shrink-0">
          <AdminSidebar />
        </div>

        {/* Sidebar - Mobile Drawer */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <>
              <Backdrop
                isOpen={isMobileSidebarOpen}
                onClose={() => setIsMobileSidebarOpen(false)}
                zIndex="z-[60]"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="lg:hidden fixed inset-y-0 right-0 z-[70] w-72 max-w-[85vw] shadow-2xl"
              >
                <AdminSidebar onCloseMobile={() => setIsMobileSidebarOpen(false)} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col min-w-0">
          <AdminHeader onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)} />
          <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-admin-background">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}