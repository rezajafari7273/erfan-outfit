import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import MobileBottomNav from "@/components/common/MobileBottomNav";
import { PromotionProvider } from "@/components/promotions/PromotionContext";
import PromotionRenderer from "@/components/promotions/PromotionRenderer";
import { BreadcrumbProvider } from "@/context/BreadcrumbContext";
import GlobalBreadcrumb from "@/components/common/Breadcrumb/GlobalBreadcrumb";
import { ProductProvider } from "@/features/products/context/ProductContext";

export default function ShopLayout({ children }) {
  return (
    <PromotionProvider>
      <ProductProvider>
        <BreadcrumbProvider>
          {/* Header & Top Banner */}
          <div className="contents lg:block lg:header-wrapper lg:sticky lg:top-0 lg:z-50">
            <div className="relative z-30">
              <PromotionRenderer type="topBanner" />
            </div>

            <div className="sticky top-0 z-30 lg:static lg:z-auto">
              <Header />
            </div>
          </div>

          <GlobalBreadcrumb />

          <main>{children}</main>

          <Footer />
          <MobileBottomNav />
        </BreadcrumbProvider>
      </ProductProvider>
    </PromotionProvider>
  );
}