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
            return (
              <motion.div
                key={member.id}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="group"
              >
                <div
                  className={cn(
                    "bg-white rounded-[20px] overflow-hidden h-full relative",
                    "shadow-[0_4px_16px_rgba(0,0,0,0.04)]",
                    "group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]",
                    "transition-all duration-500"
                  )}
                  style={{
                    border: "1px solid rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Photo */}
                  <div className="relative w-full h-[280px] overflow-hidden">
                    <Image
                      src={member.imageSrc}
                      alt={member.name}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>

                  {/* Details */}
                  <div className="p-5 text-center">
                    <h3 className="text-[16px] font-sans font-[800] text-[#3a3530]">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-[12px] font-[700] text-[#c4956a] leading-snug">
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
                          style={{ backgroundColor: accent.light }}
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Colored bottom accent */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[3px]"
                    style={{ background: accent.gradient }}
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
