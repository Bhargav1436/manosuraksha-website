"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { beliefs } from "@/data/beliefs";

const tabColors = [
  { accent: "#5b7a5e", gradient: "linear-gradient(135deg, #5b7a5e, #7a9a7d)", bg: "rgba(91,122,94,0.06)" },
  { accent: "#c4956a", gradient: "linear-gradient(135deg, #c4956a, #dbb894)", bg: "rgba(196,149,106,0.06)" },
  { accent: "#6b8b8b", gradient: "linear-gradient(135deg, #6b8b8b, #8aabab)", bg: "rgba(107,139,139,0.06)" },
  { accent: "#9b7b5e", gradient: "linear-gradient(135deg, #9b7b5e, #b89a7e)", bg: "rgba(155,123,94,0.06)" },
  { accent: "#7a6b8a", gradient: "linear-gradient(135deg, #7a6b8a, #9a8baa)", bg: "rgba(122,107,138,0.06)" },
  { accent: "#5b7a5e", gradient: "linear-gradient(135deg, #5b7a5e, #7a9a7d)", bg: "rgba(91,122,94,0.06)" },
];

export const BeliefsTabs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeBelief = beliefs[activeIndex];
  const activeColor = tabColors[activeIndex];

  return (
    <div>
      {/* Tab pills — 3x2 grid on desktop, 2x3 on tablet, stacked on mobile */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
        {beliefs.map((belief, index) => {
          const isActive = index === activeIndex;
          const color = tabColors[index];
          return (
            <button
              key={belief.id}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative flex items-center gap-3 rounded-[16px] text-left",
                "transition-all duration-300 cursor-pointer",
                "hover:scale-[1.02]",
                isActive
                  ? "shadow-lg"
                  : "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md"
              )}
              style={{
                padding: "14px 18px",
                ...(isActive
                  ? { background: color.gradient, color: "#fff" }
                  : {}),
              }}
            >
              {/* Number */}
              <span
                className={cn(
                  "shrink-0 w-[34px] h-[34px] rounded-full flex items-center justify-center text-[13px] font-[800]",
                  isActive
                    ? "bg-white/20 text-white"
                    : "text-white"
                )}
                style={
                  !isActive
                    ? { background: color.gradient }
                    : undefined
                }
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Title */}
              <span
                className={cn(
                  "font-['Nunito_Sans',sans-serif] font-[700] text-[14px] leading-tight",
                  isActive ? "text-white" : "text-[#3a3530]"
                )}
              >
                {belief.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Centered storytelling detail — gradient border card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Outer gradient border wrapper */}
          <div
            className="rounded-[28px] p-[2px]"
            style={{ background: activeColor.gradient }}
          >
            {/* Inner card */}
            <div
              className="relative rounded-[26px] overflow-hidden text-center"
              style={{
                background: `linear-gradient(180deg, ${activeColor.bg.replace("0.06", "0.03")} 0%, #ffffff 40%, #ffffff 100%)`,
                padding: "clamp(28px, 5vw, 48px) clamp(20px, 4vw, 40px) clamp(28px, 5vw, 44px)",
              }}
            >
              {/* Subtle dot pattern background */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage: `radial-gradient(${activeColor.accent} 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Large radial glow behind icon */}
              <div
                className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${activeColor.bg.replace("0.06", "0.2")} 0%, transparent 70%)`,
                }}
              />

              {/* Icon circle */}
              <div className="relative flex justify-center mb-7">
                <div
                  className="w-[64px] h-[64px] sm:w-[84px] sm:h-[84px] rounded-full flex items-center justify-center"
                  style={{
                    background: activeColor.gradient,
                    boxShadow: `0 12px 40px ${activeColor.bg.replace("0.06", "0.35")}`,
                  }}
                >
                  <Image
                    src={activeBelief.image}
                    alt={activeBelief.title}
                    width={40}
                    height={40}
                    className="object-contain brightness-0 invert"
                  />
                </div>
              </div>

              {/* Title */}
              <h3
                className="relative font-['Libre_Baskerville',serif] max-sm:!text-[22px]"
                style={{ fontSize: 30, color: "#3a3530", fontWeight: 700 }}
              >
                {activeBelief.title}
              </h3>

              {/* Subtitle as colored badge */}
              <p
                className="relative mt-3 font-[700] inline-block rounded-full"
                style={{
                  fontSize: 13,
                  color: activeColor.accent,
                  backgroundColor: activeColor.bg,
                  padding: "8px 22px",
                  letterSpacing: 0.3,
                  border: `1px solid ${activeColor.bg.replace("0.06", "0.12")}`,
                }}
              >
                {activeBelief.subtitle}
              </p>

              {/* Decorative ornament: dot — line — diamond — line — dot */}
              <div className="relative flex items-center justify-center gap-2.5 my-8">
                <div
                  className="w-[5px] h-[5px] rounded-full"
                  style={{ backgroundColor: activeColor.accent, opacity: 0.25 }}
                />
                <div
                  className="w-20 h-[1.5px] rounded-full"
                  style={{ background: activeColor.gradient, opacity: 0.2 }}
                />
                <div
                  className="w-[8px] h-[8px] rotate-45"
                  style={{ backgroundColor: activeColor.accent, opacity: 0.2 }}
                />
                <div
                  className="w-20 h-[1.5px] rounded-full"
                  style={{ background: activeColor.gradient, opacity: 0.2 }}
                />
                <div
                  className="w-[5px] h-[5px] rounded-full"
                  style={{ backgroundColor: activeColor.accent, opacity: 0.25 }}
                />
              </div>

              {/* Description */}
              <p
                className="relative font-['Libre_Baskerville',serif] italic mx-auto"
                style={{
                  fontSize: 17,
                  color: "#6a6560",
                  lineHeight: 2.1,
                  maxWidth: 680,
                }}
              >
                {activeBelief.description}
              </p>

              {/* Progress dots */}
              <div className="relative flex items-center justify-center gap-2 mt-10">
                {beliefs.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      "rounded-full transition-all duration-300 cursor-pointer",
                      i === activeIndex
                        ? "w-8 h-2.5"
                        : "w-2.5 h-2.5 opacity-30 hover:opacity-60"
                    )}
                    style={{ backgroundColor: activeColor.accent }}
                    aria-label={`Go to belief ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
