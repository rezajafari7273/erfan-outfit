"use client";

import React from "react";
import { useParams } from "next/navigation";
import { mockLandingsData } from "@/features/landing-builder/mockData";
import BlockRenderer from "@/features/landing-builder/components/BlockRenderer";

export default function LandingPage() {
  const params = useParams();
  const slug = params?.slug;

  const landingData = mockLandingsData[slug];

  if (!landingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500" dir="rtl">
        صفحه لندینگ مورد نظر یافت نشد.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-6 px-4 md:px-8" dir="rtl">
      <div className="max-w-5xl mx-auto">
        {/* هدر لندینگ */}
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-black text-gray-900">{landingData.title}</h1>
          {landingData.description && (
            <p className="text-sm text-gray-500 mt-1">{landingData.description}</p>
          )}
        </header>

        {/* رندر پویا و ترتیبی بلاک‌های صفحه لندینگ */}
        <div className="space-y-6">
          {landingData.blocks?.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </div>
      </div>
    </main>
  );
}