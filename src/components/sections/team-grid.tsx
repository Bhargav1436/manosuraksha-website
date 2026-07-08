"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { type TeamMember } from "@/types";

const roleColors: Record<string, { accent: string; gradient: string }> = {
  Psychiatry: { accent: "#5b7a5e", gradient: "linear-gradient(135deg, #5b7a5e, #7a9a7d)" },
  Psychology: { accent: "#c4956a", gradient: "linear-gradient(135deg, #c4956a, #dbb894)" },
  Psychotherapy: { accent: "#6b8b8b", gradient: "linear-gradient(135deg, #6b8b8b, #8aabab)" },
  Yoga: { accent: "#9b7b5e", gradient: "linear-gradient(135deg, #9b7b5e, #b89a7e)" },
  default: { accent: "#7a6b8a", gradient: "linear-gradient(135deg, #7a6b8a, #9a8baa)" },
};

const getColor = (role: string) => {
  if (role.toLowerCase().includes("psychiatr")) return roleColors.Psychiatry;
  if (role.toLowerCase().includes("psycholog")) return roleColors.Psychology;
  if (role.toLowerCase().includes("psychotherap")) return roleColors.Psychotherapy;
  if (role.toLowerCase().includes("yoga")) return roleColors.Yoga;
  return roleColors.default;
};

interface TeamGridProps {
  members: TeamMember[];
  columns?: number;
}

export const TeamGrid = ({ members, columns = 4 }: TeamGridProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const selectedMember = members.find((m) => m.id === selectedId);
  const selectedIndex = members.findIndex((m) => m.id === selectedId);

  // Calculate which row the selected card is in (0-indexed)
  const selectedRow = selectedIndex >= 0 ? Math.floor(selectedIndex / columns) : -1;

  // Insert detail panel after the last card in the selected row
  const insertAfterIndex = selectedRow >= 0 ? Math.min((selectedRow + 1) * columns - 1, members.length - 1) : -1;

  useEffect(() => {
    if (selectedId && detailRef.current) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
  }, [selectedId]);

  const handleClick = (id: string) => {
    setSelectedId(selectedId === id ? null : id);
  };

  // Build the render list with detail panel inserted at the right position
  const renderItems: Array<{ type: "card"; member: TeamMember; index: number } | { type: "detail" }> = [];

  members.forEach((member, index) => {
    renderItems.push({ type: "card", member, index });
    if (index === insertAfterIndex && selectedMember) {
      renderItems.push({ type: "detail" });
    }
  });

  return (
    <div
      className={cn(
        "grid",
        columns === 4 && "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-10",
        columns === 3 && "grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-10",
        columns === 2 && "grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8"
      )}
      style={{ maxWidth: columns === 3 ? 1100 : undefined, margin: columns === 3 ? "0 auto" : undefined }}
    >
      {renderItems.map((item) => {
        if (item.type === "card") {
          const { member, index } = item;
          const isSelected = member.id === selectedId;
          const color = getColor(member.role);

          return (
            <div key={member.id}>
              <button
                onClick={() => handleClick(member.id)}
                className={cn(
                  "relative w-full rounded-[20px] overflow-hidden cursor-pointer",
                  "transition-all duration-400",
                  "focus:outline-none",
                  "max-sm:!aspect-[3/4]",
                  isSelected
                    ? "ring-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
                    : "shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.1)] hover:-translate-y-2"
                )}
                style={{
                  ...(isSelected ? { ringColor: color.accent } : {}),
                  aspectRatio: "4/4",
                }}
              >
                {/* Photo */}
                <Image
                  src={member.imageSrc}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Name + Role overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-left">
                  <h3
                    className="font-['Nunito_Sans',sans-serif] text-white leading-snug text-[12px] sm:text-[15px]"
                    style={{ fontWeight: 800 }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="mt-0.5 sm:mt-1 leading-snug text-[10px] sm:text-[11px]"
                    style={{ color: "#dbb894", fontWeight: 700 }}
                  >
                    {member.role.length > 30
                      ? member.role.slice(0, 30) + "..."
                      : member.role}
                  </p>
                </div>

                {/* Colored accent line at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[3px]"
                  style={{ background: color.gradient }}
                />

                {/* Selected indicator */}
                {isSelected && (
                  <div
                    className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center bg-white/90"
                  >
                    <X className="w-4 h-4" style={{ color: color.accent }} />
                  </div>
                )}
              </button>
            </div>
          );
        }

        // Detail panel
        if (item.type === "detail" && selectedMember) {
          const color = getColor(selectedMember.role);
          return (
            <div
              key="detail-panel"
              className={cn(
                columns === 4 && "col-span-2 sm:col-span-3 lg:col-span-4",
                columns === 3 && "col-span-2 sm:col-span-3",
                columns === 2 && "col-span-1 sm:col-span-2"
              )}
              ref={detailRef}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedMember.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div
                    className="bg-white rounded-[24px] overflow-hidden"
                    style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}
                  >
                    {/* Colored top bar */}
                    <div className="h-[4px]" style={{ background: color.gradient }} />

                    <div className="flex flex-col md:flex-row">
                      {/* Left: Photo */}
                      <div className="relative w-full md:w-[280px] shrink-0">
                        <div className="relative h-[220px] sm:h-[300px] md:h-full min-h-[220px] sm:min-h-[300px]">
                          <Image
                            src={selectedMember.imageSrc}
                            alt={selectedMember.name}
                            fill
                            className="object-cover"
                            sizes="280px"
                          />
                        </div>
                      </div>

                      {/* Right: Details */}
                      <div className="flex-1 p-5 sm:p-8 md:p-10">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3
                              className="font-['Libre_Baskerville',serif]"
                              style={{ fontSize: 24, color: "#3a3530", fontWeight: 700 }}
                            >
                              {selectedMember.name}
                            </h3>
                            <p
                              className="mt-1 font-[700]"
                              style={{ fontSize: 14, color: color.accent }}
                            >
                              {selectedMember.role}
                            </p>
                          </div>
                          <button
                            onClick={() => setSelectedId(null)}
                            className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-[#fdf8f2] hover:bg-[#f0e8de] transition-colors cursor-pointer"
                          >
                            <X className="w-4 h-4 text-[#7a7470]" />
                          </button>
                        </div>

                        {/* Qualification */}
                        {selectedMember.qualification && (
                          <p
                            className="mt-3 inline-block rounded-full"
                            style={{
                              fontSize: 12,
                              color: color.accent,
                              fontWeight: 600,
                              backgroundColor: `${color.accent}10`,
                              padding: "5px 14px",
                            }}
                          >
                            {selectedMember.qualification}
                          </p>
                        )}

                        {/* Divider */}
                        <div
                          className="w-12 h-[3px] rounded-full mt-5 mb-5"
                          style={{ background: color.gradient }}
                        />

                        {/* Bio */}
                        <p
                          style={{ fontSize: 14, color: "#7a7470", lineHeight: 1.85 }}
                        >
                          {selectedMember.bio}
                        </p>

                        {/* Languages */}
                        <div className="mt-5 flex flex-wrap items-center gap-2">
                          <span style={{ fontSize: 12, color: "#3a3530", fontWeight: 700 }}>
                            Speaks:
                          </span>
                          {selectedMember.languages.map((lang) => (
                            <span
                              key={lang}
                              className="rounded-full"
                              style={{
                                backgroundColor: "#fdf8f2",
                                padding: "3px 12px",
                                fontSize: 12,
                                fontWeight: 600,
                                color: "#7a7470",
                              }}
                            >
                              {lang}
                            </span>
                          ))}
                        </div>

                        {/* Book button — hide for non-clinical staff */}
                        {!selectedMember.role.startsWith("Front Desk") && (
                          <div className="mt-7">
                            <Link
                              href={`/book-appointment/${selectedMember.slug}`}
                              className={cn(
                                "inline-flex items-center gap-2 rounded-full text-white",
                                "text-[14px] font-[700] px-7 py-3",
                                "hover:opacity-90 transition-opacity duration-300"
                              )}
                              style={{ background: color.gradient }}
                            >
                              Book Appointment
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};
