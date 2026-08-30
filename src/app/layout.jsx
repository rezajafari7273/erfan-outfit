import "./globals.css";
import { mainFont, faNumFont, rokhFont } from "@/assets/fonts/fonts";
import Header from "@/components/common/Header/Header";
import NextTopLoader from 'nextjs-toploader';
import MobileBottomNav from "@/components/common/MobileBottomNav";

import { PromotionProvider } from "@/components/promotions/PromotionContext";
import PromotionRenderer from "@/components/promotions/PromotionRenderer";

export const metadata = {
  title: {
    default: "فروشگاه آنلاین مد | تولیدی و عرضه پوشاک زنانه، مردانه و بچگانه",
    template: "%s | آنلاین مد",
  },
  description:
    "تولیدی و فروشگاه پوشاک آنلاین مد (Online Mode)؛ عرضه مستقیم جدیدترین مدل‌های پوشاک زنانه، مردانه و بچگانه با بالاترین کیفیت، قیمت مناسب و ارسال سریع.",
  keywords: [
    "آنلاین مد",
    "Online Mode",
    "تولیدی پوشاک آنلاین مد",
    "خرید آنلاین لباس زنانه",
    "پوشاک مردانه شیک",
    "لباس بچگانه جدید",
    "فروشگاه آنلاین پوشاک",
  ],
  openGraph: {
    title: "فروشگاه آنلاین مد | تولیدی و عرضه پوشاک زنانه، مردانه و بچگانه",
    description:
      "عرضه مستقیم جدیدترین مدل‌های پوشاک زنانه، مردانه و بچگانه از تولیدی آنلاین مد. تضمین کیفیت و ارسال به سراسر کشور.",
    url: "https://online-mode.com", 
    siteName: "آنلاین مد | Online Mode",
    locale: "fa_IR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${mainFont.variable} ${faNumFont.variable} ${rokhFont.variable}`}>
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

          {children}

          <MobileBottomNav />
        </PromotionProvider>
      </body>
    </html>
  );
}