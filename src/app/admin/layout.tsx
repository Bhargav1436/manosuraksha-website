import { AdminSidebar } from "@/components/admin/sidebar";

export const metadata = {
  title: "Admin Panel – Manosuraksha",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#f5f0ea" }}>
      <AdminSidebar />
      <main className="flex-1 overflow-auto pt-[56px] md:pt-0">{children}</main>
    </div>
  );
}
