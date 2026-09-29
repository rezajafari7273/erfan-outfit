"use client";

import { useState, useEffect } from "react";
import { usePromotions } from "@/features/admin/hooks/usePromotions";
import { useCatalog } from "@/features/admin/hooks/useCatalog";
import { adminApi } from "@/features/admin/api/adminApi";
import PromotionModal from "@/features/admin/components/promotions/PromotionModal";
import CouponModal from "@/features/admin/components/promotions/CouponModal";
import FlashSaleModal from "@/features/admin/components/promotions/FlashSaleModal";
import BogoModal from "@/features/admin/components/promotions/BogoModal";
import TopBannerModal from "@/features/admin/components/promotions/TopBannerModal";
import StoryModal from "@/features/admin/components/promotions/StoryModal";
import BannerSliderModal from "@/features/admin/components/promotions/BannerSliderModal";
import SmallBannerModal from "@/features/admin/components/promotions/SmallBannerModal";
import LandingPageModal from "@/features/admin/components/promotions/LandingPageModal";
import LandingBlockModal from "@/features/admin/components/promotions/LandingBlockModal";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  TagIcon,
  TicketIcon,
  BoltIcon,
  GiftIcon,
  RectangleStackIcon,
  FireIcon,
  PhotoIcon,
  SparklesIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

const TABS = [
  { key: "promotions", label: "پروموشن‌ها", icon: TagIcon, addLabel: "افزودن پروموشن" },
  { key: "coupons", label: "کوپن‌ها", icon: TicketIcon, addLabel: "افزودن کوپن" },
  { key: "flash", label: "فروش فلش", icon: BoltIcon, addLabel: "افزودن فروش فلش" },
  { key: "bogo", label: "بخر یکی ببر یکی", icon: GiftIcon, addLabel: "افزودن BOGO" },
  { key: "top-banners", label: "تاپ بنر", icon: RectangleStackIcon, addLabel: "افزودن تاپ بنر" },
  { key: "stories", label: "استوری‌ها", icon: FireIcon, addLabel: "افزودن استوری" },
  { key: "sliders", label: "اسلایدر", icon: PhotoIcon, addLabel: "افزودن اسلاید" },
  { key: "small-banners", label: "اسمال بنر", icon: SparklesIcon, addLabel: "افزودن اسمال بنر" },
  { key: "landings", label: "لندینگ‌ها", icon: DocumentDuplicateIcon, addLabel: "افزودن لندینگ" },
];

export default function AdminPromotionsPage() {
  const { promotions, coupons, loading, params, updateParams, refetch } = usePromotions();
  const { products, landings: catalogLandings, categories, colors, sizes } = useCatalog();

  const [tab, setTab] = useState("promotions");

  // Modals
  const [promoModal, setPromoModal] = useState(false);
  const [couponModal, setCouponModal] = useState(false);
  const [flashModal, setFlashModal] = useState(false);
  const [bogoModal, setBogoModal] = useState(false);
  const [topBannerModal, setTopBannerModal] = useState(false);
  const [storyModal, setStoryModal] = useState(false);
  const [sliderModal, setSliderModal] = useState(false);
  const [smallBannerModal, setSmallBannerModal] = useState(false);
  const [landingModal, setLandingModal] = useState(false);
  const [landingBlockModal, setLandingBlockModal] = useState(false);

  const [editingPromo, setEditingPromo] = useState(null);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [editingFlash, setEditingFlash] = useState(null);
  const [editingBogo, setEditingBogo] = useState(null);
  const [editingTopBanner, setEditingTopBanner] = useState(null);
  const [editingStory, setEditingStory] = useState(null);
  const [editingSlider, setEditingSlider] = useState(null);
  const [editingSmallBanner, setEditingSmallBanner] = useState(null);
  const [editingLanding, setEditingLanding] = useState(null);
  const [editingLandingBlock, setEditingLandingBlock] = useState(null);

  // Extra data
  const [flashSales, setFlashSales] = useState([]);
  const [bogoOffers, setBogoOffers] = useState([]);
  const [topBanners, setTopBanners] = useState([]);
  const [stories, setStories] = useState([]);
  const [bannerSliders, setBannerSliders] = useState([]);
  const [smallBanners, setSmallBanners] = useState([]);
  const [landings, setLandings] = useState([]);

  // Landing blocks
  const [activeLanding, setActiveLanding] = useState(null);
  const [landingBlocks, setLandingBlocks] = useState([]);

  const pick = (res) => {
    if (res.status !== "fulfilled") return [];
    const d = res.value?.results !== undefined ? res.value : res.value?.data || res.value;
    return Array.isArray(d?.results) ? d.results : Array.isArray(d) ? d : [];
  };

  const refetchExtra = async () => {
    const results = await Promise.allSettled([
      adminApi.getFlashSales({ page_size: 100 }),
      adminApi.getBogoOffers({ page_size: 100 }),
      adminApi.getTopBanners({ page_size: 100 }),
      adminApi.getStories({ page_size: 100 }),
      adminApi.getBannerSliders({ page_size: 100 }),
      adminApi.getSmallBanners({ page_size: 100 }),
      adminApi.getLandings({ page_size: 100 }),
    ]);
    setFlashSales(pick(results[0]));
    setBogoOffers(pick(results[1]));
    setTopBanners(pick(results[2]));
    setStories(pick(results[3]));
    setBannerSliders(pick(results[4]));
    setSmallBanners(pick(results[5]));
    setLandings(pick(results[6]));
  };

  useEffect(() => {
    refetchExtra();
  }, []);

  const refetchAll = () => {
    refetch();
    refetchExtra();
  };

  const reloadActiveLanding = async () => {
    if (!activeLanding) return;
    const res = await adminApi.getLandingById(activeLanding.id);
    const d = res?.data !== undefined ? res.data : res;
    setActiveLanding(d);
    setLandingBlocks(d.blocks || []);
  };

  // ---------- Promotion ----------
  const handleDeletePromo = async (p) => {
    if (!confirm(`حذف پروموشن «${p.title}»؟`)) return;
    try {
      await adminApi.deletePromotion(p.id);
      refetch();
    } catch (err) { console.error(err); alert("خطا در حذف"); }
  };

  const handleTogglePromo = async (p) => {
    try {
      await adminApi.promotionAction(p.id, "toggle_active");
      refetch();
    } catch (err) { console.error(err); }
  };

  // ---------- Coupon ----------
  const handleDeleteCoupon = async (c) => {
    if (!confirm(`حذف کوپن «${c.code}»؟`)) return;
    try {
      await adminApi.deleteCoupon(c.id);
      refetch();
    } catch (err) { console.error(err); alert("خطا در حذف"); }
  };

  const handleToggleCoupon = async (c) => {
    try {
      await adminApi.couponAction(c.id, "toggle_active");
      refetch();
    } catch (err) { console.error(err); }
  };

  // ---------- FlashSale ----------
  const handleDeleteFlash = async (f) => {
    if (!confirm(`حذف فروش فلش «${f.product_title}»؟`)) return;
    try {
      await adminApi.deleteFlashSale(f.id);
      refetchExtra();
    } catch (err) { console.error(err); alert("خطا در حذف"); }
  };

  const handleToggleFlash = async (f) => {
    try {
      await adminApi.flashSaleAction(f.id, "toggle_active");
      refetchExtra();
    } catch (err) { console.error(err); }
  };

  // ---------- BOGO ----------
  const handleDeleteBogo = async (b) => {
    if (!confirm("حذف BOGO؟")) return;
    try {
      await adminApi.deleteBogoOffer(b.id);
      refetchExtra();
    } catch (err) { console.error(err); alert("خطا در حذف"); }
  };

  const handleToggleBogo = async (b) => {
    try {
      await adminApi.bogoOfferAction(b.id, "toggle_active");
      refetchExtra();
    } catch (err) { console.error(err); }
  };

  // ---------- Banners ----------
  const handleToggleBanner = async (kind, id) => {
    try {
      const map = {
        "top-banners": adminApi.topBannerAction,
        "stories": adminApi.storyAction,
        "sliders": adminApi.bannerSliderAction,
        "small-banners": adminApi.smallBannerAction,
      };
      await map[kind](id, "toggle_active");
      refetchExtra();
    } catch (err) { console.error(err); }
  };

  const handleDeleteBanner = async (kind, item) => {
    if (!confirm("حذف شود؟")) return;
    try {
      const map = {
        "top-banners": adminApi.deleteTopBanner,
        "stories": adminApi.deleteStory,
        "sliders": adminApi.deleteBannerSlider,
        "small-banners": adminApi.deleteSmallBanner,
      };
      await map[kind](item.id);
      refetchExtra();
    } catch (err) { console.error(err); alert("خطا در حذف"); }
  };

  // ---------- Open modals ----------
  const openCreate = () => {
    if (tab === "promotions") { setEditingPromo(null); setPromoModal(true); }
    if (tab === "coupons") { setEditingCoupon(null); setCouponModal(true); }
    if (tab === "flash") { setEditingFlash(null); setFlashModal(true); }
    if (tab === "bogo") { setEditingBogo(null); setBogoModal(true); }
    if (tab === "top-banners") { setEditingTopBanner(null); setTopBannerModal(true); }
    if (tab === "stories") { setEditingStory(null); setStoryModal(true); }
    if (tab === "sliders") { setEditingSlider(null); setSliderModal(true); }
    if (tab === "small-banners") { setEditingSmallBanner(null); setSmallBannerModal(true); }
    if (tab === "landings") { setEditingLanding(null); setLandingModal(true); }
  };

  const activeTab = TABS.find((t) => t.key === tab) || TABS[0];

  return (
    <div className="p-6 space-y-6 dir-rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-800 dark:text-slate-100">مدیریت پروموشن‌ها</h1>
          <p className="text-xs text-slate-500 mt-1">تخفیف‌ها، کوپن‌ها، بنرها و پیشنهادات ویژه</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={refetchAll}
            className="p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            <ArrowPathIcon className="w-4 h-4" />
          </button>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-rose-600/20"
          >
            <PlusIcon className="w-4 h-4" /> {activeTab.addLabel}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap ${
                tab === t.key
                  ? "bg-rose-600 text-white"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute right-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="جستجو..."
            value={params.search}
            onChange={(e) => updateParams({ search: e.target.value })}
            className="w-full pr-10 pl-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
      </div>

      {/* ============ PROMOTIONS ============ */}
      {tab === "promotions" && (
        loading ? (
          <SectionBox>در حال بارگذاری...</SectionBox>
        ) : promotions.length === 0 ? (
          <SectionBox>پروموشنی ثبت نشده</SectionBox>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {promotions.map((p) => (
              <div key={p.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-black text-slate-800 dark:text-slate-100 text-sm">{p.title}</h3>
                    {p.description && <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{p.description}</p>}
                  </div>
                  <button
                    onClick={() => handleTogglePromo(p)}
                    className={`p-1.5 rounded-lg ${p.is_active ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"}`}
                  >
                    {p.is_active ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                  </button>
                </div>

                <div className="space-y-1.5 text-[11px] mb-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500">تخفیف:</span>
                    <span className="font-bold">
                      {p.discount_type_display}: {p.discount_type === "percentage" ? `${p.discount_value}%` : Number(p.discount_value).toLocaleString("fa-IR")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">کوپن‌ها:</span>
                    <span className="font-bold">{p.coupons_count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">اعتبار:</span>
                    <span className={`font-bold ${p.is_valid ? "text-emerald-600" : "text-rose-600"}`}>{p.is_valid ? "فعال" : "غیرفعال"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => { setEditingPromo(p); setPromoModal(true); }}
                    className="flex-1 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1"
                  >
                    <PencilSquareIcon className="w-3.5 h-3.5" /> ویرایش
                  </button>
                  <button
                    onClick={() => handleDeletePromo(p)}
                    className="flex-1 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1"
                  >
                    <TrashIcon className="w-3.5 h-3.5" /> حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* ============ COUPONS ============ */}
      {tab === "coupons" && (
        loading ? (
          <SectionBox>در حال بارگذاری...</SectionBox>
        ) : coupons.length === 0 ? (
          <SectionBox>کوپنی ثبت نشده</SectionBox>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold border-b">
                  <tr>
                    <th className="p-4">کد</th>
                    <th className="p-4">پروموشن</th>
                    <th className="p-4 text-center">استفاده</th>
                    <th className="p-4">انقضا</th>
                    <th className="p-4 text-center">وضعیت</th>
                    <th className="p-4 text-center">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {coupons.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                      <td className="p-4 font-mono font-bold text-slate-800 dark:text-slate-100">{c.code}</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">{c.promotion_title}</td>
                      <td className="p-4 text-center">
                        <span className="font-bold">{c.used_count}</span>
                        <span className="text-slate-400"> / {c.max_uses}</span>
                      </td>
                      <td className="p-4 text-slate-500">{new Date(c.expires_at).toLocaleDateString("fa-IR")}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleToggleCoupon(c)}
                          className={`p-1.5 rounded-lg ${c.is_active ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"}`}
                        >
                          {c.is_active ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => { setEditingCoupon(c); setCouponModal(true); }} className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                            <PencilSquareIcon className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteCoupon(c)} className="p-1.5 bg-rose-50 text-rose-600 rounded-lg">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}

      {/* ============ FLASH ============ */}
      {tab === "flash" && (
        flashSales.length === 0 ? (
          <SectionBox>فروش فلشی ثبت نشده</SectionBox>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold border-b">
                  <tr>
                    <th className="p-4">محصول</th>
                    <th className="p-4">قیمت اصلی</th>
                    <th className="p-4">قیمت تخفیف</th>
                    <th className="p-4">شروع</th>
                    <th className="p-4">پایان</th>
                    <th className="p-4 text-center">وضعیت</th>
                    <th className="p-4 text-center">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {flashSales.map((f) => (
                    <tr key={f.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                      <td className="p-4 font-bold text-slate-800 dark:text-slate-100">{f.product_title}</td>
                      <td className="p-4 text-slate-500">{Number(f.product_base_price || 0).toLocaleString("fa-IR")}</td>
                      <td className="p-4 font-bold text-rose-600">{Number(f.discount_price).toLocaleString("fa-IR")}</td>
                      <td className="p-4 text-slate-500">{new Date(f.start_time).toLocaleDateString("fa-IR")}</td>
                      <td className="p-4 text-slate-500">{new Date(f.end_time).toLocaleDateString("fa-IR")}</td>
                      <td className="p-4 text-center">
                        <button onClick={() => handleToggleFlash(f)} className={`p-1.5 rounded-lg ${f.is_active ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"}`}>
                          {f.is_active ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => { setEditingFlash(f); setFlashModal(true); }} className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><PencilSquareIcon className="w-4 h-4" /></button>
                          <button onClick={() => handleDeleteFlash(f)} className="p-1.5 bg-rose-50 text-rose-600 rounded-lg"><TrashIcon className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}

      {/* ============ BOGO ============ */}
      {tab === "bogo" && (
        bogoOffers.length === 0 ? (
          <SectionBox>BOGO ثبت نشده</SectionBox>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold border-b">
                  <tr>
                    <th className="p-4">بخر</th>
                    <th className="p-4">ببر</th>
                    <th className="p-4 text-center">تعداد خرید</th>
                    <th className="p-4 text-center">تعداد رایگان</th>
                    <th className="p-4 text-center">اعتبار</th>
                    <th className="p-4 text-center">وضعیت</th>
                    <th className="p-4 text-center">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {bogoOffers.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                      <td className="p-4 font-bold text-slate-800 dark:text-slate-100">{b.buy_product_title}</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">{b.get_product_title}</td>
                      <td className="p-4 text-center">{b.quantity_required}</td>
                      <td className="p-4 text-center">{b.quantity_free}</td>
                      <td className="p-4 text-center">
                        <span className={`text-[10px] px-2 py-1 rounded-lg font-bold ${b.is_valid ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                          {b.is_valid ? "فعال" : "غیرفعال"}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button onClick={() => handleToggleBogo(b)} className={`p-1.5 rounded-lg ${b.is_active ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"}`}>
                          {b.is_active ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => { setEditingBogo(b); setBogoModal(true); }} className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><PencilSquareIcon className="w-4 h-4" /></button>
                          <button onClick={() => handleDeleteBogo(b)} className="p-1.5 bg-rose-50 text-rose-600 rounded-lg"><TrashIcon className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}

      {/* ============ TOP BANNERS ============ */}
      {tab === "top-banners" && (
        <BannerGrid
          items={topBanners}
          empty="تاپ بنری ثبت نشده"
          onToggle={(id) => handleToggleBanner("top-banners", id)}
          onEdit={(item) => { setEditingTopBanner(item); setTopBannerModal(true); }}
          onDelete={(item) => handleDeleteBanner("top-banners", item)}
          titleKey="title"
        />
      )}

      {/* ============ STORIES ============ */}
      {tab === "stories" && (
        <BannerGrid
          items={stories}
          empty="استوری ثبت نشده"
          onToggle={(id) => handleToggleBanner("stories", id)}
          onEdit={(item) => { setEditingStory(item); setStoryModal(true); }}
          onDelete={(item) => handleDeleteBanner("stories", item)}
          titleKey="title"
        />
      )}

      {/* ============ SLIDERS ============ */}
      {tab === "sliders" && (
        <BannerGrid
          items={bannerSliders}
          empty="اسلایدری ثبت نشده"
          onToggle={(id) => handleToggleBanner("sliders", id)}
          onEdit={(item) => { setEditingSlider(item); setSliderModal(true); }}
          onDelete={(item) => handleDeleteBanner("sliders", item)}
          titleKey="title"
        />
      )}

      {/* ============ SMALL BANNERS ============ */}
      {tab === "small-banners" && (
        <BannerGrid
          items={smallBanners}
          empty="اسمال بنری ثبت نشده"
          onToggle={(id) => handleToggleBanner("small-banners", id)}
          onEdit={(item) => { setEditingSmallBanner(item); setSmallBannerModal(true); }}
          onDelete={(item) => handleDeleteBanner("small-banners", item)}
          titleKey="title"
          subtitleKey="slot_key_display"
        />
      )}

      {/* ============ LANDINGS ============ */}
      {tab === "landings" && (
        <div className="space-y-4">
          {landings.length === 0 ? (
            <SectionBox>لندینگی ثبت نشده</SectionBox>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {landings.map((l) => (
                <div key={l.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-black text-slate-800 dark:text-slate-100 text-sm">{l.title}</h3>
                      <p className="text-[10px] text-slate-500 mt-1 font-mono">{l.slug}</p>
                    </div>
                    <button
                      onClick={async () => { await adminApi.landingAction(l.id, "toggle_active"); refetchExtra(); }}
                      className={`p-1.5 rounded-lg ${l.is_active ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"}`}
                    >
                      {l.is_active ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="text-[11px] mb-3">
                    <div className="flex justify-between">
                      <span className="text-slate-500">تعداد بلاک:</span>
                      <span className="font-bold">{l.blocks_count}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={async () => {
                        const res = await adminApi.getLandingById(l.id);
                        const d = res?.data !== undefined ? res.data : res;
                        setActiveLanding(d);
                        setLandingBlocks(d.blocks || []);
                      }}
                      className="flex-1 py-2 bg-violet-50 text-violet-600 hover:bg-violet-100 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1"
                    >
                      بلاک‌ها
                    </button>
                    <button
                      onClick={() => { setEditingLanding(l); setLandingModal(true); }}
                      className="flex-1 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1"
                    >
                      <PencilSquareIcon className="w-3.5 h-3.5" /> ویرایش
                    </button>
                    <button
                      onClick={async () => {
                        if (!confirm("حذف شود؟")) return;
                        await adminApi.deleteLanding(l.id);
                        refetchExtra();
                      }}
                      className="flex-1 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1"
                    >
                      <TrashIcon className="w-3.5 h-3.5" /> حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeLanding && (
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-slate-800 dark:text-slate-100 text-sm">
                  بلاک‌های «{activeLanding.title}»
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setEditingLandingBlock(null); setLandingBlockModal(true); }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-rose-600 text-white text-[11px] font-bold rounded-lg hover:bg-rose-700"
                  >
                    <PlusIcon className="w-3.5 h-3.5" /> افزودن بلاک
                  </button>
                  <button onClick={() => setActiveLanding(null)} className="text-slate-400 text-[11px]">بستن</button>
                </div>
              </div>

              {landingBlocks.length === 0 ? (
                <p className="text-center text-xs text-slate-500 py-6">بلاکی ثبت نشده</p>
              ) : (
                <div className="space-y-2">
                  {landingBlocks.map((b) => (
                    <div key={b.id} className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-xl">
                      <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-bold">
                        {b.block_type_display}
                      </span>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                          {b.title || "—"}
                        </div>
                        <div className="text-[10px] text-slate-500">ترتیب: {b.order}</div>
                      </div>
                      <button
                        onClick={() => { setEditingLandingBlock(b); setLandingBlockModal(true); }}
                        className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"
                      >
                        <PencilSquareIcon className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (!confirm("حذف شود؟")) return;
                          await adminApi.deleteLandingBlock(b.id);
                          await reloadActiveLanding();
                        }}
                        className="p-1.5 bg-rose-50 text-rose-600 rounded-lg"
                      >
                        <TrashIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ============ MODALS ============ */}
      <PromotionModal isOpen={promoModal} onClose={() => setPromoModal(false)} editingPromotion={editingPromo} onSuccess={refetch} />
      <CouponModal isOpen={couponModal} onClose={() => setCouponModal(false)} editingCoupon={editingCoupon} promotions={promotions} onSuccess={refetch} />
      <FlashSaleModal isOpen={flashModal} onClose={() => setFlashModal(false)} editingItem={editingFlash} products={products} onSuccess={refetchExtra} />
      <BogoModal isOpen={bogoModal} onClose={() => setBogoModal(false)} editingItem={editingBogo} products={products} onSuccess={refetchExtra} />
      <TopBannerModal isOpen={topBannerModal} onClose={() => setTopBannerModal(false)} editingItem={editingTopBanner} products={products} landings={catalogLandings} categories={categories} colors={colors} sizes={sizes} onSuccess={refetchExtra} />
      <StoryModal isOpen={storyModal} onClose={() => setStoryModal(false)} editingItem={editingStory} products={products} landings={catalogLandings} categories={categories} colors={colors} sizes={sizes} onSuccess={refetchExtra} />
      <BannerSliderModal isOpen={sliderModal} onClose={() => setSliderModal(false)} editingItem={editingSlider} products={products} landings={catalogLandings} categories={categories} colors={colors} sizes={sizes} onSuccess={refetchExtra} />
      <SmallBannerModal isOpen={smallBannerModal} onClose={() => setSmallBannerModal(false)} editingItem={editingSmallBanner} products={products} landings={catalogLandings} categories={categories} colors={colors} sizes={sizes} onSuccess={refetchExtra} />
      <LandingPageModal isOpen={landingModal} onClose={() => setLandingModal(false)} editingItem={editingLanding} onSuccess={refetchExtra} />
      <LandingBlockModal
        isOpen={landingBlockModal}
        onClose={() => setLandingBlockModal(false)}
        editingItem={editingLandingBlock}
        landingId={activeLanding?.id}
        categories={categories}
        products={products}
        onSuccess={async () => {
          await reloadActiveLanding();
          refetchExtra();
        }}
      />
    </div>
  );
}

// =========================================================
// Helpers
// =========================================================

function SectionBox({ children }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-12 rounded-2xl border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
      {children}
    </div>
  );
}

function BannerGrid({ items, empty, onToggle, onEdit, onDelete, titleKey = "title", subtitleKey }) {
  if (!items?.length) return <SectionBox>{empty}</SectionBox>;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="relative aspect-video bg-slate-100 dark:bg-slate-800">
            {item.image ? (
              <img src={item.image} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 text-[10px]">بدون تصویر</div>
            )}
            <button
              onClick={() => onToggle(item.id)}
              className={`absolute top-2 right-2 p-1.5 rounded-lg backdrop-blur ${item.is_active ? "bg-emerald-500/90 text-white" : "bg-slate-500/80 text-white"}`}
            >
              {item.is_active ? <EyeIcon className="w-3.5 h-3.5" /> : <EyeSlashIcon className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="p-3">
            <div className="font-bold text-xs text-slate-800 dark:text-slate-100 truncate">
              {item[titleKey] || "—"}
            </div>
            {subtitleKey && item[subtitleKey] && (
              <div className="text-[10px] text-slate-500 mt-0.5">{item[subtitleKey]}</div>
            )}
            <div className="flex items-center gap-1.5 mt-3">
              <button onClick={() => onEdit(item)} className="flex-1 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1">
                <PencilSquareIcon className="w-3 h-3" /> ویرایش
              </button>
              <button onClick={() => onDelete(item)} className="flex-1 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1">
                <TrashIcon className="w-3 h-3" /> حذف
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}