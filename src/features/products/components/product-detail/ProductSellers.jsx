import {
  BuildingStorefrontIcon,
  ShieldCheckIcon,
  TruckIcon,
  StarIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";

const PERFORMANCE_LABELS = {
  excellent: "عالی",
  good: "خوب",
  average: "متوسط",
  poor: "ضعیف",
};

function formatPrice(v) {
  if (v === null || v === undefined) return "";
  return Number(v).toLocaleString("fa-IR");
}

export default function ProductSellers({ product }) {
  const sellers = Array.isArray(product?.other_sellers) ? product.other_sellers : [];

  // اگر فروشنده دیگری وجود ندارد، هیچ چیز نمایش نده
  if (sellers.length === 0) return null;

  return (
    <div className="mt-10">
      {/* موبایل */}
      <div className="block lg:hidden mb-6">
        <Divider variant="gradient" className="my-0">
          <h2 className="font-rokh text-base text-slate-800">
            فروشندگان دیگر این کالا
          </h2>
        </Divider>
      </div>

      {/* دسکتاپ */}
      <div className="hidden lg:flex items-center gap-3 mb-6">
        <div className="w-1.5 h-6 bg-primary rounded-full" />
        <h2 className="font-rokh font-bold text-base text-slate-800">
          فروشندگان دیگر این کالا
        </h2>
        <span className="text-xs text-slate-400 font-medium mr-auto">
          {sellers.length.toLocaleString("fa-IR")} فروشگاه فعال
        </span>
      </div>

      {/* لیست فروشندگان */}
      <div className="space-y-3">
        {sellers.map((seller) => {
          const vendor = seller.vendor || {};
          const hasDiscount = Number(seller.discount_percent) > 0;
          const performanceLabel =
            PERFORMANCE_LABELS[vendor.performance] || vendor.performance || "";

          return (
            <div
              key={seller.id}
              className="group relative bg-surface/70 backdrop-blur-xl border border-cart-boarder rounded-2xl p-4 lg:p-5 transition-all duration-300 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* بخش ۱: نام فروشگاه */}
                <div className="md:col-span-4 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                    <BuildingStorefrontIcon className="w-6 h-6 text-secondary stroke-[1.6]" />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold font-rokh text-sm text-slate-800 truncate group-hover:text-primary transition-colors">
                        {vendor.store_name || "فروشنده"}
                      </span>
                      {vendor.is_official && (
                        <span className="text-[10px] bg-cyan-500/10 text-cyan-600 border border-cyan-500/20 px-2 py-0.5 rounded-md font-medium">
                          رسمی
                        </span>
                      )}
                      {vendor.is_featured && (
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2 py-0.5 rounded-md font-medium">
                          منتخب
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                      <StarIcon className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>
                        رضایت:{" "}
                        <strong className="text-slate-700 font-bold">
                          {Number(vendor.satisfaction_rate || 0).toLocaleString("fa-IR")}٪
                        </strong>
                      </span>
                      {performanceLabel && (
                        <>
                          <span className="text-slate-300">•</span>
                          <span>
                            عملکرد:{" "}
                            <strong className="text-emerald-600 font-bold">
                              {performanceLabel}
                            </strong>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* بخش ۲: ارسال و گارانتی */}
                <div className="md:col-span-4 flex flex-col justify-center gap-2 border-y md:border-y-0 md:border-x border-slate-100 py-3 md:py-0 md:px-4 text-xs text-slate-600">
                  {seller.delivery_text && (
                    <div className="flex items-center gap-2">
                      <TruckIcon className="w-4 h-4 text-secondary shrink-0 stroke-[1.6]" />
                      <span className="truncate">{seller.delivery_text}</span>
                    </div>
                  )}
                  {seller.warranty_text && (
                    <div className="flex items-center gap-2">
                      <ShieldCheckIcon className="w-4 h-4 text-secondary shrink-0 stroke-[1.6]" />
                      <span className="truncate">{seller.warranty_text}</span>
                    </div>
                  )}
                </div>

                {/* بخش ۳: قیمت و دکمه */}
                <div className="md:col-span-4 flex items-center justify-between md:justify-end gap-4">
                  <div className="flex flex-col items-start md:items-end">
                    {hasDiscount && seller.base_price && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-slate-400 line-through">
                          {formatPrice(seller.base_price)}
                        </span>
                        <span className="text-[10px] bg-rose-500/10 text-rose-600 border border-rose-500/20 px-1.5 py-0.5 rounded-md font-bold">
                          ٪{Number(seller.discount_percent).toLocaleString("fa-IR")}
                        </span>
                      </div>
                    )}
                    <div className="text-base font-bold text-slate-800">
                      {formatPrice(seller.final_price)}{" "}
                      <span className="text-xs font-normal text-slate-500">
                        تومان
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="gradient"
                    size="md"
                    icon={ShoppingBagIcon}
                    iconPosition="right"
                  >
                    افزودن به سبد
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}