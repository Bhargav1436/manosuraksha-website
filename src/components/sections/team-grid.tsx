"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

export const TeamGrid = ({ members }: TeamGridProps) => {
  return (
    <div className="space-y-10 sm:space-y-14 max-w-6xl mx-auto">
      {members.map((member, index) => {
        const color = getColor(member.role);
        const isEven = index % 2 === 0;

        return (
          <div
            key={member.id}
            className="relative"
          >
            {/* Connecting dot on center line (desktop only) */}
            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-8 w-3.5 h-3.5 rounded-full border-[3px] border-white z-10"
              style={{ backgroundColor: color.accent, boxShadow: `0 0 0 3px ${color.accent}30` }}
            />

            {/* Card */}
            <div
              className={cn(
                "bg-white rounded-[24px] overflow-hidden",
                "shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]",
                "transition-all duration-400",
                "flex flex-col md:flex-row",
                !isEven && "md:flex-row-reverse"
              )}
            >
              {/* Photo side */}
              <div className="relative w-full md:w-[280px] lg:w-[320px] shrink-0">
                <div className="relative h-[280px] sm:h-[320px] md:h-full md:min-h-[380px]">
                  <Image
                    src={member.imageSrc}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                  {/* Gradient fade into content side */}
                  <div
                    className={cn(
                      "absolute inset-0",
                      "bg-gradient-to-b md:bg-gradient-to-r from-transparent to-white/20",
                      !isEven && "md:bg-gradient-to-l"
                    )}
                  />
                </div>
                {/* Colored accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[3px] md:hidden"
                  style={{ background: color.gradient }}
                />
                {/* Vertical accent line (desktop) */}
                <div
                  className={cn(
                    "hidden md:block absolute top-0 bottom-0 w-[3px]",
                    isEven ? "right-0" : "left-0"
                  )}
                  style={{ background: color.gradient }}
                />
              </div>

              {/* Content side */}
              <div className="flex-1 p-5 sm:p-7 lg:p-9 flex flex-col justify-center">
                {/* Name */}
                <h3
                  className="font-['Libre_Baskerville',serif] text-[20px] sm:text-[22px] lg:text-[24px] leading-snug"
                  style={{ color: "#3a3530", fontWeight: 700 }}
                >
                  {member.name}
                </h3>

                {/* Role */}
                <p
                  className="mt-1.5 text-[13px] sm:text-[14px] font-[700]"
                  style={{ color: color.accent }}
                >
                  {member.role}
                </p>

                {/* Qualification badge */}
                {member.qualification && (
                  <p
                    className="mt-3 inline-block self-start rounded-full text-[11px] sm:text-[12px] font-[600] px-3.5 py-1"
                    style={{
                      backgroundColor: `${color.accent}10`,
                      color: color.accent,
                    }}
                  >
                    {member.qualification}
                  </p>
                )}

                {/* Divider */}
                <div
                  className="w-10 h-[3px] rounded-full mt-4 mb-4"
                  style={{ background: color.gradient }}
                />

                {/* Bio */}
                {member.bio && (
                  <p
                    className="text-[13px] sm:text-[14px] leading-[1.8] text-justify"
                    style={{ color: "#7a7470" }}
                  >
                    {member.bio}
                  </p>
                )}

                {/* Languages */}
                {member.languages.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] sm:text-[12px] font-[700]" style={{ color: "#3a3530" }}>
                      Speaks:
                    </span>
                    {member.languages.map((lang) => (
                      <span
                        key={lang}
                        className="rounded-full text-[11px] font-[600] px-2.5 py-0.5"
                        style={{ backgroundColor: "#fdf8f2", color: "#7a7470" }}
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                )}

                {/* Book button */}
                {!member.role.startsWith("Front Desk") && (
                  <Link
                    href={`/book-appointment/${member.slug}`}
                    className={cn(
                      "mt-5 inline-flex items-center gap-2 rounded-full text-white self-start",
                      "text-[13px] font-[700] px-6 py-2.5",
                      "hover:opacity-90 hover:translate-x-1 transition-all duration-300"
                    )}
                    style={{ background: color.gradient }}
                  >
                    Book Appointment
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
