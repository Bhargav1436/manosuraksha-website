"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, BookOpen, MessageSquare, Settings, LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const authPaths = ["/admin/login", "/admin/forgot-password", "/admin/reset-password"];

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Programs", href: "/admin/programs", icon: BookOpen },
  { label: "Comments", href: "/admin/comments", icon: MessageSquare },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

const NavLinks = ({ onClose }: { onClose?: () => void }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[13px] font-[600] transition-all duration-200",
                isActive ? "text-white" : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
              )}
              style={isActive ? { background: "rgba(196,149,106,0.2)", color: "#dbb894" } : undefined}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-white/[0.06]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] w-full text-[13px] font-[600] text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Logout
        </button>
      </div>
    </>
  );
};

const Logo = () => (
  <div className="px-6 py-5 border-b border-white/[0.06]">
    <p className="font-['Libre_Baskerville',serif] text-white text-[15px] font-bold leading-tight">
      Manosuraksha
    </p>
    <p className="text-[11px] mt-0.5" style={{ color: "rgba(219,184,148,0.7)" }}>
      Admin Panel
    </p>
  </div>
);

export const AdminSidebar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (authPaths.some(p => pathname.startsWith(p))) return null;

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="w-[240px] min-h-screen flex-col shrink-0 hidden md:flex"
        style={{ backgroundColor: "#2e4430", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        <Logo />
        <NavLinks />
      </aside>

      {/* Mobile top bar */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3"
        style={{ backgroundColor: "#2e4430", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div>
          <p className="font-['Libre_Baskerville',serif] text-white text-[14px] font-bold leading-tight">
            Manosuraksha
          </p>
          <p className="text-[10px]" style={{ color: "rgba(219,184,148,0.7)" }}>Admin Panel</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-[8px] text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile drawer overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-50 flex"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-[260px] flex flex-col h-full"
            style={{ backgroundColor: "#2e4430" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <div>
                <p className="font-['Libre_Baskerville',serif] text-white text-[15px] font-bold">Manosuraksha</p>
                <p className="text-[11px]" style={{ color: "rgba(219,184,148,0.7)" }}>Admin Panel</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-[8px] text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <NavLinks onClose={() => setOpen(false)} />
          </div>
          {/* Backdrop */}
          <div className="flex-1 bg-black/40" />
        </div>
      )}
    </>
  );
};
