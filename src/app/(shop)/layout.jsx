import Header from "@/components/common/Header/Header";
import ShopFooterWrapper from "@/components/common/ShopFooterWrapper";
import { PromotionProvider } from "@/components/promotions/PromotionContext";
import PromotionRenderer from "@/components/promotions/PromotionRenderer";
import { BreadcrumbProvider } from "@/context/BreadcrumbContext";
import GlobalBreadcrumb from "@/components/common/Breadcrumb/GlobalBreadcrumb";
import { ProductProvider } from "@/features/products/context/ProductContext";
import ScrollRestoration from "@/components/common/ScrollRestoration";

export default function ShopLayout({ children }) {
  return (
    <PromotionProvider>
      <ProductProvider>
        <BreadcrumbProvider>
          {/* بازگردانی اسکرول بین صفحات */}
          <ScrollRestoration />

          {/* Header & Top Banner - حذف کلاس contents برای جلوگیری از برهم خوردن Containing Block */}
          <div className="w-full lg:header-wrapper lg:sticky lg:top-0 lg:z-50">
            <div className="relative z-30">
              <PromotionRenderer type="topBanner" />
            </div>

            <div className="sticky top-0 z-30 lg:static lg:z-auto">
              <Header />
            </div>
          </div>

          <GlobalBreadcrumb />

          <main>{children}</main>

          <ShopFooterWrapper />
        </BreadcrumbProvider>
      </ProductProvider>
    </PromotionProvider>
  );
}