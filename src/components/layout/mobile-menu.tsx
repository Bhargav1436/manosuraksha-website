"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const navLinks = [
  { href: "/", sectionId: "", label: "Home" },
  { href: "/about", sectionId: "about", label: "Who We Are" },
  { href: "/beliefs", sectionId: "beliefs", label: "What We Believe" },
  { href: "/programs", sectionId: "programs", label: "Programs" },
  { href: "/team", sectionId: "team", label: "Team" },
  { href: "/contact", sectionId: "contact", label: "Contact" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1001,
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
            onClick={onClose}
          />

          {/* Slide-in drawer from right */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "tween",
              duration: 0.35,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              zIndex: 1002,
              height: "100%",
              width: "min(300px, 85vw)",
              backgroundColor: "#fdf8f2",
              boxShadow: "-4px 0 30px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Close button */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "20px 20px 10px",
              }}
            >
              <button
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  border: "none",
                  background: "transparent",
                  color: "#3a3530",
                  cursor: "pointer",
                  borderRadius: "8px",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget).style.backgroundColor = "rgba(196,149,106,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget).style.backgroundColor = "transparent";
                }}
                aria-label="Close menu"
              >
                <X style={{ width: "24px", height: "24px" }} />
              </button>
            </div>

            {/* Nav links */}
            <nav style={{ flex: 1, padding: "10px 24px" }}>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {navLinks.map((link) => {
                  const isHome = pathname === "/";

                  const handleClick = (e: React.MouseEvent) => {
                    if (isHome && link.sectionId) {
                      e.preventDefault();
                      onClose();
                      setTimeout(() => {
                        const el = document.getElementById(link.sectionId);
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 350);
                    } else if (isHome && !link.sectionId) {
                      e.preventDefault();
                      onClose();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                      onClose();
                    }
                  };

                  return (
                  <li key={link.href}>
                    <Link
                      href={isHome && link.sectionId ? `/#${link.sectionId}` : link.href}
                      onClick={handleClick}
                      style={{
                        display: "block",
                        padding: "14px 16px",
                        fontSize: "16px",
                        fontWeight: 600,
                        color:
                          pathname === link.href ? "#5b7a5e" : "#3a3530",
                        textDecoration: "none",
                        borderRadius: "10px",
                        transition: "background 0.2s ease, color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget).style.backgroundColor = "rgba(196,149,106,0.08)";
                        if (pathname !== link.href) {
                          (e.currentTarget).style.color = "#5b7a5e";
                        }
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget).style.backgroundColor = "transparent";
                        if (pathname !== link.href) {
                          (e.currentTarget).style.color = "#3a3530";
                        }
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                  );
                })}
              </ul>
            </nav>

            {/* Book Appointment CTA */}
            <div style={{ padding: "20px 24px 30px" }}>
              <Link
                href="/book-appointment"
                onClick={onClose}
                style={{
                  display: "block",
                  textAlign: "center",
                  background: "linear-gradient(135deg, #c4956a, #dbb894)",
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: 700,
                  borderRadius: "50px",
                  padding: "14px 28px",
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
