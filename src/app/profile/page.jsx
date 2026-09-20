"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import UserProfileHeader from "@/features/profile/components/UserProfileHeader";
import UserProfileNavigation from "@/features/profile/components/UserProfileNavigation";
import UserOrdersList from "@/features/profile/components/UserOrdersList";
import UserAddresses from "@/features/profile/components/UserAddresses";
import WishlistProductsSlider from "@/features/profile/components/WishlistProductsSlider";
import UserProfileEditModal from "@/features/profile/components/UserProfileEditModal";
import { ProfileProvider } from "@/features/profile/context/ProfileContext";
import { useProfileContext } from "@/features/profile/hooks/useProfileContext";
import { mockUserData } from "@/features/profile/mocks/userProfileData";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

function resolveAvatar(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${API_URL}${url}`;
}

function ProfileContent() {
  const [activeTab, setActiveTab] = useState("orders");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { profile, fetchProfile, loading } = useProfileContext();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const breadcrumbItems = [
    { label: "صفحه اصلی", href: "/" },
    { label: "حساب کاربری" },
  ];

  const avatarUrl = resolveAvatar(profile?.avatar);

  return (
    <div className="text-gray-800 text-sm pb-20 lg:pb-12 min-h-screen bg-gray-50/50" dir="rtl">
      <div className="container mx-auto px-4 py-4 space-y-8 max-w-6xl">
        <Breadcrumb items={breadcrumbItems} isCustomPosition={true} />

        <div className="grid grid-cols-12 gap-6 items-start">
          <div className="col-span-12 lg:col-span-4 space-y-5">
            <UserProfileHeader
              user={profile}
              onEditClick={() => setIsEditModalOpen(true)}
            />
            <UserProfileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          <div className="col-span-12 lg:col-span-8">
            {activeTab === "orders" && <UserOrdersList orders={mockUserData.orders} />}
            {activeTab === "addresses" && <UserAddresses addresses={mockUserData.addresses} />}

            {activeTab === "favorites" && (
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs text-center text-gray-500 font-medium">
                لیست علاقه‌مندی‌ها خالی است.
              </div>
            )}

            {activeTab === "account" && (
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-rokh font-black text-gray-900 text-base">اطلاعات شخصی</h3>
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                  >
                    ویرایش اطلاعات
                  </button>
                </div>

                {loading ? (
                  <div className="text-xs text-gray-400 py-4">در حال دریافت اطلاعات...</div>
                ) : (
                  <>
                    {/* آواتار */}
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="w-20 h-20 rounded-2xl bg-rose-50 border border-rose-100 overflow-hidden flex items-center justify-center shrink-0">
                        {avatarUrl ? (
                          <img
                            src={avatarUrl}
                            alt={profile?.first_name || "کاربر"}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-2xl font-bold text-rose-500">
                            {profile?.first_name ? profile.first_name[0] : "؟"}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-400 block mb-1 text-[11px] font-bold">
                          تصویر پروفایل
                        </span>
                        <span className="font-bold text-gray-800 text-sm">
                          {avatarUrl ? "ثبت شده" : "ثبت نشده"}
                        </span>
                        <button
                          onClick={() => setIsEditModalOpen(true)}
                          className="block mt-2 text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
                        >
                          تغییر تصویر
                        </button>
                      </div>
                    </div>

                    {/* سایر فیلدها */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                        <span className="text-gray-400 block mb-1">نام و نام خانوادگی</span>
                        <span className="font-bold text-gray-800">
                          {profile?.first_name
                            ? `${profile.first_name} ${profile?.last_name || ""}`
                            : "ثبت نشده"}
                        </span>
                      </div>
                      <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                        <span className="text-gray-400 block mb-1">شماره موبایل</span>
                        <span className="font-bold text-gray-800 dir-ltr text-right">
                          {profile?.phone || "—"}
                        </span>
                      </div>
                      <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                        <span className="text-gray-400 block mb-1">کد ملی</span>
                        <span className="font-bold text-gray-800 dir-ltr text-right">
                          {profile?.national_id || "ثبت نشده"}
                        </span>
                      </div>
                      <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                        <span className="text-gray-400 block mb-1">تاریخ تولد</span>
                        <span className="font-bold text-gray-800 dir-ltr text-right">
                          {profile?.birth_date || "ثبت نشده"}
                        </span>
                      </div>
                      <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 md:col-span-2">
                        <span className="text-gray-400 block mb-1">پست الکترونیک</span>
                        <span className="font-bold text-gray-800">
                          {profile?.email || "ثبت نشده"}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="w-full">
          <WishlistProductsSlider />
        </div>
      </div>

      <UserProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProfileProvider>
      <ProfileContent />
    </ProfileProvider>
  );
}