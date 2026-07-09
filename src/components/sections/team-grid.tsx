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

const directorStats = [
  { label: "Experience", value: "10+ Years" },
  { label: "Trained At", value: "NIMHANS" },
  { label: "Countries", value: "3 Nations" },
];

export const TeamGrid = ({ members }: TeamGridProps) => {
  const director = members[0];
  const restOfTeam = members.slice(1);

  return (
    <div className="max-w-6xl mx-auto">
      <style>{`
        @keyframes shimmer-ring {
          0%   { opacity: 0.55; }
          50%  { opacity: 1; }
          100% { opacity: 0.55; }
        }
        .shimmer-ring {
          animation: shimmer-ring 2.8s ease-in-out infinite;
        }
      `}</style>

      {/* ── SPOTLIGHT: Meet Our Director ── */}
      <div className="mb-16">
        {/* Section label */}
        <div className="text-center mb-8">
          <span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[12px] font-[800] tracking-[2px] uppercase text-white"
            style={{
              background: "linear-gradient(135deg, #c4956a, #dbb894)",
              boxShadow: "0 4px 16px rgba(196,149,106,0.35)",
            }}
          >
            ★ Meet Our Director
          </span>
        </div>

        {/* Featured card wrapper */}
        <div className="relative">
          {/* Animated shimmer ring */}
          <div
            className="shimmer-ring absolute -inset-[3px] rounded-[27px] pointer-events-none z-0"
            style={{
              background: "linear-gradient(135deg, #c4956a, #dbb894, #c4956a)",
            }}
          />

          {/* Card */}
          {(() => {
            const member = director;
            return (
              /* ── FEATURED HERO CARD ── */
              <div className="rounded-[24px] overflow-hidden relative z-[1] flex flex-col md:flex-row shadow-[0_20px_60px_rgba(61,90,64,0.3)] hover:shadow-[0_28px_80px_rgba(61,90,64,0.4)] transition-all duration-500">
                {/* Photo side */}
                <div className="relative w-full md:w-[380px] lg:w-[420px] shrink-0">
                  <div className="relative h-[340px] sm:h-[400px] md:h-full md:min-h-[480px]">
                    <Image
                      src={member.imageSrc}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 420px"
                    />

                    {/* Director badge */}
                    <div className="absolute top-5 left-5 z-10">
                      <span
                        className="px-3.5 py-1.5 rounded-full text-[11px] font-[800] tracking-widest uppercase text-white block"
                        style={{
                          background: "linear-gradient(135deg, #c4956a, #dbb894)",
                          boxShadow: "0 4px 14px rgba(196,149,106,0.55)",
                        }}
                      >
                        Director &amp; Founder
                      </span>
                    </div>

                    {/* Institution label */}
                    <div className="absolute bottom-5 left-0 right-0 flex justify-center md:hidden">
                      <span
                        className="px-4 py-1.5 rounded-full text-[11px] font-[700] text-white/90 backdrop-blur-sm"
                        style={{ background: "rgba(61,90,64,0.7)" }}
                      >
                        NIMHANS · Columbia · Harvard
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content side — dark sage green */}
                <div
                  className="flex-1 p-7 sm:p-9 lg:p-12 flex flex-col justify-center relative overflow-hidden"
                  style={{ background: "linear-gradient(160deg, #3d5a40 0%, #2e4430 100%)" }}
                >
                  {/* Decorative circles */}
                  <div className="absolute top-[-60px] right-[-60px] w-[200px] h-[200px] rounded-full bg-white/[0.03] pointer-events-none" />
                  <div className="absolute bottom-[-40px] left-[-40px] w-[160px] h-[160px] rounded-full bg-[#c4956a]/[0.06] pointer-events-none" />

                  {/* Institution (desktop only) */}
                  <span
                    className="hidden md:inline-flex self-start mb-5 px-3.5 py-1 rounded-full text-[11px] font-[700] text-white/80 relative"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
                  >
                    NIMHANS · Columbia University · Harvard
                  </span>

                  {/* Name */}
                  <h3
                    className="font-['Libre_Baskerville',serif] text-[26px] sm:text-[30px] lg:text-[34px] leading-tight font-bold text-white relative"
                  >
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p
                    className="mt-2 text-[13px] sm:text-[14px] font-[700] relative"
                    style={{ color: "#dbb894" }}
                  >
                    {member.role}
                  </p>

                  {/* Qualification */}
                  {member.qualification && (
                    <p
                      className="mt-3 self-start rounded-full text-[11px] sm:text-[12px] font-[600] px-3.5 py-1 relative"
                      style={{ backgroundColor: "rgba(196,149,106,0.15)", color: "#dbb894", border: "1px solid rgba(196,149,106,0.25)" }}
                    >
                      {member.qualification}
                    </p>
                  )}

                  {/* Stats row */}
                  <div className="mt-5 flex flex-wrap gap-3 relative">
                    {directorStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex flex-col items-center px-4 py-2.5 rounded-[14px]"
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(196,149,106,0.2)",
                        }}
                      >
                        <span className="text-[16px] font-[800] text-white leading-none">{stat.value}</span>
                        <span className="text-[10px] font-[600] mt-1" style={{ color: "rgba(219,184,148,0.7)" }}>{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div
                    className="w-12 h-[3px] rounded-full mt-5 mb-5 relative"
                    style={{ background: "linear-gradient(90deg, #c4956a, #dbb894)" }}
                  />

                  {/* Bio */}
                  {member.bio && (
                    <p className="text-[13px] sm:text-[14px] leading-[1.85] text-white/70 relative text-justify">
                      {member.bio}
                    </p>
                  )}

                  {/* Languages */}
                  {member.languages.length > 0 && (
                    <div className="mt-5 flex flex-wrap items-center gap-2 relative">
                      <span className="text-[11px] sm:text-[12px] font-[700] text-white/50">Speaks:</span>
                      {member.languages.map((lang) => (
                        <span
                          key={lang}
                          className="rounded-full text-[11px] font-[600] px-2.5 py-0.5"
                          style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Book button */}
                  <Link
                    href={`/book-appointment/${member.slug}`}
                    className="mt-7 self-start inline-flex items-center gap-2 rounded-full text-white text-[13px] font-[700] px-7 py-3 hover:opacity-90 hover:translate-x-1 transition-all duration-300 relative"
                    style={{
                      background: "linear-gradient(135deg, #c4956a, #dbb894)",
                      boxShadow: "0 4px 20px rgba(196,149,106,0.4)",
                    }}
                  >
                    Book Appointment
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* ── REST OF TEAM ── */}
      {restOfTeam.length > 0 && (
        <>
          {/* Divider label */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(91,122,94,0.2))" }} />
            <span
              className="px-4 py-1.5 rounded-full text-[11px] font-[700] tracking-[1.5px] uppercase whitespace-nowrap"
              style={{ backgroundColor: "rgba(91,122,94,0.08)", color: "#5b7a5e" }}
            >
              Our Clinical Experts
            </span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(91,122,94,0.2), transparent)" }} />
          </div>

          <div className="space-y-10 sm:space-y-14">
            {restOfTeam.map((member, idx) => {
              const color = getColor(member.role);
              const isEven = idx % 2 === 0;
              return (
                <div key={member.id} className="relative">
                  {/* ── REGULAR CARD ── */}
              <div
                className={cn(
                  "bg-white rounded-[24px] overflow-hidden relative z-[1]",
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
                    <div
                      className={cn(
                        "absolute inset-0",
                        "bg-gradient-to-b md:bg-gradient-to-r from-transparent to-white/20",
                        !isEven && "md:bg-gradient-to-l"
                      )}
                    />
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[3px] md:hidden"
                    style={{ background: color.gradient }}
                  />
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
                  <h3
                    className="font-['Libre_Baskerville',serif] text-[20px] sm:text-[22px] lg:text-[24px] leading-snug"
                    style={{ color: "#3a3530", fontWeight: 700 }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="mt-1.5 text-[13px] sm:text-[14px] font-[700]"
                    style={{ color: color.accent }}
                  >
                    {member.role}
                  </p>

                  {member.qualification && (
                    <p
                      className="mt-3 inline-block self-start rounded-full text-[11px] sm:text-[12px] font-[600] px-3.5 py-1"
                      style={{ backgroundColor: `${color.accent}10`, color: color.accent }}
                    >
                      {member.qualification}
                    </p>
                  )}

                  <div
                    className="w-10 h-[3px] rounded-full mt-4 mb-4"
                    style={{ background: color.gradient }}
                  />

                  {member.bio && (
                    <p
                      className="text-[13px] sm:text-[14px] leading-[1.8] text-justify"
                      style={{ color: "#7a7470" }}
                    >
                      {member.bio}
                    </p>
                  )}

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
        </>
      )}
    </div>
  );
};
