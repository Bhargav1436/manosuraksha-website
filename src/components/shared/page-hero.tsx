"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle: string;
  breadcrumb: string | BreadcrumbItem[];
}

export const PageHero = ({ title, subtitle, breadcrumb }: PageHeroProps) => {
  const breadcrumbItems: BreadcrumbItem[] =
    typeof breadcrumb === "string"
      ? [{ label: breadcrumb }]
      : breadcrumb;

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#fdf8f2" }}
    >
      {/* Warm cream background with decorative elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Base warm tint */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #f0e4d4 0%, #fdf8f2 60%, #fdf8f2 100%)",
          }}
        />
        {/* Soft warm glows */}
        <div className="absolute -top-20 right-[10%] w-[500px] h-[500px] rounded-full bg-[#c4956a]/10 blur-[120px]" />
        <div className="absolute -bottom-20 left-[5%] w-[400px] h-[400px] rounded-full bg-[#5b7a5e]/8 blur-[100px]" />
        <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] rounded-full bg-[#dbb894]/10 blur-[80px]" />

        {/* Scrolling small bubbles */}
        {[
          { size: 10, left: "8%", delay: 0, duration: 6, color: "#c4956a" },
          { size: 8, left: "18%", delay: 1.2, duration: 5, color: "#5b7a5e" },
          { size: 12, left: "30%", delay: 2.5, duration: 7, color: "#dbb894" },
          { size: 14, left: "42%", delay: 1.8, duration: 8, color: "#5b7a5e" },
          { size: 9, left: "54%", delay: 3, duration: 6, color: "#dbb894" },
          { size: 11, left: "65%", delay: 0.8, duration: 7, color: "#c4956a" },
          { size: 7, left: "76%", delay: 2.8, duration: 5.5, color: "#5b7a5e" },
          { size: 10, left: "86%", delay: 1.5, duration: 6.5, color: "#dbb894" },
          { size: 8, left: "95%", delay: 4, duration: 5.5, color: "#c4956a" },
          { size: 7, left: "3%", delay: 3, duration: 5, color: "#5b7a5e" },
        ].map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: bubble.left,
              bottom: -10,
              backgroundColor: bubble.color,
            }}
            animate={{
              y: [0, -350],
              x: [0, Math.sin(i) * 25, 0],
              opacity: [0, 0.35, 0.3, 0],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.delay,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Bottom border line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(196,149,106,0.25), transparent)",
          }}
        />
        {/* Soft bottom shadow for depth */}
        <div
          className="absolute -bottom-[1px] left-0 right-0 h-[6px]"
          style={{
            background: "linear-gradient(to bottom, rgba(196,149,106,0.06), transparent)",
          }}
        />
      </div>

      {/* Content */}
      <div
        className={cn(
          "relative z-10 mx-auto text-center",
          "max-sm:!px-6 max-sm:!py-[50px]"
        )}
        style={{ maxWidth: 1280, padding: "120px 60px 80px" }}
      >
        {/* Breadcrumb pill */}
        <motion.nav
          className="mb-6"
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ol
            className="inline-flex items-center gap-2.5 rounded-full"
            style={{
              backgroundColor: "rgba(91,122,94,0.08)",
              padding: "8px 20px",
            }}
          >
            <li>
              <Link
                href="/"
                className="text-[13px] font-[500] text-[#7a7470] hover:text-[#3d5a40] transition-colors"
              >
                Home
              </Link>
            </li>
            {breadcrumbItems.map((item, i) => (
              <li key={i} className="flex items-center gap-2.5">
                <span className="text-[#c4956a]/50 text-xs">/</span>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-[13px] font-[500] text-[#7a7470] hover:text-[#3d5a40] transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-[13px] font-[600] text-[#5b7a5e]">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </motion.nav>

        {/* Title */}
        <motion.h1
          className={cn(
            "font-bold font-['Libre_Baskerville',serif] leading-tight",
            "max-sm:!text-[30px]"
          )}
          style={{ fontSize: 44, color: "#3d5a40" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {title}
        </motion.h1>

        {/* Decorative divider */}
        <motion.div
          className="flex items-center justify-center gap-2 mt-5"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-8 h-[2px] rounded-full bg-[#c4956a]/40" />
          <div className="w-2 h-2 rounded-full bg-[#c4956a]/60" />
          <div className="w-8 h-[2px] rounded-full bg-[#c4956a]/40" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="mt-5 max-w-xl mx-auto text-[17px] leading-relaxed"
          style={{ color: "#7a7470" }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
};
