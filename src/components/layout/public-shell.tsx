"use client";

import { usePathname } from "next/navigation";
import { TopBar } from "./top-bar";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { FoundationFab } from "@/components/shared/foundation-fab";

export const PublicShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <TopBar />
      <Navbar />
      <main className="min-h-screen flex-1" style={{ paddingTop: 108 }}>
        {children}
      </main>
      <Footer />
      <FoundationFab />
    </>
  );
};
