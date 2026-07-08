import Link from "next/link";
import Image from "next/image";
import { Globe, Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/data/site-config";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Who We Are" },
  { href: "/beliefs", label: "What We Believe" },
  { href: "/programs", label: "Our Programs" },
  { href: "/team", label: "Our Team" },
  { href: "/contact", label: "Contact Us" },
];

const programLinks = [
  { href: "/programs/mind-insight", label: "Mind-Insight" },
  { href: "/programs/mind-recover", label: "Mind-Recover" },
  { href: "/programs/mind-shift", label: "Mind-Shift" },
  { href: "/programs/mind-nurture", label: "Mind-Nurture" },
  { href: "/programs/tele-minds", label: "Tele-Minds" },
  { href: "/programs/brain-stimulation", label: "Brain-Stimulation" },
];

const SocialIcons: Record<string, React.ReactNode> = {
  Instagram: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  LinkedIn: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Twitter: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
};

const socialLinks = [
  { href: siteConfig.social.instagram, label: "Instagram" },
  { href: siteConfig.social.linkedin, label: "LinkedIn" },
  { href: siteConfig.social.twitter, label: "Twitter" },
];

export const Footer = () => {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .footer-link {
              font-size: 13px;
              color: rgba(255,255,255,0.5);
              text-decoration: none;
              transition: color 0.2s ease;
            }
            .footer-link:hover {
              color: #dbb894;
            }
            .footer-contact-link {
              display: flex;
              align-items: flex-start;
              gap: 10px;
              font-size: 13px;
              color: rgba(255,255,255,0.5);
              text-decoration: none;
              transition: color 0.2s ease;
            }
            .footer-contact-link:hover {
              color: #dbb894;
            }
            .footer-social-icon {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 34px;
              height: 34px;
              border-radius: 50%;
              border: 1px solid rgba(255,255,255,0.1);
              color: rgba(255,255,255,0.5);
              text-decoration: none;
              transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
            }
            .footer-social-icon:hover {
              background-color: #c4956a;
              border-color: #c4956a;
              color: #ffffff;
            }
            .footer-grid {
              display: grid;
              grid-template-columns: 2fr 1fr 1fr 1fr;
              gap: 40px;
            }
            @media (max-width: 768px) {
              .footer-grid {
                grid-template-columns: 1fr 1fr;
              }
            }
            @media (max-width: 640px) {
              .footer-grid {
                grid-template-columns: 1fr;
              }
              .footer-bottom {
                flex-direction: column;
                gap: 16px;
                align-items: center;
              }
            }
          `,
        }}
      />
      <footer
        style={{
          background: "linear-gradient(135deg, #2d3a2f 0%, #3a3530 40%, #3a3530 60%, #2d3a2f 100%)",
          color: "#ffffff",
          padding: "60px 60px 28px",
          marginTop: "40px",
          position: "relative",
        }}
        className="max-md:!px-8 max-sm:!px-6"
      >
        {/* Decorative top gradient border */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, #5b7a5e, #c4956a, #dbb894, #6b8b8b, #5b7a5e)",
          }}
        />
        {/* Main grid */}
        <div className="footer-grid">
          {/* Col 1: Brand */}
          <div>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <Image
                src="/images/logo-icon-transparent.png"
                alt="Manosuraksha"
                width={396}
                height={327}
                style={{
                  width: "auto",
                  height: "auto",
                  maxHeight: "50px",
                  objectFit: "contain",
                }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#ffffff",
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
            <p
              style={{
                marginTop: "18px",
                fontSize: "13px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.5)",
                maxWidth: "320px",
              }}
            >
              Compassionate mental health care rooted in understanding, empathy,
              and evidence-based practices. We believe in nurturing every mind
              with dignity and warmth.
            </p>
            <Link
              href="/foundation"
              className="footer-link"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "16px",
                fontSize: "13px",
                fontWeight: 700,
                color: "#dbb894",
                textDecoration: "none",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#dbb894" stroke="#dbb894" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              Manosuraksha Mental Health Foundation
            </Link>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "#dbb894",
                marginBottom: "20px",
              }}
            >
              Quick Links
            </h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {quickLinks.map((link) => (
                <li
                  key={link.href + link.label}
                  style={{ marginBottom: "12px" }}
                >
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Programs */}
          <div>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "#dbb894",
                marginBottom: "20px",
              }}
            >
              Programs
            </h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {programLinks.map((link) => (
                <li key={link.label} style={{ marginBottom: "12px" }}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "#dbb894",
                marginBottom: "20px",
              }}
            >
              Contact
            </h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li style={{ marginBottom: "14px" }}>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="footer-contact-link"
                >
                  <Phone
                    style={{
                      width: "14px",
                      height: "14px",
                      marginTop: "2px",
                      flexShrink: 0,
                      color: "#dbb894",
                    }}
                  />
                  <span>{siteConfig.phone}</span>
                </a>
              </li>
              <li style={{ marginBottom: "14px" }}>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="footer-contact-link"
                >
                  <Mail
                    style={{
                      width: "14px",
                      height: "14px",
                      marginTop: "2px",
                      flexShrink: 0,
                      color: "#dbb894",
                    }}
                  />
                  <span>{siteConfig.email}</span>
                </a>
              </li>
              <li style={{ marginBottom: "14px" }}>
                <a
                  href={siteConfig.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-link"
                >
                  <MapPin
                    style={{
                      width: "14px",
                      height: "14px",
                      marginTop: "2px",
                      flexShrink: 0,
                      color: "#dbb894",
                    }}
                  />
                  <span>{siteConfig.address}</span>
                </a>
              </li>
              <li>
                <div className="footer-contact-link">
                  <Globe
                    style={{
                      width: "14px",
                      height: "14px",
                      marginTop: "2px",
                      flexShrink: 0,
                      color: "#dbb894",
                    }}
                  />
                  <div>
                    <span>Mon – Sat: 9 am to 9 pm</span>
                    <br />
                    <span>Sunday: Closed</span>
                    <br />
                    <span style={{ fontSize: "11px", fontStyle: "italic", color: "#dbb894" }}>
                      *prior appointment is highly recommended
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="footer-bottom"
          style={{
            marginTop: "40px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.35)",
              margin: 0,
            }}
          >
            &copy; 2026 Manosuraksha Nurturing Minds. All Rights Reserved.
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="footer-social-icon"
              >
                {SocialIcons[social.label]}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};
