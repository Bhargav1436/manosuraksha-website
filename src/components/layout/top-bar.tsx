import { Phone, Mail } from "lucide-react";
import { siteConfig } from "@/data/site-config";

export const TopBar = () => {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .topbar-link { transition: color 0.2s ease; }
            .topbar-link:hover { color: #dbb894 !important; }
            .topbar-social { transition: color 0.2s ease; }
            .topbar-social:hover { color: #c4956a !important; }
          `,
        }}
      />
      <div
        style={{
          backgroundColor: "#3a3530",
          padding: "8px 60px",
          fontSize: 13,
          color: "rgba(255,255,255,0.8)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1001,
        }}
        className="max-sm:!px-4"
      >
        <div
          className="flex items-center justify-between max-w-[1280px] mx-auto flex-wrap gap-2"
        >
          {/* Left: Contact */}
          <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
            <a
              href={`mailto:${siteConfig.email}`}
              className="topbar-link flex items-center gap-1.5"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              <Mail style={{ width: 13, height: 13, color: "#c4956a" }} />
              <span>{siteConfig.email}</span>
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="topbar-link flex items-center gap-1.5"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              <Phone style={{ width: 13, height: 13, color: "#7a9a7d" }} />
              <span>{siteConfig.phone}</span>
            </a>
          </div>

          {/* Right: Social */}
          <div className="flex items-center gap-3 max-[480px]:hidden">
            {[
              { href: siteConfig.social.twitter, label: "Twitter", icon: (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              )},
              { href: siteConfig.social.instagram, label: "Instagram", icon: (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              )},
              { href: siteConfig.social.linkedin, label: "LinkedIn", icon: (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              )},
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="topbar-social"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
