import AdminLoginForm from "@/features/admin/components/auth/AdminLoginForm";

export const metadata = {
  title: "ورود به پنل مدیریت",
  description: "ورود کاربران مجاز به پنل مدیریت سیستم",
};

export default function AdminLoginPage() {
  return <AdminLoginForm />;
}