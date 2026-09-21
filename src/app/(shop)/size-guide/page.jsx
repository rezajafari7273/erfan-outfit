import SizeGuide from "@/features/products/components/size-guide/SizeGuide";

export const metadata = {
  title: "راهنمای جامع سایزبندی | فروشگاه",
  description: "جدول اندازه‌گیری دقیق تی‌شرت، هودی، پیراهن و شلوار",
};

export default function SizeGuidePage() {
  return (
    <main className="min-h-screen py-8">
      <SizeGuide />
    </main>
  );
}