import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site-config";
import { ContactForm } from "@/components/sections/contact-form";
import { MotionWrapper } from "@/components/shared/motion-wrapper";
import { PageHero } from "@/components/shared/page-hero";
import { PageTransition } from "@/components/shared/page-transition";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Manosuraksha. Book an appointment, ask questions, or learn more about our mental health services in Jayanagar, Bengaluru.",
};

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    detail: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
    color: "#5b7a5e",
    bg: "#5b7a5e12",
  },
  {
    icon: Mail,
    title: "Email",
    detail: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    color: "#c4956a",
    bg: "#c4956a12",
  },
  {
    icon: MapPin,
    title: "Address",
    detail: siteConfig.address,
    href: siteConfig.mapUrl,
    external: true,
    color: "#6b8b8b",
    bg: "#6b8b8b12",
  },
  {
    icon: Clock,
    title: "Working Hours",
    detail: "Mon - Sat: 9:00 AM - 9:00 PM",
    subDetail: "Sunday: Closed",
    color: "#9b7b5e",
    bg: "#9b7b5e12",
  },
];

export default function ContactPage() {
  return (
    <PageTransition>
      <PageHero
        title="Connect With Us"
        subtitle="We want you to know that it's OKAY to feel the way you do. You're not alone in this, and you've come to the right place. Reach out to us because you deserve the best."
        breadcrumb="Contact Us"
      />

      {/* Contact Section - White rounded card */}
      <section
        style={{ backgroundColor: "#fdf8f2" }}
        className="px-4 py-[50px] sm:px-[60px] sm:py-[100px]"
      >
        <div
          className={cn("bg-white rounded-[24px] sm:rounded-[40px] mx-0 sm:mx-[30px] max-lg:mx-0")}
          style={{ padding: "clamp(24px, 5vw, 60px) clamp(16px, 4vw, 48px)" }}
        >
          <div className="mx-auto" style={{ maxWidth: 1280 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left: Contact Info */}
              <MotionWrapper variant="fadeInLeft">
                <div>
                  <span
                    className="inline-flex items-center rounded-full"
                    style={{
                      backgroundColor: "rgba(91,122,94,0.08)",
                      color: "#5b7a5e",
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      padding: "6px 16px",
                    }}
                  >
                    Contact Information
                  </span>
                  <h2
                    className="font-['Libre_Baskerville',serif] mt-4 max-sm:!text-[28px]"
                    style={{ fontSize: 40, color: "#3d5a40" }}
                  >
                    Book Your Appointment
                  </h2>
                  <p
                    className="mt-4"
                    style={{
                      fontSize: 16,
                      color: "#7a7470",
                      lineHeight: 1.8,
                      maxWidth: 560,
                    }}
                  >
                    Your privacy is our priority. Upon receiving your details, we will
                    reach back to you very soon to book an appointment and coordinate
                    your journey through recovery.
                  </p>

                  {/* Contact Boxes */}
                  <div className="mt-8 space-y-5">
                    {contactInfo.map((item) => {
                      const IconComp = item.icon;
                      return (
                        <div key={item.title} className="flex items-start gap-4">
                          {/* Icon */}
                          <div
                            className="flex-shrink-0 flex items-center justify-center"
                            style={{
                              width: 44,
                              height: 44,
                              backgroundColor: item.bg,
                              borderRadius: 14,
                            }}
                          >
                            <IconComp
                              className="h-5 w-5"
                              style={{ color: item.color }}
                            />
                          </div>
                          {/* Text */}
                          <div>
                            <h4
                              className="font-['Nunito_Sans',sans-serif]"
                              style={{
                                fontWeight: 800,
                                fontSize: 15,
                                color: "#3a3530",
                              }}
                            >
                              {item.title}
                            </h4>
                            {item.href ? (
                              <a
                                href={item.href}
                                target={item.external ? "_blank" : undefined}
                                rel={
                                  item.external
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                                className="hover:underline"
                                style={{
                                  fontSize: 14,
                                  color: "#7a7470",
                                  lineHeight: 1.6,
                                }}
                              >
                                {item.detail}
                              </a>
                            ) : (
                              <>
                                <p
                                  style={{
                                    fontSize: 14,
                                    color: "#7a7470",
                                    lineHeight: 1.6,
                                  }}
                                >
                                  {item.detail}
                                </p>
                                {item.subDetail && (
                                  <p
                                    style={{
                                      fontSize: 13,
                                      color: "#7a7470",
                                      marginTop: 2,
                                    }}
                                  >
                                    {item.subDetail}
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </MotionWrapper>

              {/* Right: Form */}
              <MotionWrapper variant="fadeInRight" delay={0.1}>
                <ContactForm />
              </MotionWrapper>
            </div>
          </div>
        </div>
      </section>

      {/* Healing CTA */}
      <section
        style={{ backgroundColor: "#fdf8f2" }}
        className="px-4 pb-[40px] sm:px-[60px] sm:pb-[60px]"
      >
        <div
          className="mx-auto rounded-[24px] sm:rounded-[40px] text-center"
          style={{
            maxWidth: 1280,
            background: "linear-gradient(135deg, #3d5a40 0%, #5b7a5e 40%, #6b8b8b 80%, #5a7a7a 100%)",
            padding: "clamp(32px, 5vw, 60px) clamp(20px, 4vw, 48px)",
          }}
        >
          <MotionWrapper variant="fadeInUp">
            <p
              className="font-['Libre_Baskerville',serif] text-white leading-relaxed"
              style={{ fontSize: 24, maxWidth: 640, margin: "0 auto" }}
            >
              Healing isn&apos;t just a process; it&apos;s a story! We are the pioneering
              experts of mental health who will guide you to craft your story of triumph.
            </p>
            <Link
              href="/book-appointment"
              className="inline-flex items-center justify-center text-[#3d5a40] rounded-full mt-8"
              style={{
                background: "#ffffff",
                fontSize: 14,
                fontWeight: 700,
                padding: "14px 32px",
                transition: "all 0.3s ease",
              }}
            >
              I Want To Heal
            </Link>
          </MotionWrapper>
        </div>
      </section>

      {/* Map Section */}
      <section
        style={{ backgroundColor: "#fdf8f2" }}
        className="px-4 pb-[50px] sm:px-[60px] sm:pb-[100px]"
      >
        <div className="mx-auto" style={{ maxWidth: 1280 }}>
          <div className="text-center mb-10">
            <h2
              className="font-['Libre_Baskerville',serif] max-sm:!text-[28px]"
              style={{ fontSize: 40, color: "#3d5a40" }}
            >
              Find Us Here
            </h2>
          </div>
          <div
            className="rounded-[24px] overflow-hidden"
            style={{
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
              border: "1px solid rgba(91,122,94,0.12)",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5!2d77.58!3d12.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sManosuraksha%2C+Jayanagar%2C+Bengaluru!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Manosuraksha Location - Jayanagar, Bengaluru"
              className="w-full sm:!h-[450px]"
            />
          </div>
          <p className="text-center mt-4">
            <a
              href={siteConfig.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#5b7a5e",
                fontWeight: 600,
                fontSize: 14,
              }}
              className="hover:underline underline-offset-4"
            >
              Open in Google Maps
            </a>
          </p>
        </div>
      </section>
    </PageTransition>
  );
}
