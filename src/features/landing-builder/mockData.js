export const mockLandingsData = {
  "women-fashion": {
    title: "کالکشن ویژه پوشاک زنانه",
    description: "جدیدترین استایل‌ها و تخفیف‌های حراج فصل پوشاک زنانه",
    blocks: [
      {
        id: "b-1",
        type: "heroBanner",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1400",
        title: "حراج بزرگ پوشاک زنانه",
        subtitle: "تا ۵۰٪ تخفیف برای تمام لباس‌های تابستانی",
        destination: {
          type: "products",
          value: { category: "women", sale: "true" }
        }
      },
      {
        id: "b-2",
        type: "productSlider",
        title: "محبوب‌ترین لباس‌های زنانه",
        products: [
          { id: 101, name: "مانتو تابستانی خنک", price: "۸۵۰,۰۰۰ تومان", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300" },
          { id: 102, name: "پیراهن ساحلی گلدار", price: "۶۲۰,۰۰۰ تومان", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=300" },
          { id: 103, name: "شومیز مجلسی حریر", price: "۷۹۰,۰۰۰ تومان", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=300" }
        ]
      },
      {
        id: "b-3",
        type: "bannerGrid",
        banners: [
          {
            id: 201,
            image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=600",
            title: "عینک و اکسسوری",
            destination: { type: "products", value: { category: "accessories" } }
          },
          {
            id: 202,
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600",
            title: "کفش و صندل زنانه",
            destination: { type: "products", value: { category: "shoes" } }
          }
        ]
      },
      {
        id: "b-4",
        type: "productSlider",
        title: "جدیدترین کیف‌های فصل",
        products: [
          { id: 104, name: "کیف چرم دوشی", price: "۱,۲۰۰,۰۰۰ تومان", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=300" },
          { id: 105, name: "کیف دستی زنانه", price: "۹۵۰,۰۰۰ تومان", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=300" }
        ]
      }
    ]
  },
  "summer-sale": {
    title: "جشنواره تابستانه",
    description: "بهترین پیشنهادهای خرید تابستان",
    blocks: [
      {
        id: "b-10",
        type: "heroBanner",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400",
        title: "جشنواره تابستانه داغ",
        subtitle: "ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان",
        destination: { type: "external", value: "https://example.com" }
      }
    ]
  }
};