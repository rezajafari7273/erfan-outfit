// app/admin/promotions/page.jsx
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
  const [extraLoading, setExtraLoading] = useState(false);

  // Modals visibility
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

  // Editing Item states
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

  // Extra data arrays
  const [flashSales, setFlashSales] = useState([]);
  const [bogoOffers, setBogoOffers] = useState([]);
  const [topBanners, setTopBanners] = useState([]);
  const [stories, setStories] = useState([]);
  const [bannerSliders, setBannerSliders] = useState([]);
  const [smallBanners, setSmallBanners] = useState([]);
  const [landings, setLandings] = useState([]);

  // Landing blocks state
  const [activeLanding, setActiveLanding] = useState(null);
  const [landingBlocks, setLandingBlocks] = useState([]);

  const pick = (res) => {
    if (res.status !== "fulfilled") return [];
    const d = res.value?.results !== undefined ? res.value : res.value?.data || res.value;
    return Array.isArray(d?.results) ? d.results : Array.isArray(d) ? d : [];
  };

  const refetchExtra = async () => {
    setExtraLoading(true);
    try {
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
    } finally {
      setExtraLoading(false);
    }
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
    try {
      const res = await adminApi.getLandingById(activeLanding.id);
      const d = res?.data !== undefined ? res.data : res;
      setActiveLanding(d);
      setLandingBlocks(d.blocks || []);
    } catch (err) {
      console.error(err);
    }
  };

  // ---------- Promotions ----------
  const handleDeletePromo = async (p) => {
    if (!confirm(`حذف پروموشن «${p.title}»؟`)) return;
    try {
      await adminApi.deletePromotion(p.id);
      refetch();
    } catch (err) {
      console.error(err);
      alert("خطا در حذف");
    }
  };

  const handleTogglePromo = async (p) => {
    try {
      await adminApi.promotionAction(p.id, "toggle_active");
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  // ---------- Coupons ----------
  const handleDeleteCoupon = async (c) => {
    if (!confirm(`حذف کوپن «${c.code}»؟`)) return;
    try {
      await adminApi.deleteCoupon(c.id);
      refetch();
    } catch (err) {
      console.error(err);
      alert("خطا در حذف");
    }
  };

  const handleToggleCoupon = async (c) => {
    try {
      await adminApi.couponAction(c.id, "toggle_active");
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  // ---------- Flash Sales ----------
  const handleDeleteFlash = async (f) => {
    if (!confirm(`حذف فروش فلش «${f.product_title || f.id}»؟`)) return;
    try {
      await adminApi.deleteFlashSale(f.id);
      refetchExtra();
    } catch (err) {
      console.error(err);
      alert("خطا در حذف");
    }
  };

  const handleToggleFlash = async (f) => {
    try {
      await adminApi.flashSaleAction(f.id, "toggle_active");
      refetchExtra();
    } catch (err) {
      console.error(err);
    }
  };

  // ---------- BOGO ----------
  const handleDeleteBogo = async (b) => {
    if (!confirm("حذف این پیشنهاد BOGO؟")) return;
    try {
      await adminApi.deleteBogoOffer(b.id);
      refetchExtra();
    } catch (err) {
      console.error(err);
      alert("خطا در حذف");
    }
  };

  const handleToggleBogo = async (b) => {
    try {
      await adminApi.bogoOfferAction(b.id, "toggle_active");
      refetchExtra();
    } catch (err) {
      console.error(err);
    }
  };

  // ---------- Banners Action ----------
  const handleToggleBanner = async (kind, id) => {
    try {
      const map = {
        "top-banners": adminApi.topBannerAction,
        stories: adminApi.storyAction,
        sliders: adminApi.bannerSliderAction,
        "small-banners": adminApi.smallBannerAction,
      };
      await map[kind](id, "toggle_active");
      refetchExtra();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBanner = async (kind, item) => {
    if (!confirm("آیا از حذف مطمئن هستید؟")) return;
    try {
      const map = {
        "top-banners": adminApi.deleteTopBanner,
        stories: adminApi.deleteStory,
        sliders: adminApi.deleteBannerSlider,
        "small-banners": adminApi.deleteSmallBanner,
      };
      await map[kind](item.id);
      refetchExtra();
    } catch (err) {
      console.error(err);
      alert("خطا در حذف");
    }
  };

  // ---------- Open Create Modals ----------
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
    <div className="p-6 space-y-6 dir-rtl font-main bg-admin-background min-h-screen text-admin-text">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-admin-surface p-6 rounded-2xl border border-admin-border shadow-sm">
        <div>
          <h1 className="text-xl font-black text-admin-text">مدیریت پروموشن‌ها و تبلیغات</h1>
          <p className="text-xs text-admin-text-muted mt-1">مدیریت تخفیف‌ها، کوپن‌ها، بنرها، استوری‌ها و صفحه لندینگ</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={refetchAll}
            title="بروزرسانی داده‌ها"
            className="p-2.5 border border-admin-border rounded-xl hover:bg-admin-background text-admin-text transition duration-200"
          >
            <ArrowPathIcon className={`w-4 h-4 ${(loading || extraLoading) ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2.5 bg-admin-primary hover:bg-admin-primary-hover text-button-text text-xs font-bold rounded-xl transition duration-200 shadow-md shadow-admin-primary/10"
          >
            <PlusIcon className="w-4 h-4" /> {activeTab.addLabel}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-admin-surface p-2 rounded-2xl border border-admin-border shadow-sm overflow-x-auto no-scrollbar">
        <div className="flex gap-2 min-w-max">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition duration-200 whitespace-nowrap ${
                tab === t.key
                  ? "bg-admin-primary text-button-text shadow-sm"
                  : "text-admin-text-muted hover:text-admin-text hover:bg-admin-background"
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input (For Promotions and Coupons) */}
      {(tab === "promotions" || tab === "coupons") && (
        <div className="bg-admin-surface p-4 rounded-2xl border border-admin-border shadow-sm">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute right-3.5 top-3 w-4 h-4 text-admin-text-muted" />
            <input
              type="text"
              placeholder="جستجو در عنوان، کد یا توضیحات..."
              value={params.search || ""}
              onChange={(e) => updateParams({ search: e.target.value })}
              className="w-full pr-10 pl-4 py-2 bg-admin-background border border-admin-border rounded-xl text-xs text-admin-text placeholder:text-admin-text-muted/60 focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary transition duration-200"
            />
          </div>
        </div>
      )}

      {/* ============ PROMOTIONS ============ */}
      {tab === "promotions" && (
        loading ? (
          <GridSkeleton count={6} />
        ) : promotions.length === 0 ? (
          <SectionBox>پروموشنی ثبت نشده است.</SectionBox>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {promotions.map((p) => (
              <div key={p.id} className="bg-admin-surface p-5 rounded-2xl border border-admin-border shadow-sm flex flex-col justify-between hover:border-admin-border/80 transition duration-200">
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-black text-admin-text text-sm">{p.title}</h3>
                      {p.description && <p className="text-[11px] text-admin-text-muted mt-1 line-clamp-2">{p.description}</p>}
                    </div>
                    <button
                      onClick={() => handleTogglePromo(p)}
                      title="تغییر وضعیت فعال/غیرفعال"
                      className={`p-1.5 rounded-lg transition duration-200 ${p.is_active ? "bg-admin-success/10 text-admin-success hover:bg-admin-success/20" : "bg-admin-background text-admin-text-muted hover:text-admin-text"}`}
                    >
                      {p.is_active ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="space-y-2 text-[11px] mb-4 bg-admin-background p-3 rounded-xl border border-admin-border/50">
                    <div className="flex justify-between items-center">
                      <span className="text-admin-text-muted">نوع و مقدار:</span>
                      <span className="font-bold font-fanum text-admin-primary">
                        {p.discount_type === "percentage" ? `${p.discount_value}%` : `${Number(p.discount_value).toLocaleString("fa-IR")} ریال`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-admin-text-muted">تعداد کوپن‌ها:</span>
                      <span className="font-bold font-fanum text-admin-text">{p.coupons_count ?? 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-admin-text-muted">وضعیت اعتبار:</span>
                      <span className={`font-bold ${p.is_valid ? "text-admin-success" : "text-admin-danger"}`}>{p.is_valid ? "معتبر" : "منقضی/نامعتبر"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-admin-border">
                  <button
                    onClick={() => { setEditingPromo(p); setPromoModal(true); }}
                    className="flex-1 py-2 bg-admin-info/10 text-admin-info hover:bg-admin-info/20 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition duration-200"
                  >
                    <PencilSquareIcon className="w-3.5 h-3.5" /> ویرایش
                  </button>
                  <button
                    onClick={() => handleDeletePromo(p)}
                    className="flex-1 py-2 bg-admin-danger/10 text-admin-danger hover:bg-admin-danger/20 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition duration-200"
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
          <TableSkeleton columns={6} rows={5} />
        ) : coupons.length === 0 ? (
          <SectionBox>کوپنی ثبت نشده است.</SectionBox>
        ) : (
          <div className="bg-admin-surface rounded-2xl border border-admin-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-admin-background text-admin-text-muted font-bold border-b border-admin-border">
                  <tr>
                    <th className="p-4">کد تخفیف</th>
                    <th className="p-4">عنوان پروموشن</th>
                    <th className="p-4 text-center">تعداد استفاده</th>
                    <th className="p-4">تاریخ انقضا</th>
                    <th className="p-4 text-center">وضعیت</th>
                    <th className="p-4 text-center">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-admin-border">
                  {coupons.map((c) => (
                    <tr key={c.id} className="hover:bg-admin-background/50 transition duration-150">
                      <td className="p-4 font-mono font-bold text-admin-primary">{c.code}</td>
                      <td className="p-4 text-admin-text font-bold">{c.promotion_title || "—"}</td>
                      <td className="p-4 text-center font-fanum">
                        <span className="font-bold text-admin-text">{c.used_count || 0}</span>
                        <span className="text-admin-text-muted"> / {c.max_uses || "نامحدود"}</span>
                      </td>
                      <td className="p-4 text-admin-text-muted font-fanum">{c.expires_at ? new Date(c.expires_at).toLocaleDateString("fa-IR") : "بدون انقضا"}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleToggleCoupon(c)}
                          className={`p-1.5 rounded-lg transition duration-200 ${c.is_active ? "bg-admin-success/10 text-admin-success" : "bg-admin-background text-admin-text-muted"}`}
                        >
                          {c.is_active ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => { setEditingCoupon(c); setCouponModal(true); }} className="p-1.5 bg-admin-info/10 text-admin-info hover:bg-admin-info/20 rounded-lg transition duration-200">
                            <PencilSquareIcon className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteCoupon(c)} className="p-1.5 bg-admin-danger/10 text-admin-danger hover:bg-admin-danger/20 rounded-lg transition duration-200">
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

      {/* ============ FLASH SALES ============ */}
      {tab === "flash" && (
        extraLoading ? (
          <TableSkeleton columns={7} rows={5} />
        ) : flashSales.length === 0 ? (
          <SectionBox>فروش فلشی ثبت نشده است.</SectionBox>
        ) : (
          <div className="bg-admin-surface rounded-2xl border border-admin-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-admin-background text-admin-text-muted font-bold border-b border-admin-border">
                  <tr>
                    <th className="p-4">محصول</th>
                    <th className="p-4">قیمت اصلی</th>
                    <th className="p-4">قیمت ویژه</th>
                    <th className="p-4">زمان شروع</th>
                    <th className="p-4">زمان پایان</th>
                    <th className="p-4 text-center">وضعیت</th>
                    <th className="p-4 text-center">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-admin-border">
                  {flashSales.map((f) => (
                    <tr key={f.id} className="hover:bg-admin-background/50 transition duration-150">
                      <td className="p-4 font-bold text-admin-text">{f.product_title || "محصول انتخاب شده"}</td>
                      <td className="p-4 text-admin-text-muted line-through font-fanum">{Number(f.product_base_price || 0).toLocaleString("fa-IR")}</td>
                      <td className="p-4 font-bold text-admin-primary font-fanum">{Number(f.discount_price || 0).toLocaleString("fa-IR")} ریال</td>
                      <td className="p-4 text-admin-text-muted font-fanum">{f.start_time ? new Date(f.start_time).toLocaleDateString("fa-IR") : "—"}</td>
                      <td className="p-4 text-admin-text-muted font-fanum">{f.end_time ? new Date(f.end_time).toLocaleDateString("fa-IR") : "—"}</td>
                      <td className="p-4 text-center">
                        <button onClick={() => handleToggleFlash(f)} className={`p-1.5 rounded-lg transition duration-200 ${f.is_active ? "bg-admin-success/10 text-admin-success" : "bg-admin-background text-admin-text-muted"}`}>
                          {f.is_active ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => { setEditingFlash(f); setFlashModal(true); }} className="p-1.5 bg-admin-info/10 text-admin-info hover:bg-admin-info/20 rounded-lg transition duration-200"><PencilSquareIcon className="w-4 h-4" /></button>
                          <button onClick={() => handleDeleteFlash(f)} className="p-1.5 bg-admin-danger/10 text-admin-danger hover:bg-admin-danger/20 rounded-lg transition duration-200"><TrashIcon className="w-4 h-4" /></button>
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
        extraLoading ? (
          <TableSkeleton columns={7} rows={5} />
        ) : bogoOffers.length === 0 ? (
          <SectionBox>پیشنهاد BOGO ثبت نشده است.</SectionBox>
        ) : (
          <div className="bg-admin-surface rounded-2xl border border-admin-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-admin-background text-admin-text-muted font-bold border-b border-admin-border">
                  <tr>
                    <th className="p-4">محصول خریداری شده</th>
                    <th className="p-4">محصول هدیه</th>
                    <th className="p-4 text-center">تعداد خرید</th>
                    <th className="p-4 text-center">تعداد هدیه</th>
                    <th className="p-4 text-center">اعتبار</th>
                    <th className="p-4 text-center">وضعیت</th>
                    <th className="p-4 text-center">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-admin-border">
                  {bogoOffers.map((b) => (
                    <tr key={b.id} className="hover:bg-admin-background/50 transition duration-150">
                      <td className="p-4 font-bold text-admin-text">{b.buy_product_title || "—"}</td>
                      <td className="p-4 text-admin-text-muted">{b.get_product_title || "همان محصول"}</td>
                      <td className="p-4 text-center font-bold text-admin-text font-fanum">{b.quantity_required}</td>
                      <td className="p-4 text-center font-bold text-admin-success font-fanum">{b.quantity_free}</td>
                      <td className="p-4 text-center">
                        <span className={`text-[10px] px-2 py-1 rounded-lg font-bold ${b.is_valid ? "bg-admin-success/10 text-admin-success" : "bg-admin-danger/10 text-admin-danger"}`}>
                          {b.is_valid ? "معتبر" : "منقضی"}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button onClick={() => handleToggleBogo(b)} className={`p-1.5 rounded-lg transition duration-200 ${b.is_active ? "bg-admin-success/10 text-admin-success" : "bg-admin-background text-admin-text-muted"}`}>
                          {b.is_active ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => { setEditingBogo(b); setBogoModal(true); }} className="p-1.5 bg-admin-info/10 text-admin-info hover:bg-admin-info/20 rounded-lg transition duration-200"><PencilSquareIcon className="w-4 h-4" /></button>
                          <button onClick={() => handleDeleteBogo(b)} className="p-1.5 bg-admin-danger/10 text-admin-danger hover:bg-admin-danger/20 rounded-lg transition duration-200"><TrashIcon className="w-4 h-4" /></button>
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
          loading={extraLoading}
          items={topBanners}
          empty="تاپ بنری ثبت نشده است."
          onToggle={(id) => handleToggleBanner("top-banners", id)}
          onEdit={(item) => { setEditingTopBanner(item); setTopBannerModal(true); }}
          onDelete={(item) => handleDeleteBanner("top-banners", item)}
          titleKey="title"
        />
      )}

      {/* ============ STORIES ============ */}
      {tab === "stories" && (
        <BannerGrid
          loading={extraLoading}
          items={stories}
          empty="استوری ثبت نشده است."
          onToggle={(id) => handleToggleBanner("stories", id)}
          onEdit={(item) => { setEditingStory(item); setStoryModal(true); }}
          onDelete={(item) => handleDeleteBanner("stories", item)}
          titleKey="title"
        />
      )}

      {/* ============ SLIDERS ============ */}
      {tab === "sliders" && (
        <BannerGrid
          loading={extraLoading}
          items={bannerSliders}
          empty="اسلایدری ثبت نشده است."
          onToggle={(id) => handleToggleBanner("sliders", id)}
          onEdit={(item) => { setEditingSlider(item); setSliderModal(true); }}
          onDelete={(item) => handleDeleteBanner("sliders", item)}
          titleKey="title"
        />
      )}

      {/* ============ SMALL BANNERS ============ */}
      {tab === "small-banners" && (
        <BannerGrid
          loading={extraLoading}
          items={smallBanners}
          empty="اسمال بنری ثبت نشده است."
          onToggle={(id) => handleToggleBanner("small-banners", id)}
          onEdit={(item) => { setEditingSmallBanner(item); setSmallBannerModal(true); }}
          onDelete={(item) => handleDeleteBanner("small-banners", item)}
          titleKey="title"
          subtitleKey="slot_key_display"
        />
      )}

      {/* ============ LANDINGS ============ */}
      {tab === "landings" && (
        <div className="space-y-6">
          {extraLoading ? (
            <GridSkeleton count={3} />
          ) : landings.length === 0 ? (
            <SectionBox>لندینگی ثبت نشده است.</SectionBox>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {landings.map((l) => (
                <div key={l.id} className="bg-admin-surface p-5 rounded-2xl border border-admin-border shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-black text-admin-text text-sm">{l.title}</h3>
                        <p className="text-[10px] text-admin-text-muted mt-1 font-mono bg-admin-background px-2 py-0.5 rounded w-fit border border-admin-border">{l.slug}</p>
                      </div>
                      <button
                        onClick={async () => { await adminApi.landingAction(l.id, "toggle_active"); refetchExtra(); }}
                        className={`p-1.5 rounded-lg transition duration-200 ${l.is_active ? "bg-admin-success/10 text-admin-success" : "bg-admin-background text-admin-text-muted"}`}
                      >
                        {l.is_active ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="text-[11px] mb-4 bg-admin-background p-2.5 rounded-xl border border-admin-border/50">
                      <div className="flex justify-between items-center">
                        <span className="text-admin-text-muted">تعداد بلاک‌ها:</span>
                        <span className="font-bold font-fanum text-admin-primary">{l.blocks_count ?? 0}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-admin-border">
                    <button
                      onClick={async () => {
                        const res = await adminApi.getLandingById(l.id);
                        const d = res?.data !== undefined ? res.data : res;
                        setActiveLanding(d);
                        setLandingBlocks(d.blocks || []);
                      }}
                      className="flex-1 py-2 bg-admin-primary-soft text-admin-primary hover:bg-admin-primary-soft/80 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition duration-200"
                    >
                      مدیریت بلاک‌ها
                    </button>
                    <button
                      onClick={() => { setEditingLanding(l); setLandingModal(true); }}
                      className="flex-1 py-2 bg-admin-info/10 text-admin-info hover:bg-admin-info/20 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition duration-200"
                    >
                      <PencilSquareIcon className="w-3.5 h-3.5" /> ویرایش
                    </button>
                    <button
                      onClick={async () => {
                        if (!confirm("حذف لندینگ؟")) return;
                        await adminApi.deleteLanding(l.id);
                        refetchExtra();
                      }}
                      className="flex-1 py-2 bg-admin-danger/10 text-admin-danger hover:bg-admin-danger/20 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition duration-200"
                    >
                      <TrashIcon className="w-3.5 h-3.5" /> حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeLanding && (
            <div className="bg-admin-surface p-5 rounded-2xl border border-admin-border shadow-sm mt-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-admin-border">
                <h3 className="font-black text-admin-text text-sm">
                  مدیریت بلاک‌های «{activeLanding.title}»
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setEditingLandingBlock(null); setLandingBlockModal(true); }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-admin-primary text-button-text text-[11px] font-bold rounded-lg hover:bg-admin-primary-hover transition duration-200"
                  >
                    <PlusIcon className="w-3.5 h-3.5" /> افزودن بلاک جدید
                  </button>
                  <button onClick={() => setActiveLanding(null)} className="text-admin-text-muted hover:text-admin-text text-[11px] font-bold px-2 py-1">
                    بستن
                  </button>
                </div>
              </div>

              {landingBlocks.length === 0 ? (
                <p className="text-center text-xs text-admin-text-muted py-8">بلاکی برای این لندینگ ثبت نشده است.</p>
              ) : (
                <div className="space-y-2">
                  {landingBlocks.map((b) => (
                    <div key={b.id} className="flex items-center gap-3 p-3 border border-admin-border rounded-xl bg-admin-background">
                      <span className="text-[10px] bg-admin-surface text-admin-text px-2 py-1 rounded-lg font-bold border border-admin-border">
                        {b.block_type_display || b.block_type}
                      </span>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-admin-text">
                          {b.title || "بدون عنوان"}
                        </div>
                        <div className="text-[10px] text-admin-text-muted font-fanum">ترتیب: {b.order}</div>
                      </div>
                      <button
                        onClick={() => { setEditingLandingBlock(b); setLandingBlockModal(true); }}
                        className="p-1.5 bg-admin-info/10 text-admin-info hover:bg-admin-info/20 rounded-lg transition duration-200"
                      >
                        <PencilSquareIcon className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (!confirm("حذف بلاک؟")) return;
                          await adminApi.deleteLandingBlock(b.id);
                          await reloadActiveLanding();
                        }}
                        className="p-1.5 bg-admin-danger/10 text-admin-danger hover:bg-admin-danger/20 rounded-lg transition duration-200"
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
// Helper Components & Skeletons
// =========================================================

function SectionBox({ children }) {
  return (
    <div className="bg-admin-surface p-12 rounded-2xl border border-admin-border text-center text-xs text-admin-text-muted">
      {children}
    </div>
  );
}

function SkeletonBase({ className = "" }) {
  return (
    <div className={`bg-admin-border/40 relative overflow-hidden rounded-lg ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

function GridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-admin-surface p-5 rounded-2xl border border-admin-border shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2 flex-1">
              <SkeletonBase className="h-4 w-3/4" />
              <SkeletonBase className="h-3 w-1/2" />
            </div>
            <SkeletonBase className="w-8 h-8 rounded-lg" />
          </div>
          <SkeletonBase className="h-16 rounded-xl" />
          <div className="flex gap-2 pt-2">
            <SkeletonBase className="h-8 flex-1 rounded-lg" />
            <SkeletonBase className="h-8 flex-1 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

function TableSkeleton({ columns = 5, rows = 5 }) {
  return (
    <div className="bg-admin-surface rounded-2xl border border-admin-border shadow-sm overflow-hidden p-4">
      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex gap-4 items-center">
            {Array.from({ length: columns }).map((_, c) => (
              <SkeletonBase key={c} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function BannerGrid({ loading, items, empty, onToggle, onEdit, onDelete, titleKey = "title", subtitleKey }) {
  if (loading) return <GridSkeleton count={4} />;
  if (!items?.length) return <SectionBox>{empty}</SectionBox>;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item.id} className="bg-admin-surface rounded-2xl border border-admin-border shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="relative aspect-video bg-admin-background">
              {item.image ? (
                <img src={item.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-admin-text-muted text-[10px]">بدون تصویر</div>
              )}
              <button
                onClick={() => onToggle(item.id)}
                className={`absolute top-2 right-2 p-1.5 rounded-lg backdrop-blur-md transition duration-200 ${item.is_active ? "bg-admin-success/90 text-button-text" : "bg-admin-surface/80 text-admin-text-muted"}`}
              >
                {item.is_active ? <EyeIcon className="w-3.5 h-3.5" /> : <EyeSlashIcon className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div className="p-3">
              <div className="font-bold text-xs text-admin-text truncate">
                {item[titleKey] || "بدون عنوان"}
              </div>
              {subtitleKey && item[subtitleKey] && (
                <div className="text-[10px] text-admin-text-muted mt-0.5 truncate">{item[subtitleKey]}</div>
              )}
            </div>
          </div>

          <div className="p-3 pt-0">
            <div className="flex items-center gap-1.5 mt-2 border-t border-admin-border pt-2">
              <button onClick={() => onEdit(item)} className="flex-1 py-1.5 bg-admin-info/10 text-admin-info hover:bg-admin-info/20 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition duration-200">
                <PencilSquareIcon className="w-3 h-3" /> ویرایش
              </button>
              <button onClick={() => onDelete(item)} className="flex-1 py-1.5 bg-admin-danger/10 text-admin-danger hover:bg-admin-danger/20 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition duration-200">
                <TrashIcon className="w-3 h-3" /> حذف
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}