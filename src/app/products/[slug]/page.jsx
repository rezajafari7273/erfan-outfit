import ProductBreadcrumb from "@/features/products/components/product-detail/ProductBreadcrumb";
import ProductGallery from "@/features/products/components/product-detail/ProductGallery";
import ProductInfo from "@/features/products/components/product-detail/ProductInfo";
import ProductBuyBox from "@/features/products/components/product-detail/ProductBuyBox";
import ProductFeaturesBadge from "@/features/products/components/product-detail/ProductFeaturesBadge";
import ProductSellers from "@/features/products/components/product-detail/ProductSellers";

export default function ProductPage() {
  return (
    <div className="bg-white text-gray-800 font-sans text-sm pb-12" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-4">
        
        {/* خرده‌نان */}
        <ProductBreadcrumb />

        {/* بخش اصلی محصول (۳ ستونه) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-4">
          
          {/* ستون راست: گالری عکس */}
          <div className="lg:col-span-4">
            <ProductGallery />
          </div>

          {/* ستون وسط: مشخصات */}
          <div className="lg:col-span-5">
            <ProductInfo />
          </div>

          {/* ستون چپ: باکس خرید */}
          <div className="lg:col-span-3">
            <ProductBuyBox />
          </div>

        </div>

        {/* بنرهای مزایا */}
        <ProductFeaturesBadge />

        {/* جدول سایر فروشندگان */}
        <ProductSellers />

      </div>
    </div>
  );
}