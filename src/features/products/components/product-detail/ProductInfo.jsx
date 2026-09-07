import {
  CheckCircleIcon,
  ChevronLeftIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export default function ProductInfo() {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-600 text-xs font-bold">
            <span>هیسکا</span>
            <span>/</span>
            <a href="#">ماوس (موشواره) هیسکا</a>
          </div>
          <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200">
            HISKA
          </span>
        </div>

        <h1 className="text-base lg:text-lg font-bold text-gray-900 mt-2 leading-relaxed">
          ماوس بی سیم هیسکا مدل HX-MO365، قابلیت اتصال با دانگل USB و بلوتوث، دارای
          11 کلید، دقت 8000 DPI، دارای کلید روشن و خاموش و عملکرد بی‌صدا
        </h1>
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-500">
        <span className="text-amber-500 font-bold flex items-center gap-1">
          ★ ۴.۴ <span className="text-gray-400 font-normal">(امتیاز ۶۴ خریدار)</span>
        </span>
        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
        <button className="text-cyan-600 hover:underline">۳۹ دیدگاه</button>
        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
        <button className="text-cyan-600 hover:underline">۱۶ پرسش</button>
      </div>

      <div className="pt-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-gray-500">رنگ:</span>
          <span className="font-bold text-sm">مشکی</span>
        </div>
        <button className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white ring-2 ring-cyan-500 ring-offset-2">
          <CheckCircleIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="pt-2 border-t border-gray-100">
        <span className="font-bold text-sm block mb-3">ویژگی‌ها</span>
        <div className="bg-gray-50 rounded-xl p-3 inline-block min-w-[200px]">
          <span className="text-xs text-gray-400 block mb-1">نوع رابط</span>
          <span className="text-xs font-bold text-gray-700">
            دانگل USB، بلوتوث
          </span>
        </div>
      </div>

      <button className="text-xs text-cyan-600 font-bold flex items-center gap-1 border border-cyan-100 bg-cyan-50/50 px-3 py-2 rounded-xl hover:bg-cyan-50">
        مشاهده همه ویژگی‌ها
        <ChevronLeftIcon className="w-4 h-4" />
      </button>

      <div className="border border-purple-100 bg-gradient-to-r from-purple-50/30 to-white p-4 rounded-2xl relative">
        <div className="flex items-center gap-2 text-purple-700 font-bold mb-2">
          <SparklesIcon className="w-4 h-4" />
          <span>ارسال رایگان سفارش‌ها برای اعضای پلاس</span>
        </div>
        <ul className="text-xs text-gray-600 space-y-1.5 pr-6 list-disc marker:text-purple-500">
          <li>۴ ارسال رایگان دیجی‌کالا</li>
          <li>۲ ارسال هایپرمارکت</li>
        </ul>
      </div>
    </div>
  );
}