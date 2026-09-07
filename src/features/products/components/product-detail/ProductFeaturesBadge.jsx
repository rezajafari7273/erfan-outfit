import {
  TruckIcon,
  ClockIcon,
  CreditCardIcon,
  ArrowPathIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

export default function ProductFeaturesBadge() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-8 py-4 border-y border-gray-100 text-center text-xs text-gray-500">
      <div className="flex flex-col items-center gap-2">
        <TruckIcon className="w-7 h-7 text-gray-400" />
        <span>امکان تحویل اکسپرس</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ClockIcon className="w-7 h-7 text-gray-400" />
        <span>۲۴ ساعته، ۷ روز هفته</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CreditCardIcon className="w-7 h-7 text-gray-400" />
        <span>امکان پرداخت در محل</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ArrowPathIcon className="w-7 h-7 text-gray-400" />
        <span>۷ روز ضمانت بازگشت کالا</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CheckBadgeIcon className="w-7 h-7 text-gray-400" />
        <span>ضمانت اصل بودن کالا</span>
      </div>
    </div>
  );
}