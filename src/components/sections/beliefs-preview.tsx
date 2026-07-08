"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { beliefs } from "@/data/beliefs";
import { cn } from "@/lib/utils";

const accentColors = [
  { color: "#5b7a5e", gradient: "linear-gradient(135deg, #5b7a5e, #4a6a4a)" },
  { color: "#c4956a", gradient: "linear-gradient(135deg, #c4956a, #b8855a)" },
  { color: "#6b8b8b", gradient: "linear-gradient(135deg, #6b8b8b, #5a7a7a)" },
  { color: "#9b7b5e", gradient: "linear-gradient(135deg, #9b7b5e, #8a6a4e)" },
  { color: "#7a6b8a", gradient: "linear-gradient(135deg, #7a6b8a, #6a5b7a)" },
  { color: "#5b7a5e", gradient: "linear-gradient(135deg, #5b7a5e, #4a6a4a)" },
];

export const BeliefsPreview = () => {
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
          className="text-center max-w-2xl mx-auto mb-16"
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
            Six Pillars of Our Practice
          </span>
          <h2
            className={cn(
              "mt-4 text-[36px] lg:text-[42px] font-serif font-bold",
              "text-[#3d5a40] leading-tight"
            )}
          >
            What We Believe
          </h2>
          <p className="mt-4 text-[16px] text-[#7a7470] leading-[1.7]">
            Our beliefs shape how we approach mental health care — with empathy,
            advocacy, and an unwavering commitment to your well-being.
          </p>
        </motion.div>

        {/* Magazine editorial blocks */}
        <div className="space-y-16">
          {beliefs.map((belief, index) => {
            const accent = accentColors[index];
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={belief.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
              >
                {/* Top row: image + title */}
                <div
                  className={cn(
                    "grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 items-end",
                    !isEven && "lg:grid-cols-[1fr_280px]"
                  )}
                >
                  {/* Icon block */}
                  <div className={cn(!isEven && "lg:order-2")}>
                    <div
                      className="relative rounded-[24px] overflow-hidden flex items-center justify-center transition-shadow duration-500 max-sm:!h-[160px]"
                      style={{
                        height: 220,
                        background: accent.gradient,
                        boxShadow: `0 8px 32px ${accent.color}25`,
                      }}
                    >
                      {/* Large watermark number */}
                      <span
                        className="absolute font-[900] leading-none select-none text-white/10"
                        style={{
                          fontSize: 180,
                          bottom: -30,
                          right: isEven ? -10 : undefined,
                          left: isEven ? undefined : -10,
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={belief.image}
                          alt={belief.title}
                          width={80}
                          height={80}
                          className="object-contain brightness-0 invert relative z-10"
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Title block */}
                  <div className={cn(!isEven && "lg:order-1")}>
                    {/* Number label */}
                    <span
                      className="inline-block text-[13px] font-[800] tracking-[3px] uppercase mb-3"
                      style={{ color: accent.color }}
                    >
                      Pillar {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3
                      className="text-[28px] lg:text-[32px] font-serif font-bold text-[#3a3530] leading-tight"
                    >
                      {belief.title}
                    </h3>

                    {/* Decorative line */}
                    <div
                      className="h-[3px] rounded-full mt-4"
                      style={{
                        width: 60,
                        background: accent.gradient,
                      }}
                    />

                    <p
                      className="mt-4 text-[15px] font-[600] leading-relaxed"
                      style={{ color: accent.color }}
                    >
                      {belief.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description — full width below */}
                <div className="mt-6 lg:mt-8">
                  <p className="text-[16px] text-[#7a7470] leading-[1.9] max-w-[800px]">
                    {belief.description}
                  </p>
                </div>

                {/* Separator line */}
                {index < beliefs.length - 1 && (
                  <div
                    className="mt-16 h-px"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(196,149,106,0.2), transparent)",
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Motivational quote */}
        <motion.div
          className="text-center mt-16 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-[22px] sm:text-[26px] text-[#c4956a] font-[600] italic leading-relaxed font-serif">
            &ldquo;Think back to a time when you felt the pure joy of being &apos;YOU.&apos;
            You can feel that way again.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
};
