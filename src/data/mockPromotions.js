export const mockPromotionsData = {
  // ۱. بنر بالای سایت (Top Notification / Top Banner)
  topBanner: {
    id: "tb-1",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200",
    title: "جشنواره ویژه فصل - تا ۵۰٪ تخفیف پوشاک",
    alt: "جشنواره تخفیف پوشاک",
    badge: "۵۰٪ تخفیف",
    destination: {
      type: "landing",
      value: "/landings/women-fashion"
    }
  },

  // ۲. اسلایدر اصلی صفحه اصلی (Main Hero Slider)
  bannerSlider: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000",
      title: "کالکشن جدید تابستانه",
      subtitle: "استایل شیک و خنک برای روزهای گرم",
      alt: "کالکشن تابستانه",
      badge: "جدید",
      destination: {
        type: "products",
        value: { category: "women", collection: "summer-2026" }
      }
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000",
      title: "تخفیف‌های استثنایی برند زارا",
      subtitle: "فرصت محدود جهت خرید پوشاک زنانه",
      alt: "حراج زارا",
      badge: "ویژه",
      destination: {
        type: "external",
        value: "https://example.com"
      }
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000",
      title: "اکسسوری و کیف‌های چرمی",
      subtitle: "تکمیل‌کننده استایل خاص شما",
      alt: "اکسسوری زنانه",
      badge: "محبوب",
      destination: {
        type: "products",
        value: { category: "accessories", collection: "leather-2026" }
      }
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000",
      title: "استایل کژوال و روزمره",
      subtitle: "راحتی و زیبایی در پوشش روزانه",
      alt: "پوشاک کژوال",
      badge: "پیشنهاد روز",
      destination: {
        type: "products",
        value: { category: "casual", collection: "daily-wear" }
      }
    }
  ],

  // ۳. بنرهای پیشنهادات لحظه‌ای (۴ عدد برای چیدمان ۲ در ۲)
  instantBanners: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800",
      title: "هدفون‌های حرفه‌ای گیمینگ",
      subtitle: "تجربه صدای بی‌نظیر و شفاف",
      alt: "هدفون گیمینگ",
      badge: "فروش ویژه",
      destination: {
        type: "products",
        value: { category: "audio", collection: "headphones" }
      }
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800",
      title: "ساعت‌های هوشمند ورزشی",
      subtitle: "پایش سلامت و فعالیت‌های روزانه",
      alt: "ساعت هوشمند",
      badge: "محبوب‌ترین",
      destination: {
        type: "products",
        value: { category: "wearables", collection: "smartwatches" }
      }
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800",
      title: "اسپیکرهای بلوتوثی قابل حمل",
      subtitle: "کیفیت صدای عالی در هر مکان",
      alt: "اسپیکر بلوتوثی",
      badge: "تخفیف ویژه",
      destination: {
        type: "products",
        value: { category: "audio", collection: "speakers" }
      }
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=800",
      title: "لوازم جانبی و شارژرهای سریع",
      subtitle: "تضمین سلامت باتری دستگاه شما",
      alt: "شارژر سریع",
      badge: "پیشنهاد روز",
      destination: {
        type: "products",
        value: { category: "accessories", collection: "chargers" }
      }
    }
  ],

  // ۴. استوری‌های بالای صفحه (Stories Bar)
  stories: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=200",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      title: "پوشاک زنانه",
      alt: "پوشاک زنانه",
      destination: {
        type: "landing",
        value: "/landings/women-fashion"
      }
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      title: "کفش اسپرت",
      alt: "کفش اسپرت",
      destination: {
        type: "products",
        value: { category: "shoes", discount: "true" }
      }
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      title: "ساعت مچی",
      alt: "ساعت مچی",
      destination: {
        type: "external",
        value: "https://example.com"
      }
    }
  ],

  // ۵. بنرهای مگا منو
  megaMenuBanners: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=400",
      title: "حراج لندینگ تابستانه",
      subtitle: "پیشنهاد شگفت‌انگیز",
      alt: "حراج تابستانه",
      badge: "پیشنهاد ویژه",
      destination: {
        type: "landing",
        value: "/landings/summer-sale"
      }
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=400",
      title: "عینک‌های آفتابی",
      subtitle: "جدیدترین مدل‌های روز",
      alt: "عینک آفتابی",
      badge: "جدیدترین‌ها",
      destination: {
        type: "products",
        value: { category: "sunglasses" }
      }
    }
  ],

  // ۶. بنرهای مودال جستجو
  searchModalBanners: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=600",
      title: "جدیدترین کتانی‌ها",
      alt: "کتانی جدید",
      destination: {
        type: "products",
        value: { category: "sneakers" }
      }
    }
  ],

  // ۷. بنرهای منوی موبایل
  mobileMenuBanners: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=400",
      title: "کانال تلگرام ما",
      alt: "تلگرام",
      destination: {
        type: "external",
        value: "https://t.me/example"
      }
    }
  ]
};