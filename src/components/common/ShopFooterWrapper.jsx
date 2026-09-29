
'use client';

import { usePathname } from 'next/navigation';
import Footer from "@/components/common/Footer/Footer";
import MobileBottomNav from "@/components/common/MobileBottomNav";

export default function ShopFooterWrapper() {
  const pathname = usePathname();
  

  if (pathname === '/categories') {
    return null;
  }

  return (
    <>
      <Footer />
      <MobileBottomNav />
    </>
  );
}