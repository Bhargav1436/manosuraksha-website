"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { programs } from "@/data/programs";
import { cn } from "@/lib/utils";

const accentColors = [
  { color: "#5b7a5e", gradient: "linear-gradient(135deg, #5b7a5e, #7a9a7d)" },
  { color: "#c4956a", gradient: "linear-gradient(135deg, #c4956a, #dbb894)" },
  { color: "#6b8b8b", gradient: "linear-gradient(135deg, #6b8b8b, #8aabab)" },
  { color: "#9b7b5e", gradient: "linear-gradient(135deg, #9b7b5e, #b89a7e)" },
  { color: "#7a6b8a", gradient: "linear-gradient(135deg, #7a6b8a, #9a8baa)" },
  { color: "#c4956a", gradient: "linear-gradient(135deg, #c4956a, #dbb894)" },
];

export const ProgramsPreview = () => {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-advance every 5 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % programs.length);
    }, 7000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleSelect = (index: number) => {
    setActive(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % programs.length);
    }, 7000);
  };

  const current = programs[active];
  const accent = accentColors[active];

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
            Our Programs
          </span>
          <h2
            className={cn(
              "mt-4 text-[36px] lg:text-[42px] font-serif font-bold",
              "text-[#3d5a40] leading-tight"
            )}
          >
            Specialized Care Programs
          </h2>
          <p className="mt-4 text-[16px] text-[#7a7470] leading-[1.7]">
            At Manosuraksha, our commitment to your mental health goes beyond
            conventional approaches. Our specialized programs are meticulously
            tailored to your personal journey.
          </p>
        </motion.div>

        {/* Apple-style showcase */}
        <motion.div
          className="relative rounded-[32px] overflow-hidden"
          style={{
            backgroundColor: "#1a1a1a",
            minHeight: 520,
            boxShadow: "0 20px 60px rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.1)",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Background image with transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <Image
                src={current.image}
                alt={current.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1280px"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            </motion.div>
          </AnimatePresence>

          {/* Content overlay */}
          <div className="relative z-10 flex flex-col justify-between h-full min-h-[520px] p-10 lg:p-14 max-sm:p-6">
            {/* Top: Counter */}
            <div className="flex items-center gap-3">
              <span
                className="text-[36px] sm:text-[48px] lg:text-[64px] font-[900] leading-none"
                style={{ color: accent.color, opacity: 0.6 }}
              >
                {String(active + 1).padStart(2, "0")}
              </span>
              <span className="text-white/30 text-[20px] font-[300]">
                / {String(programs.length).padStart(2, "0")}
              </span>
            </div>

            {/* Middle: Main content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-[560px]"
              >
                {/* Subtitle chip */}
                <span
                  className="inline-block px-3 py-1 rounded-full text-[11px] font-[700] uppercase tracking-wider text-white mb-4"
                  style={{ backgroundColor: `${accent.color}aa` }}
                >
                  {current.subtitle}
                </span>

                <h3 className="text-[32px] lg:text-[40px] font-serif font-bold text-white leading-tight">
                  {current.title}
                </h3>

                <p className="mt-4 text-[15px] text-white/60 leading-[1.8] max-w-[480px]">
                  {current.description.length > 200
                    ? current.description.slice(0, 200) + "..."
                    : current.description}
                </p>

                <Link
                  href={`/programs/${current.slug}`}
                  className={cn(
                    "inline-flex items-center gap-2.5 mt-6",
                    "px-6 py-3 rounded-full",
                    "text-white text-[14px] font-[700]",
                    "hover:scale-[1.03] active:scale-[0.98]",
                    "transition-all duration-300"
                  )}
                  style={{
                    background: accent.gradient,
                    boxShadow: `0 4px 20px ${accent.color}50`,
                  }}
                >
                  Explore Program
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Bottom: Navigation pills */}
            <div className="flex flex-wrap gap-2 mt-8">
              {programs.map((program, index) => (
                <button
                  key={program.id}
                  onClick={() => handleSelect(index)}
                  className={cn(
                    "px-4 py-2 rounded-full text-[12px] font-[700] transition-all duration-300",
                    active === index
                      ? "text-white scale-105"
                      : "bg-white/10 text-white/50 hover:bg-white/20 hover:text-white/80"
                  )}
                  style={
                    active === index
                      ? { background: accent.gradient, boxShadow: `0 2px 12px ${accent.color}40` }
                      : undefined
                  }
                >
                  {program.title}
                </button>
              ))}
            </div>

            {/* Progress bar */}
            <div className="flex gap-1.5 mt-4">
              {programs.map((_, index) => (
                <div
                  key={index}
                  className="h-[3px] rounded-full flex-1 overflow-hidden"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <motion.div
                    key={`bar-${index}-${active}`}
                    className="h-full rounded-full"
                    style={{ backgroundColor: accent.color }}
                    initial={{ width: index < active ? "100%" : "0%" }}
                    animate={{
                      width: active === index ? "100%" : index < active ? "100%" : "0%",
                    }}
                    transition={{
                      duration: active === index ? 7.3 : 0.4,
                      ease: active === index ? "linear" : [0.4, 0, 0.2, 1],
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
