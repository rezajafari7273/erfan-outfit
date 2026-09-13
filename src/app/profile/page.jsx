"use client";

import { useState } from "react";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";

import UserProfileHeader from "@/features/profile/components/UserProfileHeader";
import UserProfileNavigation from "@/features/profile/components/UserProfileNavigation";
import UserOrdersList from "@/features/profile/components/UserOrdersList";
import UserAddresses from "@/features/profile/components/UserAddresses";

import { mockUserData } from "@/features/profile/mocks/userProfileData";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("orders");

  const breadcrumbItems = [
    { label: "صفحه اصلی", href: "/" },
    { label: "حساب کاربری" },
  ];

  return (
    <div className="text-gray-800 text-sm pb-20 lg:pb-12 min-h-screen bg-gray-50/50" dir="rtl">
      <div className="container mx-auto px-4 py-4 space-y-6 max-w-6xl">
        
        {/* بردکرامپ */}
        <Breadcrumb items={breadcrumbItems} isCustomPosition={true} />

        {/* لی‌اوت اصلی */}
        <div className="grid grid-cols-12 gap-6 items-start">
          
          {/* ستون راست (سایدبار اطلاعات کاربر و ناوبری) */}
          <div className="col-span-12 lg:col-span-4 space-y-5">
            <UserProfileHeader user={mockUserData} />
            <UserProfileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* ستون چپ (محتوای تب فعال) */}
          <div className="col-span-12 lg:col-span-8">
            {activeTab === "orders" && <UserOrdersList orders={mockUserData.orders} />}
            {activeTab === "addresses" && <UserAddresses addresses={mockUserData.addresses} />}
            
            {activeTab === "favorites" && (
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs text-center text-gray-500 font-medium">
                لیست علاقه‌مندی‌ها خالی است.
              </div>
            )}

            {activeTab === "account" && (
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
                <h3 className="font-rokh font-black text-gray-900 text-base">اطلاعات شخصی</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="text-gray-400 block mb-1">نام و نام خانوادگی</span>
                    <span className="font-bold text-gray-800">{mockUserData.name}</span>
                  </div>
                  <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="text-gray-400 block mb-1">شماره موبایل</span>
                    <span className="font-bold text-gray-800 dir-ltr text-right">{mockUserData.phone}</span>
                  </div>
                  <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 md:col-span-2">
                    <span className="text-gray-400 block mb-1">پست الکترونیک</span>
                    <span className="font-bold text-gray-800">{mockUserData.email}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}