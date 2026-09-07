import {
  BuildingStorefrontIcon,
  ShieldCheckIcon,
  TruckIcon,
  InformationCircleIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

export default function ProductBuyBox() {
  return (
    <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50/50 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <span className="font-bold text-sm">فروشنده</span>
        <a href="#" className="text-xs text-cyan-600 font-bold">
          ۱ فروشنده دیگر
        </a>
      </div>

      <div className="space-y-3 text-xs">
        <div className="flex items-start gap-2">
          <BuildingStorefrontIcon className="w-5 h-5 text-gray-600 shrink-0" />
          <div>
            <div className="font-bold text-gray-800 flex items-center gap-1">
              هیسکا
              <span className="text-[10px] bg-cyan-100 text-cyan-700 px-1.5 py-0.2 rounded">
                رسمی
              </span>
            </div>
            <div className="text-gray-400 mt-1">
              <span className="text-emerald-600 font-bold">۸۶.۴٪</span> رضایت |{" "}
              عملکرد <span className="text-emerald-600 font-bold">عالی</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-gray-200/60">
          <ShieldCheckIcon className="w-5 h-5 text-gray-600 shrink-0" />
          <span className="font-bold text-gray-700">
            گارانتی ۱۲ ماهه هیسکا سرویس
          </span>
        </div>

        <div className="flex items-start gap-2 pt-2 border-t border-gray-200/60">
          <TruckIcon className="w-5 h-5 text-cyan-600 shrink-0" />
          <div>
            <div className="font-bold text-gray-800">توسط دیجی‌کالا</div>
            <div className="text-gray-400 text-[11px] mt-0.5">
              ارسال سریع و رایگان
            </div>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-200 space-y-2">
        <div className="flex items-center justify-between">
          <span className="bg-rose-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            ۳۲٪
          </span>
          <div className="text-left">
            <span className="text-xs text-gray-400 line-through block">
              ۷,۱۰۰,۰۰۰
            </span>
            <div className="text-base font-black text-gray-900">
              ۴,۷۹۹,۰۰۰ <span className="text-xs font-normal">تومان</span>
            </div>
          </div>
        </div>

        <button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-rose-600/20 transition-all text-sm">
          افزودن به سبد خرید
        </button>
      </div>

      <div className="pt-2 text-xs text-gray-400 flex items-center justify-between cursor-pointer hover:text-gray-600">
        <span className="flex items-center gap-1">
          <InformationCircleIcon className="w-3.5 h-3.5" />
          فرآیند قیمت‌گذاری و نظارت بر قیمت
        </span>
        <ChevronLeftIcon className="w-3.5 h-3.5" />
      </div>
    </div>
  );
}