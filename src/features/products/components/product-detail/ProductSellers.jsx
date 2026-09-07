import {
  BuildingStorefrontIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

export default function ProductSellers() {
  return (
    <div className="mt-8">
      <h2 className="font-bold text-base border-b-2 border-rose-600 pb-2 inline-block mb-4">
        فروشندگان این کالا
      </h2>

      <div className="space-y-3">
        {/* فروشنده اول */}
        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-2xl gap-4 hover:border-gray-300 transition-colors bg-white">
          <div className="flex items-center gap-3">
            <BuildingStorefrontIcon className="w-6 h-6 text-gray-600" />
            <div>
              <div className="font-bold text-sm flex items-center gap-2">
                هیسکا
                <span className="text-[10px] bg-cyan-100 text-cyan-700 px-1.5 py-0.2 rounded">
                  رسمی
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded">
                  منتخب
                </span>
              </div>
              <div className="text-xs text-gray-400 mt-0.5">
                <span className="text-emerald-600 font-bold">۸۶.۴٪</span> رضایت از
                کالا | عملکرد{" "}
                <span className="text-emerald-600 font-bold">عالی</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <TruckIcon className="w-4 h-4 text-gray-400" />
            <span>ارسال دیجی‌کالا</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
            <ShieldCheckIcon className="w-4 h-4 text-gray-400" />
            <span>گارانتی ۱۲ ماهه هیسکا سرویس</span>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4">
            <div className="text-left">
              <span className="text-xs text-gray-400 line-through block">
                ۷,۱۰۰,۰۰۰
              </span>
              <div className="font-bold text-base text-gray-900">
                ۴,۷۹۹,۰۰۰ <span className="text-xs font-normal">تومان</span>
              </div>
            </div>
            <button className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors">
              افزودن به سبد خرید
            </button>
          </div>
        </div>

        {/* فروشنده دوم */}
        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-2xl gap-4 hover:border-gray-300 transition-colors bg-gray-50/30">
          <div className="flex items-center gap-3">
            <BuildingStorefrontIcon className="w-6 h-6 text-gray-600" />
            <div>
              <div className="font-bold text-sm">فروشگاه نتاجین</div>
              <div className="text-xs text-gray-400 mt-0.5">
                عملکرد <span className="text-emerald-600 font-bold">عالی</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <TruckIcon className="w-4 h-4 text-gray-400" />
            <span>ارسال دیجی‌کالا از ۱ روز کاری دیگر</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
            <ShieldCheckIcon className="w-4 h-4 text-gray-400" />
            <span>گارانتی ۱۲ ماهه هیسکا سرویس</span>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4">
            <div className="font-bold text-base text-gray-900">
              ۶,۷۰۰,۰۰۰ <span className="text-xs font-normal">تومان</span>
            </div>
            <button className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors">
              افزودن به سبد خرید
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}