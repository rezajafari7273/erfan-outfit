import "./globals.css";
// خط زیر را اضافه کنید
import { mainFont, faNumFont, rokhFont } from "@/assets/fonts/fonts";

import Header from "@/components/common/Header/Header";
import NextTopLoader from "nextjs-toploader";
import MobileBottomNav from "@/components/common/MobileBottomNav";
import { PromotionProvider } from "@/components/promotions/PromotionContext";
import PromotionRenderer from "@/components/promotions/PromotionRenderer";
import Footer from "@/components/common/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${mainFont.variable} ${faNumFont.variable} ${rokhFont.variable} antialiased`}
      >
        <NextTopLoader
          color="#6f0000"
          initialPosition={0.1}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={300}
          zIndex={1600}
          shadow="0 0 10px #6f0000, 0 0 5px #6f0000"
        />
        <PromotionProvider>
          <div className="header-wrapper sticky top-0 z-50">
            <PromotionRenderer type="topBanner" />
            <Header />
          </div>

          <main>{children}</main>

          <Footer />
          <MobileBottomNav />
        </PromotionProvider>
      </body>
    </html>
  );
}