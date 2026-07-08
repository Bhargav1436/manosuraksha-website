"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf, Calendar, ArrowRight, Users, Globe, Video } from "lucide-react";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

const trustItems = [
  { icon: Users, label: "12+ Experts", color: "#5b7a5e" },
  { icon: Globe, label: "8 Languages", color: "#c4956a" },
  { icon: Video, label: "Teletherapy", color: "#6b8b8b" },
];

export const GallerySection = () => {
  return (
    <section className="relative overflow-hidden bg-[#fdf8f2]">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-[#5b7a5e] opacity-[0.06] blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#c4956a] opacity-[0.06] blur-3xl" />
      </div>

      <div
        className={cn(
          "relative z-10 max-w-[1280px] mx-auto",
          "px-[60px] py-[100px]",
          "max-sm:px-6 max-sm:py-[60px]"
        )}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={itemVariants}>
              <span
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full",
                  "bg-white text-[#5b7a5e] text-sm font-[700] shadow-md"
                )}
              >
                <Leaf className="w-4 h-4" />
                Mental Health &amp; Wellness
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className={cn(
                "mt-6 font-serif font-bold leading-tight tracking-tight",
                "text-[44px] text-[#3d5a40]",
                "max-sm:text-[32px]"
              )}
            >
              Nurturing Minds,{" "}
              <br className="hidden sm:block" />
              Restoring{" "}
              <span className="bg-gradient-to-r from-[#c4956a] to-[#d4a574] bg-clip-text text-transparent">
                Balance
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-5 text-[17px] text-[#7a7470] leading-[1.9] max-w-[480px]"
            >
              A compassionate space where science meets empathy — our
              NIMHANS-trained team offers holistic psychiatric care, therapy,
              and wellness programs for individuals and families across
              Bengaluru and beyond.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex items-center gap-5 flex-wrap"
            >
              <Link
                href="/book-appointment"
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-full",
                  "bg-gradient-to-r from-[#5b7a5e] to-[#4a6a4a] text-white",
                  "text-[14px] font-[700] shadow-lg",
                  "hover:shadow-xl hover:scale-[1.03] active:scale-[0.98]",
                  "transition-all duration-300"
                )}
              >
                <Calendar className="w-4 h-4" />
                Book a Session
              </Link>

              <Link
                href="/programs"
                className="inline-flex items-center gap-3 group"
              >
                <span
                  className={cn(
                    "flex items-center justify-center w-[44px] h-[44px] rounded-full",
                    "border-2 border-[#5b7a5e] text-[#5b7a5e]",
                    "group-hover:bg-[#5b7a5e] group-hover:text-white",
                    "transition-all duration-300"
                  )}
                >
                  <ArrowRight className="w-4 h-4" />
                </span>
                <span className="text-[14px] font-[700] text-[#5b7a5e]">
                  Explore Programs
                </span>
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex items-center gap-6 flex-wrap"
            >
              {trustItems.map((item) => (
                <div key={item.label} className="flex items-center gap-2.5">
                  <div
                    className={cn(
                      "flex items-center justify-center w-[40px] h-[40px] rounded-full",
                      "bg-white shadow-sm"
                    )}
                  >
                    <item.icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>
                  <span className="text-[13px] text-[#7a7470] font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — 4-image floating collage */}
          <motion.div
            className="relative hidden sm:block"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Position 1 */}
              <motion.div
                className="relative rounded-[20px] overflow-hidden group h-[240px]"
                style={{
                  boxShadow: "0 8px 32px rgba(91,122,94,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                  border: "2px solid rgba(91,122,94,0.08)",
                }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <Image
                  src="/images/hero/hero-1.jpg"
                  alt="Mental wellness and mindfulness"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5b7a5e]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>

              {/* Position 2 */}
              <motion.div
                className="relative rounded-[20px] overflow-hidden group h-[280px] mt-[40px]"
                style={{
                  boxShadow: "0 8px 32px rgba(196,149,106,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                  border: "2px solid rgba(196,149,106,0.08)",
                }}
                animate={{ y: [0, 10, 0] }}
                transition={{
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <Image
                  src="/images/hero/hero-2.jpg"
                  alt="Meditation and mindfulness"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#c4956a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>

              {/* Position 3 */}
              <motion.div
                className="relative rounded-[20px] overflow-hidden group h-[280px] -mt-[40px]"
                style={{
                  boxShadow: "0 8px 32px rgba(107,139,139,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                  border: "2px solid rgba(107,139,139,0.08)",
                }}
                animate={{ y: [0, 8, 0] }}
                transition={{
                  y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <Image
                  src="/images/about/slide1.png"
                  alt="Brain stimulation therapy at Manosuraksha"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#6b8b8b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>

              {/* Position 4 */}
              <motion.div
                className="relative rounded-[20px] overflow-hidden group h-[240px]"
                style={{
                  boxShadow: "0 8px 32px rgba(155,123,94,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                  border: "2px solid rgba(155,123,94,0.08)",
                }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <Image
                  src="/images/about/inclusive.jpg"
                  alt="Inclusive mental healthcare"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#9b7b5e]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </div>

            {/* Floating badge */}
            <motion.div
              className={cn(
                "absolute -bottom-4 left-1/2 -translate-x-1/2",
                "bg-white/90 backdrop-blur-md rounded-[16px] px-5 py-3.5",
                "flex items-center gap-3"
              )}
              style={{
                boxShadow: "0 8px 32px rgba(91,122,94,0.15), 0 2px 12px rgba(0,0,0,0.06)",
                border: "1px solid rgba(91,122,94,0.1)",
              }}
              animate={floatAnimation}
            >
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#5b7a5e] border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-[#c4956a] border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-[#5b7a5e] border-2 border-white" />
              </div>
              <div>
                <p className="text-[13px] font-[700] text-[#3d5a40]">
                  Trusted by Families
                </p>
                <p className="text-[11px] text-[#7a7470]">
                  across Bengaluru &amp; beyond
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
