export const mockUserData = {
  name: "علی ایمانی",
  phone: "۰۹۱۲۳۴۵۶۷۸۹",
  email: "ali.imani@example.com",
  avatar: "/assets/images/user-avatar.jpg",
  walletBalance: "۱,۲۵۰,۰۰۰",
  clubPoints: 480, // 👈 عدد فارسی ۴۸۰ به انگلیسی 480 تغییر یافت
  orders: [
    {
      id: "ORD-98231",
      date: "۱۴۰۳/۰۶/۱۲",
      status: "delivered", // delivered, processing, cancelled
      statusText: "تحویل داده شده",
      totalPrice: "۴,۷۹۹,۰۰۰",
      itemsCount: 3,
      items: [
        { name: "پیراهن کتان آستین بلند OverSize", color: "مشکی", price: "۲,۳۹۹,۰۰۰" },
        { name: "شلوار کتان اسلیم فیت", color: "خاکستری", price: "۲,۴۰۰,۰۰۰" },
      ],
    },
    {
      id: "ORD-98104",
      date: "۱۴۰۳/۰۵/۲۸",
      status: "processing",
      statusText: "در حال پردازش",
      totalPrice: "۱,۸۵۰,۰۰۰",
      itemsCount: 1,
      items: [
        { name: "تی‌شرت پنبه‌ای یقه گرد", color: "سفید", price: "۱,۸۵۰,۰۰۰" },
      ],
    },
  ],
  addresses: [
    {
      id: 1,
      title: "منزل",
      address: "تهران، شهرک اندیشه، فاز ۳، خیابان آزادی، پلاک ۴۲، واحد ۳",
      postalCode: "۱۳۵۷۹۲۴۶۸۰",
      receiver: "علی ایمانی",
      phone: "۰۹۱۲۳۴۵۶۷۸۹",
      isDefault: true,
    },
  ],
};