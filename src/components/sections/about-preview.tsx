"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Heart, Brain, Users, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const aboutPoints = [
  { icon: Award, text: "Evidence-Based Treatments", gradient: "from-[#5b7a5e] to-[#4a6a4a]" },
  { icon: Heart, text: "Compassionate Approach", gradient: "from-[#c4956a] to-[#b8855a]" },
  { icon: Brain, text: "Holistic Mental Care", gradient: "from-[#6b8b8b] to-[#5a7a7a]" },
  { icon: Users, text: "Family-Centered Support", gradient: "from-[#9b7b5e] to-[#8a6a4e]" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export const AboutPreview = () => {
  return (
    <section
      className={cn(
        "bg-white rounded-[40px] mx-[30px]",
        "max-sm:mx-0 max-sm:rounded-none"
      )}
    >
      <div
        className={cn(
          "max-w-[1280px] mx-auto",
          "px-[60px] py-[100px]",
          "max-sm:px-6 max-sm:py-[60px]"
        )}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div
              className={cn(
                "relative w-full h-[300px] sm:h-[460px] rounded-[24px] overflow-hidden group"
              )}
              style={{
                boxShadow: "0 16px 48px rgba(91,122,94,0.15), 0 4px 16px rgba(0,0,0,0.06)",
                border: "3px solid rgba(91,122,94,0.08)",
              }}
            >
              <Image
                src="/images/hero/hero-1.jpg"
                alt="Manosuraksha mental health sanctuary"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3d5a40]/25 via-transparent to-transparent" />
            </div>

            {/* Floating accent card */}
            <motion.div
              className={cn(
                "absolute -bottom-5 -right-4 lg:right-6",
                "bg-white/90 backdrop-blur-md rounded-[16px] px-5 py-4",
                "flex items-center gap-3"
              )}
              style={{
                boxShadow: "0 12px 40px rgba(196,149,106,0.18), 0 4px 12px rgba(0,0,0,0.06)",
                border: "1px solid rgba(196,149,106,0.12)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full",
                  "bg-gradient-to-br from-[#c4956a] to-[#d4a574]"
                )}
              >
                <Award className="w-5 h-5 text-white" />
              </div>
              <span className="text-[14px] font-[700] text-[#3d5a40]">
                NIMHANS Trained Team
              </span>
            </motion.div>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Section label */}
            <motion.div variants={itemVariants}>
              <span
                className={cn(
                  "inline-block px-4 py-1.5 rounded-full",
                  "bg-[#5b7a5e]/10 text-[#5b7a5e] text-[13px] font-[700]"
                )}
              >
                Who Are We?
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={itemVariants}
              className={cn(
                "mt-4 text-[36px] lg:text-[42px] font-serif font-bold",
                "text-[#3d5a40] leading-tight"
              )}
            >
              Where the Mind Finds Its Sanctuary
            </motion.h2>

            {/* Paragraphs — exact text from old website */}
            <motion.p
              variants={itemVariants}
              className="mt-5 text-[16px] text-[#7a7470] leading-[1.8]"
            >
              In the realm of mental health, Manosuraksha emerges, echoing the
              ancient resonance of{" "}
              <strong
                className="text-[#c4956a]"
                style={{
                  background: "linear-gradient(135deg, #c4956a, #dbb894)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                &lsquo;Manas&rsquo; — the heartbeat within our minds
              </strong>
              .
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-3 text-[16px] text-[#7a7470] leading-[1.8]"
            >
              We envision a world where understanding one&apos;s mind is a journey,
              a passage to resilience and purpose. Manosuraksha isn&apos;t a service;
              it&apos;s the catalyst for metamorphosis.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-3 text-[16px] text-[#7a7470] leading-[1.8]"
            >
              Rooted in scientific evidence, our expertise isn&apos;t a mere answer;
              it&apos;s the alchemy transforming understanding mental health into a
              profound evolution, beyond symptoms, delving into the essence of
              mental vitality.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-3 text-[16px] text-[#7a7470] leading-[1.8]"
            >
              Manosuraksha isn&apos;t a presence; it&apos;s a kinship, walking beside you
              on the path of self-discovery. We offer not just solutions but the
              tools, the strength, the unwavering support — the arsenal to forge
              your mind&apos;s anthem.
            </motion.p>

            {/* About points 2x2 grid */}
            <motion.div
              variants={itemVariants}
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {aboutPoints.map((point) => (
                <div
                  key={point.text}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3.5 rounded-[14px]",
                    "bg-[#fdf8f2] hover:bg-[#f0e4d8]",
                    "hover:-translate-y-[3px] transition-all duration-300",
                    "cursor-default"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0",
                      `bg-gradient-to-br ${point.gradient}`
                    )}
                  >
                    <point.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[13px] font-[700] text-[#3d5a40]">
                    {point.text}
                  </span>
                </div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Leap of Faith — standalone section */}
      <div
        className={cn(
          "max-w-[1280px] mx-auto",
          "px-[60px] pb-[80px] pt-[20px]",
          "max-sm:px-6 max-sm:pb-[50px]"
        )}
      >
        <motion.div
          className={cn(
            "relative overflow-hidden rounded-[28px]",
            "bg-gradient-to-br from-[#3d5a40] via-[#4a6e4d] to-[#5b7a5e]",
            "px-12 py-14 text-center",
            "max-sm:px-6 max-sm:py-10"
          )}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative circles */}
          <div className="absolute top-[-60px] right-[-60px] w-[200px] h-[200px] rounded-full bg-white/5" />
          <div className="absolute bottom-[-40px] left-[-40px] w-[160px] h-[160px] rounded-full bg-white/5" />
          <div className="absolute top-1/2 left-1/4 w-[80px] h-[80px] rounded-full bg-[#c4956a]/10" />
          <div className="absolute top-[20%] right-[15%] w-[120px] h-[120px] rounded-full bg-[#dbb894]/8" />
          <div className="absolute bottom-[30%] right-[40%] w-[60px] h-[60px] rounded-full bg-white/[0.03]" />

          <p className="relative text-[26px] sm:text-[30px] font-serif font-bold text-white leading-snug max-w-[600px] mx-auto">
            Change often starts with a{" "}
            <span className="text-[#dbb894]">Leap Of Faith!</span>
          </p>
          <p className="relative mt-3 text-[17px] text-white/80 leading-relaxed max-w-[500px] mx-auto">
            What if this is your moment? Together, let us make that leap.
          </p>
          <Link
            href="/about"
            className={cn(
              "relative inline-flex items-center gap-2.5 mt-8",
              "px-7 py-3.5 rounded-full",
              "bg-gradient-to-r from-[#c4956a] to-[#dbb894] text-white",
              "text-[15px] font-[700] shadow-lg",
              "hover:shadow-xl hover:scale-[1.03] active:scale-[0.98]",
              "transition-all duration-300"
            )}
          >
            I Want To Take Action
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
