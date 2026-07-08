"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
  { name: "Kannada", color: "#5b7a5e", bg: "#5b7a5e12", hoverBg: "#5b7a5e" },
  { name: "English", color: "#c4956a", bg: "#c4956a12", hoverBg: "#c4956a" },
  { name: "Hindi", color: "#6b8b8b", bg: "#6b8b8b12", hoverBg: "#6b8b8b" },
  { name: "Tamil", color: "#9b7b5e", bg: "#9b7b5e12", hoverBg: "#9b7b5e" },
  { name: "Malayalam", color: "#5b7a5e", bg: "#5b7a5e12", hoverBg: "#5b7a5e" },
  { name: "Bengali", color: "#c4956a", bg: "#c4956a12", hoverBg: "#c4956a" },
  { name: "Assamese", color: "#6b8b8b", bg: "#6b8b8b12", hoverBg: "#6b8b8b" },
  { name: "Marathi", color: "#9b7b5e", bg: "#9b7b5e12", hoverBg: "#9b7b5e" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
};

const bubbleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export const CTASection = () => {
  return (
    <>
      {/* Companion / Commitment Section */}
      <section
        className={cn(
          "bg-gradient-to-br from-[#3d5a40] via-[#5b7a5e] to-[#6b8b8b] rounded-[40px] mx-[30px] relative overflow-hidden",
          "max-sm:mx-0 max-sm:rounded-none"
        )}
        style={{
          boxShadow: "0 16px 48px rgba(61,90,64,0.2), 0 4px 16px rgba(0,0,0,0.06)",
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-[-80px] right-[-60px] w-[250px] h-[250px] rounded-full bg-white/[0.04]" aria-hidden="true" />
        <div className="absolute bottom-[-60px] left-[-40px] w-[200px] h-[200px] rounded-full bg-[#c4956a]/[0.06]" aria-hidden="true" />
        <div
          className={cn(
            "max-w-[1280px] mx-auto text-center",
            "px-[60px] py-[80px]",
            "max-sm:px-6 max-sm:py-[60px]"
          )}
        >
          <motion.h2
            className="text-[32px] lg:text-[38px] font-serif font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            Ever felt like you&apos;re on the right path but need a companion?
          </motion.h2>

          <motion.p
            className="mt-5 text-[16px] text-white/75 leading-[1.8] max-w-[600px] mx-auto"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <strong className="text-white font-bold">Commit to your journey with Manosuraksha!</strong>{" "}
            Because your story doesn&apos;t end here; it evolves with each step you take and we are right by your side.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8"
          >
            <Link
              href="/book-appointment"
              className={cn(
                "inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full",
                "bg-white text-[#3d5a40] text-[14px] font-[700]",
                "hover:bg-[#dbb894] hover:text-white",
                "shadow-lg hover:shadow-xl",
                "transition-all duration-300"
              )}
            >
              I Want To Commit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Language Section */}
      <section
        className={cn(
          "bg-[#f0e4d8] rounded-[40px] mx-[30px] mt-8",
          "max-sm:mx-0 max-sm:rounded-none"
        )}
        style={{
          boxShadow: "inset 0 2px 20px rgba(196,149,106,0.08)",
          border: "1px solid rgba(196,149,106,0.1)",
        }}
      >
        <div
          className={cn(
            "max-w-[1280px] mx-auto text-center",
            "px-[60px] py-[60px]",
            "max-sm:px-6 max-sm:py-[48px]"
          )}
        >
          <motion.h2
            className="text-[32px] font-serif font-bold text-[#3d5a40] leading-tight"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            Therapy in Your Language
          </motion.h2>

          <motion.p
            className="mt-3 text-[16px] text-[#7a7470]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Sessions available in 8 languages for your comfort
          </motion.p>

          {/* Language bubbles */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {languages.map((lang) => (
              <motion.span
                key={lang.name}
                variants={bubbleVariants}
                className={cn(
                  "inline-block px-5 py-2.5 rounded-full",
                  "text-[14px] font-[700] cursor-default",
                  "hover:-translate-y-[3px]",
                  "transition-all duration-300"
                )}
                style={{
                  backgroundColor: lang.bg,
                  color: lang.color,
                  border: `1.5px solid ${lang.color}20`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = lang.hoverBg;
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.boxShadow = `0 4px 14px ${lang.color}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = lang.bg;
                  e.currentTarget.style.color = lang.color;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {lang.name}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};
