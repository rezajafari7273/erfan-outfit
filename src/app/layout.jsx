import "./globals.css";
import { mainFont, faNumFont, rokhFont } from "@/assets/fonts/fonts";
import NextTopLoader from "nextjs-toploader";
import { AuthProvider } from "@/features/auth/context/AuthContext";

export const metadata = {
  title: "فروشگاه اینترنتی",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${mainFont.variable} ${faNumFont.variable} ${rokhFont.variable} antialiased`}
      >
        <NextTopLoader
          color="#6f0000"
          initialPosition={0.1}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={300}
          zIndex={1600}
          shadow="0 0 10px #6f0000, 0 0 5px #6f0000"
        />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}