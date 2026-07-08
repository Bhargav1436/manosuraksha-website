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
              className="topbar-link flex items-center gap-1.5 max-[480px]:hidden"
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
              { href: siteConfig.social.twitter, label: "Twitter" },
              { href: siteConfig.social.instagram, label: "Instagram" },
              { href: siteConfig.social.linkedin, label: "LinkedIn" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="topbar-social"
                style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, fontWeight: 600 }}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
