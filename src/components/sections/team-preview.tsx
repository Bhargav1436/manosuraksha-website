"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { clinicalTeam } from "@/data/team";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const cardAccents = [
  { gradient: "linear-gradient(135deg, #5b7a5e, #7a9a7d)", light: "#5b7a5e10" },
  { gradient: "linear-gradient(135deg, #c4956a, #dbb894)", light: "#c4956a10" },
  { gradient: "linear-gradient(135deg, #6b8b8b, #8aabab)", light: "#6b8b8b10" },
];

export const TeamPreview = () => {
  const previewMembers = clinicalTeam.slice(0, 3);

  return (
    <section className="bg-[#fdf8f2]">
      <div
        className={cn(
          "max-w-[1280px] mx-auto",
          "px-[60px] py-[100px]",
          "max-sm:px-6 max-sm:py-[60px]"
        )}
      >
        {/* Centered header */}
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
              "bg-[#5b7a5e]/10 text-[#5b7a5e] text-[13px] font-[700]"
            )}
          >
            Our Team
          </span>
          <h2
            className={cn(
              "mt-4 text-[36px] lg:text-[42px] font-serif font-bold",
              "text-[#3d5a40] leading-tight"
            )}
          >
            Meet Our Experts
          </h2>
          <p className="mt-4 text-[16px] text-[#7a7470] leading-[1.7] max-w-3xl mx-auto">
            At Manosuraksha, our experts are not just practitioners; they are
            architects of mental well-being, sculpted by training from premier
            global institutes. Our multidisciplinary team, spanning psychiatry,
            addiction medicine, clinical psychology, psychiatric social work,
            nursing, and yoga, forms a powerhouse of unparalleled expertise.
          </p>
        </motion.div>

        {/* 4-column grid */}
        <motion.div
          className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {previewMembers.map((member, index) => {
            const accent = cardAccents[index % cardAccents.length];
            const isFeatured = index === 0;
            return (
              <motion.div
                key={member.id}
                variants={cardVariants}
                whileHover={{
                  y: isFeatured ? -10 : -8,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className={cn("group", isFeatured && "lg:scale-[1.04] lg:z-10 relative")}
              >
                {/* Outer glow ring for featured */}
                {isFeatured && (
                  <div
                    className="absolute -inset-[3px] rounded-[23px] pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, #c4956a, #dbb894, #c4956a)",
                      opacity: 0.6,
                    }}
                  />
                )}

                <div
                  className={cn(
                    "rounded-[20px] overflow-hidden h-full relative",
                    isFeatured
                      ? "shadow-[0_16px_48px_rgba(196,149,106,0.3)] group-hover:shadow-[0_28px_72px_rgba(196,149,106,0.45)]"
                      : "bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]",
                    "transition-all duration-500"
                  )}
                  style={{
                    background: isFeatured
                      ? "linear-gradient(180deg, #fff9f4 0%, #ffffff 60%)"
                      : undefined,
                    border: isFeatured
                      ? "none"
                      : "1px solid rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Featured badge */}
                  {isFeatured && (
                    <div
                      className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-full text-[10px] font-[800] tracking-widest uppercase text-white"
                      style={{
                        background: "linear-gradient(135deg, #c4956a, #dbb894)",
                        boxShadow: "0 3px 12px rgba(196,149,106,0.5)",
                      }}
                    >
                      Director &amp; Founder
                    </div>
                  )}

                  {/* Photo */}
                  <div className={cn("relative w-full overflow-hidden", isFeatured ? "h-[320px]" : "h-[280px]")}>
                    <Image
                      src={member.imageSrc}
                      alt={member.name}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: isFeatured
                          ? "linear-gradient(to top, rgba(61,90,64,0.55) 0%, transparent 55%)"
                          : "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)",
                      }}
                    />
                    {/* Institution label on photo for featured */}
                    {isFeatured && (
                      <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                        <span
                          className="px-3 py-1 rounded-full text-[10px] font-[700] text-white/90 backdrop-blur-sm"
                          style={{ background: "rgba(61,90,64,0.6)" }}
                        >
                          NIMHANS · Columbia · Harvard
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className={cn("text-center", isFeatured ? "p-6" : "p-5")}>
                    <h3
                      className={cn(
                        "font-sans font-[800]",
                        isFeatured ? "text-[17px] text-[#3d5a40]" : "text-[16px] text-[#3a3530]"
                      )}
                    >
                      {member.name}
                    </h3>
                    <p
                      className={cn(
                        "mt-1 font-[700] leading-snug",
                        isFeatured ? "text-[12px] text-[#c4956a]" : "text-[12px] text-[#c4956a]"
                      )}
                    >
                      {member.role}
                    </p>
                    <p className="mt-2 text-[11px] text-[#7a7470] leading-snug">
                      {member.qualification}
                    </p>

                    {/* Languages */}
                    <div className="mt-3 flex flex-wrap items-center justify-center gap-1">
                      {member.languages.map((lang) => (
                        <span
                          key={lang}
                          className="rounded-md px-2 py-0.5 text-[10px] font-[500] text-[#7a7470]"
                          style={{
                            backgroundColor: isFeatured ? "rgba(196,149,106,0.1)" : accent.light,
                          }}
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Colored bottom accent */}
                  <div
                    className={cn("absolute bottom-0 left-0 right-0", isFeatured ? "h-[4px]" : "h-[3px]")}
                    style={{
                      background: isFeatured
                        ? "linear-gradient(90deg, #c4956a, #dbb894, #c4956a)"
                        : accent.gradient,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Meet the Full Team button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/team"
            className={cn(
              "inline-flex items-center gap-2 px-8 py-3.5 rounded-full",
              "bg-[#5b7a5e] text-white text-[14px] font-[700]",
              "hover:bg-[#4a6a4d] transition-colors duration-300",
              "shadow-[0_4px_16px_rgba(91,122,94,0.3)]"
            )}
          >
            Meet the Full Team
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};
