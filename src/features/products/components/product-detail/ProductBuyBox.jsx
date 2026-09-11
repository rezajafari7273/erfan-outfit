import {
  BuildingStorefrontIcon,
  ShieldCheckIcon,
  TruckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";

export default function ProductBuyBox() {
  return (
    <div className="flex flex-col justify-between lg:h-[480px] border border-secondary/15 rounded-3xl p-5 bg-surface/60 backdrop-blur-md shadow-xs">
      
      {/* بخش بالا: اطلاعات فروشنده، گارانتی و ارسال */}
      <div className="space-y-4">
        {/* هدر فروشنده */}
        <div className="flex items-center justify-between pb-3 border-b border-secondary/10">
          <span className="font-bold text-sm text-gray-800">فروشنده</span>
          <a href="#" className="text-xs text-primary font-bold hover:underline transition-all">
            ۱ فروشنده دیگر
          </a>
        </div>

        {/* اطلاعات فروشگاه، گارانتی و ارسال */}
        <div className="space-y-4 text-xs">
          {/* فروشنده */}
          <div className="flex items-start gap-2.5">
            <BuildingStorefrontIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-gray-800 flex items-center gap-1.5">
                آنلاین مد
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                  رسمی
                </span>
              </div>
              <div className="text-gray-500 mt-1">
                <span className="text-emerald-600 font-bold">۹۸.۴٪</span> رضایت |{" "}
                عملکرد <span className="text-emerald-600 font-bold">عالی</span>
              </div>
            </div>
          </div>

          {/* گارانتی */}
          <div className="flex items-center gap-2.5 pt-3 border-t border-secondary/10">
            <ShieldCheckIcon className="w-5 h-5 text-primary shrink-0" />
            <span className="font-bold text-gray-700">
              گارانتی اصالت و سلامت فیزیکی کالا
            </span>
          </div>

          {/* روش و هزینه تحویل */}
          <div className="flex items-start gap-2.5 pt-3 border-t border-secondary/10">
            <TruckIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-gray-800">روش و هزینه تحویل</div>
              <div className="text-gray-500 text-[11px] mt-0.5">
                تحویل عادی آنلاین مد • وابسته به سبد
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* بخش پایین: قیمت، دکمه و شعار */}
      <div className="hidden lg:block space-y-3 pt-3 border-t border-secondary/10">
        <div className="flex items-center justify-between">
          <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-xs">
            ۳۲٪
          </span>
          
          <div className="text-left font-faNum">
            <span className="text-xs text-gray-400 font-bold line-through decoration-red-400/50 tabular-nums block">
              ۷,۱۰۰,۰۰۰
            </span>
            <div className="text-base sm:text-lg font-black text-[#263238] tabular-nums tracking-tighter">
              ۴,۷۹۹,۰۰۰ <span className="text-[10px] sm:text-xs text-gray-500 font-bold">تومان</span>
            </div>
          </div>
        </div>

        {/* دکمه افزودن به سبد خرید */}
        <Button variant="gradient" size="lg" className="w-full">
          افزودن به سبد خرید
        </Button>

        {/* شعار اختصاصی */}
        <div className="pt-2 text-xs text-gray-400 flex items-center justify-center gap-1.5 border-t border-secondary/10">
          <SparklesIcon className="w-4 h-4 text-amber-500 shrink-0" />
          <span className="font-medium text-gray-500 text-[11px]">
            تضمین بهترین کیفیت و اصالت استایل شما با آنلاین مد
          </span>
        </div>
      </div>

    </div>
  );
}