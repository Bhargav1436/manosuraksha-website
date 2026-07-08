"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site-config";
import { ContactForm } from "@/components/sections/contact-form";
import { cn } from "@/lib/utils";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    detail: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
    color: "#5b7a5e",
    bg: "#5b7a5e15",
  },
  {
    icon: Mail,
    title: "Email",
    detail: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    color: "#c4956a",
    bg: "#c4956a15",
  },
  {
    icon: MapPin,
    title: "Address",
    detail: siteConfig.address,
    href: siteConfig.mapUrl,
    external: true,
    color: "#6b8b8b",
    bg: "#6b8b8b15",
  },
  {
    icon: Clock,
    title: "Working Hours",
    detail: "Mon - Sat: 9:00 AM - 9:00 PM",
    subDetail: "Sunday: Closed",
    color: "#9b7b5e",
    bg: "#9b7b5e15",
  },
];

export const ContactPreview = () => {
  return (
    <section className="bg-[#fdf8f2]">
      <div
        className={cn(
          "max-w-[1280px] mx-auto",
          "px-[60px] py-[100px]",
          "max-sm:px-6 max-sm:py-[60px]"
        )}
      >
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span
            className={cn(
              "inline-block px-4 py-1.5 rounded-full",
              "bg-[#c4956a]/10 text-[#c4956a] text-[13px] font-[700]"
            )}
          >
            Connect With Us
          </span>
          <h2
            className={cn(
              "mt-4 text-[36px] lg:text-[42px] font-serif font-bold",
              "text-[#3d5a40] leading-tight"
            )}
          >
            Book Your Appointment
          </h2>
          <p className="mt-4 text-[16px] text-[#7a7470] leading-[1.7]">
            We want you to know that it&apos;s OKAY to feel the way you do.
            You&apos;re not alone in this, and you&apos;ve come to the right place.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="mb-8"
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

            <div className="space-y-4">
              {contactInfo.map((item) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 p-4 rounded-[16px] transition-all duration-300 hover:-translate-y-[2px]"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.7)",
                      border: `1px solid ${item.color}12`,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 8px 24px ${item.color}15`;
                      e.currentTarget.style.borderColor = `${item.color}25`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.02)";
                      e.currentTarget.style.borderColor = `${item.color}12`;
                    }}
                  >
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
                          rel={item.external ? "noopener noreferrer" : undefined}
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
                          <p style={{ fontSize: 14, color: "#7a7470", lineHeight: 1.6 }}>
                            {item.detail}
                          </p>
                          {item.subDetail && (
                            <p style={{ fontSize: 13, color: "#7a7470", marginTop: 2 }}>
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
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
