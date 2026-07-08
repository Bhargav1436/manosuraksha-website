import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { beliefs } from "@/data/beliefs";
import { supportedLanguages } from "@/data/languages";
import { MotionWrapper } from "@/components/shared/motion-wrapper";
import { PageHero } from "@/components/shared/page-hero";
import { BeliefsTabs } from "@/components/sections/beliefs-tabs";
import { PageTransition } from "@/components/shared/page-transition";

export const metadata: Metadata = {
  title: "What We Believe",
  description:
    "At Manosuraksha, we believe your story matters. We champion unapologetic self-care, reframe recovery, demystify neuroscience, and provide inclusive multilingual mental health care.",
};

export default function BeliefsPage() {
  return (
    <PageTransition>
      <PageHero
        title="What We Believe?"
        subtitle="The principles that guide every conversation, every session, and every step of your journey with us."
        breadcrumb="What We Believe"
      />

      {/* Beliefs — Tabbed Section */}
      <section
        className="relative max-sm:!px-4 max-sm:!py-[60px]"
        style={{ backgroundColor: "#fdf8f2", padding: "100px 60px" }}
      >
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          {/* Header */}
          <div className="text-center mb-14">
            <MotionWrapper variant="fadeInUp">
              <span
                className="inline-flex items-center rounded-full"
                style={{
                  backgroundColor: "rgba(196,149,106,0.1)",
                  color: "#c4956a",
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  padding: "6px 16px",
                }}
              >
                Our Core Beliefs
              </span>
              <h2
                className="font-['Libre_Baskerville',serif] mt-4 max-sm:!text-[28px]"
                style={{ fontSize: 40, color: "#3d5a40" }}
              >
                Six Pillars of Our Practice
              </h2>
              <p
                className="mt-4 mx-auto"
                style={{
                  fontSize: 16,
                  color: "#7a7470",
                  lineHeight: 1.8,
                  maxWidth: 560,
                }}
              >
                These beliefs aren&apos;t just words on a page — they are the foundation of
                how we care for you.
              </p>
            </MotionWrapper>
          </div>

          {/* Tabbed Beliefs Component */}
          <MotionWrapper variant="fadeInUp" delay={0.15}>
            <BeliefsTabs />
          </MotionWrapper>
        </div>
      </section>

      {/* Inspirational Section — "Joy of being YOU" */}
      <section
        style={{ backgroundColor: "#fdf8f2", padding: "0 60px 100px" }}
        className="max-sm:!px-4 max-sm:!pb-[60px]"
      >
        <div className="mx-auto" style={{ maxWidth: 1280 }}>
          <MotionWrapper variant="fadeInUp">
            <div
              className={cn(
                "relative overflow-hidden rounded-[28px]",
                "px-12 py-16 text-center",
                "max-sm:px-6 max-sm:py-10"
              )}
              style={{
                background: "linear-gradient(135deg, #3d5a40 0%, #4a6e4d 30%, #5b7a5e 60%, #6b8b8b 100%)",
              }}
            >
              <div className="absolute top-[-60px] right-[-60px] w-[200px] h-[200px] rounded-full bg-[#c4956a]/10" />
              <div className="absolute bottom-[-40px] left-[-40px] w-[160px] h-[160px] rounded-full bg-white/5" />
              <div className="absolute top-1/3 right-1/4 w-[100px] h-[100px] rounded-full bg-[#dbb894]/8" />

              <p className="relative text-[26px] sm:text-[32px] font-['Libre_Baskerville',serif] font-bold text-white leading-snug max-w-[650px] mx-auto">
                Think back to a time when you felt the pure joy of being{" "}
                <span className="text-[#dbb894]">&lsquo;YOU.&rsquo;</span>
              </p>
              <p className="relative mt-5 text-[22px] text-white/90 font-[600] leading-relaxed max-w-[500px] mx-auto">
                You can feel that way again.
              </p>
              <p className="relative mt-3 text-[16px] text-white/70 leading-relaxed max-w-[500px] mx-auto">
                Our holistic approach nurtures self-esteem, because you deserve
                that confidence.
              </p>
              <Link
                href="/book-appointment"
                className={cn(
                  "relative inline-flex items-center gap-2.5 mt-9",
                  "px-8 py-4 rounded-full",
                  "bg-gradient-to-r from-[#c4956a] to-[#dbb894] text-white",
                  "text-[15px] font-[700] shadow-lg",
                  "hover:shadow-[0_8px_30px_rgba(196,149,106,0.4)]",
                  "hover:scale-[1.03] active:scale-[0.98]",
                  "transition-all duration-300"
                )}
              >
                I Want To Elevate Myself
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* Languages Section */}
      <section
        style={{ padding: "0 60px 100px" }}
        className="max-sm:!px-4 max-sm:!pb-[60px]"
      >
        <div
          className={cn("rounded-[40px] mx-[30px] max-lg:mx-0")}
          style={{
            background: "linear-gradient(135deg, #f0e4d8 0%, #fdf8f2 50%, #e8ded4 100%)",
            padding: "60px 48px",
          }}
        >
          <div className="mx-auto text-center" style={{ maxWidth: 1280 }}>
            <MotionWrapper variant="fadeInUp">
              <span
                className="inline-flex items-center rounded-full"
                style={{
                  backgroundColor: "rgba(196,149,106,0.12)",
                  color: "#c4956a",
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  padding: "6px 16px",
                }}
              >
                Breaking Language Barriers
              </span>
              <h2
                className="font-['Libre_Baskerville',serif] mt-4 max-sm:!text-[28px]"
                style={{ fontSize: 40, color: "#3d5a40" }}
              >
                Care in Your Language
              </h2>
              <p
                className="mt-4 mx-auto"
                style={{ fontSize: 16, color: "#7a7470", lineHeight: 1.8, maxWidth: 560 }}
              >
                We believe language should never be a barrier to mental health support.
                Our team speaks your language.
              </p>
            </MotionWrapper>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5 max-w-3xl mx-auto mt-10">
              {supportedLanguages.map((language, index) => {
                const colors = [
                  { color: "#5b7a5e", bg: "#5b7a5e10", border: "#5b7a5e20" },
                  { color: "#c4956a", bg: "#c4956a10", border: "#c4956a20" },
                  { color: "#6b8b8b", bg: "#6b8b8b10", border: "#6b8b8b20" },
                  { color: "#9b7b5e", bg: "#9b7b5e10", border: "#9b7b5e20" },
                ];
                const c = colors[index % colors.length];
                return (
                  <MotionWrapper key={language} variant="scaleIn" delay={index * 0.05}>
                    <span
                      className="inline-flex items-center rounded-full text-base font-bold cursor-default hover:scale-105 transition-transform duration-200"
                      style={{
                        backgroundColor: c.bg,
                        color: c.color,
                        padding: "12px 28px",
                        border: `1.5px solid ${c.border}`,
                      }}
                    >
                      {language}
                    </span>
                  </MotionWrapper>
                );
              })}
            </div>

            <MotionWrapper variant="fadeInUp" delay={0.4}>
              <p
                className="mt-10 mx-auto"
                style={{ fontSize: 14, color: "#7a7470", lineHeight: 1.7, maxWidth: 480 }}
              >
                Can&apos;t find your language? Reach out to us and we&apos;ll do our best
                to accommodate your needs.
              </p>
            </MotionWrapper>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
