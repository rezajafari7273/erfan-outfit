import {
  TruckIcon,
  ClockIcon,
  CreditCardIcon,
  ArrowPathIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

const FEATURES = [
  {
    id: 1,
    title: "تحویل اکسپرس",
    subtitle: "ارسال سریع سراسری",
    icon: TruckIcon,
  },
  {
    id: 2,
    title: "پشتیبانی ۲۴/۷",
    subtitle: "پاسخگویی همیشگی",
    icon: ClockIcon,
  },
  {
    id: 3,
    title: "پرداخت در محل",
    subtitle: "ویژه سفارش‌های تهران",
    icon: CreditCardIcon,
  },
  {
    id: 4,
    title: "۷ روز ضمانت بازگشت",
    subtitle: "بدون قید و شرط",
    icon: ArrowPathIcon,
  },
  {
    id: 5,
    title: "ضمانت اصالت",
    subtitle: "۱۰۰٪ کالا اورجینال",
    icon: CheckBadgeIcon,
  },
];

export default function ProductFeaturesBadge() {
  return (
    <div className="my-6">
      {/* Container یکپارچه با Glassmorphism */}
      <div className="bg-surface/60 border border-cart-boarder backdrop-blur-xl rounded-2xl p-4 shadow-md">
        
        {/* ۱. گرید ۲ ستونه در موبایل (کمتر از lg) */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 divide-y-0 lg:hidden">
          {FEATURES.map((item, index) => {
            const Icon = item.icon;
            const isLastOdd =
              FEATURES.length % 2 !== 0 && index === FEATURES.length - 1;

            return (
              <div
                key={item.id}
                className={`flex items-center gap-2.5 group ${
                  isLastOdd ? "col-span-2 justify-center" : ""
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 border border-secondary/20">
                  <Icon className="w-5 h-5 text-secondary stroke-[1.6]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-slate-700 group-hover:text-primary transition-colors truncate">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-slate-400 group-hover:text-slate-600 transition-colors truncate font-medium">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ۲. گرید ۵ ستونه یکپارچه در دسکتاپ (lg به بالا) */}
        <div className="hidden lg:grid grid-cols-5 divide-x divide-x-reverse divide-gray-200/60">
          {FEATURES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex items-center justify-center gap-3 px-3 first:pr-0 last:pl-0 group cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 border border-secondary/20 transition-all duration-200 group-hover:scale-105 group-hover:bg-secondary/20">
                  <Icon className="w-5 h-5 text-secondary stroke-[1.6]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-700 group-hover:text-primary transition-colors">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-slate-400 group-hover:text-slate-600 transition-colors font-medium">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}