"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { MobileMenu } from "@/components/layout/mobile-menu";

const navLinks = [
  { href: "/", sectionId: "", label: "Home" },
  { href: "/about", sectionId: "about", label: "Who We Are" },
  { href: "/beliefs", sectionId: "beliefs", label: "What We Believe" },
  { href: "/programs", sectionId: "programs", label: "Programs" },
  { href: "/team", sectionId: "team", label: "Team" },
  { href: "/contact", sectionId: "contact", label: "Contact" },
];

const sectionIds = ["about", "beliefs", "programs", "team", "contact"];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (pathname !== "/") return;

      // Detect which section is in view
      const scrollY = window.scrollY + 150;
      let found = "";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollY >= top && scrollY < bottom) {
            found = id;
            break;
          }
        }
      }

      setActiveSection(found);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .nav-link-item { transition: color 0.3s ease; }
            .nav-link-item:hover { color: #3d5a40 !important; }
          `,
        }}
      />
      <header
        style={{
          position: "fixed",
          top: 34,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: isScrolled
            ? "rgba(253,248,242,0.97)"
            : "rgba(253,248,242,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          transition: "all 0.4s ease",
          boxShadow: isScrolled
            ? "0 4px 30px rgba(58,53,48,0.08)"
            : "none",
          borderBottom: isScrolled
            ? "1px solid rgba(91,122,94,0.08)"
            : "1px solid transparent",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 60px",
          }}
          className="max-lg:!px-6 max-sm:!py-[14px]"
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <Image
              src="/images/logo-icon.png"
              alt="Manosuraksha"
              width={396}
              height={327}
              className="max-sm:!max-h-[36px]"
              style={{
                width: "auto",
                height: "auto",
                maxHeight: "50px",
                objectFit: "contain",
              }}
              priority
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#3d5a40",
                  lineHeight: 1.2,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Manosuraksha
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#c4956a",
                  textTransform: "uppercase",
                  letterSpacing: "2.5px",
                  lineHeight: 1.2,
                }}
              >
                Nurturing Minds
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:block">
            <ul
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {navLinks.map((link) => {
                const isHome = pathname === "/";
                const isLinkActive = isHome
                  ? (link.sectionId === "" && !activeSection) || link.sectionId === activeSection
                  : pathname === link.href;

                const handleClick = (e: React.MouseEvent) => {
                  if (isHome && link.sectionId) {
                    e.preventDefault();
                    const el = document.getElementById(link.sectionId);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  } else if (isHome && !link.sectionId) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                };

                return (
                  <li key={link.href} style={{ position: "relative" }}>
                    <Link
                      href={isHome && link.sectionId ? `/#${link.sectionId}` : link.href}
                      onClick={handleClick}
                      className="nav-link-item"
                      style={{
                        fontSize: "14px",
                        fontWeight: isLinkActive ? 700 : 600,
                        color: isLinkActive ? "#5b7a5e" : "#7a7470",
                        textDecoration: "none",
                        cursor: "pointer",
                        paddingBottom: "6px",
                      }}
                    >
                      {link.label}
                    </Link>
                    {/* Active indicator bar */}
                    <span
                      style={{
                        position: "absolute",
                        bottom: -4,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: isLinkActive ? "100%" : "0%",
                        height: 2,
                        borderRadius: 1,
                        background: "linear-gradient(90deg, #c4956a, #dbb894)",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right side: CTA + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link
              href="/book-appointment"
              className="hidden lg:inline-block"
              style={{
                background: "linear-gradient(135deg, #c4956a, #dbb894)",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 700,
                borderRadius: "50px",
                padding: "11px 28px",
                textDecoration: "none",
                boxShadow: "0 4px 15px rgba(196,149,106,0.3)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 6px 20px rgba(196,149,106,0.45)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 4px 15px rgba(196,149,106,0.3)";
              }}
            >
              Book Appointment
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden flex items-center justify-center"
              style={{
                width: "40px",
                height: "40px",
                border: "none",
                background: "transparent",
                color: "#3d5a40",
                cursor: "pointer",
                borderRadius: "8px",
              }}
              aria-label="Open menu"
            >
              <Menu style={{ width: "24px", height: "24px" }} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};
