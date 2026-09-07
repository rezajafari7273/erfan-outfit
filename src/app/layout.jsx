import "./globals.css";
import { mainFont, faNumFont, rokhFont } from "@/assets/fonts/fonts";

import Header from "@/components/common/Header/Header";
import NextTopLoader from "nextjs-toploader";
import MobileBottomNav from "@/components/common/MobileBottomNav";
import { PromotionProvider } from "@/components/promotions/PromotionContext";
import PromotionRenderer from "@/components/promotions/PromotionRenderer";
import Footer from "@/components/common/Footer/Footer";

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
          {/* Header */}
          <div className="contents lg:block lg:header-wrapper lg:sticky lg:top-0 lg:z-50">        
            <div className="relative z-50">
              <PromotionRenderer type="topBanner" />
            </div>

            <div className="sticky top-0 z-40 lg:static lg:z-auto">
              <Header />
            </div>
          </div>

          <main>{children}</main>

          <Footer />
          <MobileBottomNav />
        </PromotionProvider>
      </body>
    </html>
  );
}