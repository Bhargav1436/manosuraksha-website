import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { programs } from "@/data/programs";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/shared/page-hero";

export async function generateStaticParams() {
  return programs.map((program) => ({
    slug: program.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);

  if (!program) {
    return { title: "Program Not Found" };
  }

  return {
    title: `${program.title} - ${program.subtitle}`,
    description: program.description,
  };
}

const accentColors: Record<string, { color: string; gradient: string }> = {
  "mind-insight": { color: "#5b7a5e", gradient: "linear-gradient(135deg, #5b7a5e, #7a9a7d)" },
  "mind-recover": { color: "#c4956a", gradient: "linear-gradient(135deg, #c4956a, #dbb894)" },
  "mind-shift": { color: "#6b8b8b", gradient: "linear-gradient(135deg, #6b8b8b, #8aabab)" },
  "mind-nurture": { color: "#9b7b5e", gradient: "linear-gradient(135deg, #9b7b5e, #b89a7e)" },
  "tele-minds": { color: "#7a6b8a", gradient: "linear-gradient(135deg, #7a6b8a, #9a8baa)" },
  "brain-stimulation": { color: "#c4956a", gradient: "linear-gradient(135deg, #c4956a, #dbb894)" },
};

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);

  if (!program) {
    notFound();
  }

  const accent = accentColors[program.slug] || accentColors["mind-insight"];
  const currentIndex = programs.findIndex((p) => p.slug === slug);
  const prevProgram = currentIndex > 0 ? programs[currentIndex - 1] : null;
  const nextProgram = currentIndex < programs.length - 1 ? programs[currentIndex + 1] : null;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <PageHero
        title={program.title}
        subtitle={program.subtitle}
        breadcrumb={[
          { label: "Programs", href: "/programs" },
          { label: program.title },
        ]}
      />

      {/* Program Details */}
      <section className="bg-[#fdf8f2] max-sm:!px-4 max-sm:!py-[50px]" style={{ padding: "80px 60px" }}>
        <div className="mx-auto" style={{ maxWidth: 900 }}>
          {/* Program image + description */}
          <div
            className="bg-white rounded-[24px] overflow-hidden"
            style={{
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              border: "1px solid rgba(0,0,0,0.04)",
            }}
          >
            {/* Image banner */}
            <div className="relative w-full h-[320px] sm:h-[380px] overflow-hidden group">
              <Image
                src={program.image}
                alt={program.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 900px"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, ${accent.color}cc, transparent)`,
                }}
              />
              {/* Subtitle chip */}
              <div className="absolute bottom-5 left-6">
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-[12px] font-[700] uppercase tracking-wider text-white"
                  style={{ backgroundColor: `${accent.color}cc`, backdropFilter: "blur(8px)" }}
                >
                  {program.subtitle}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-10">
              <h2
                className="text-[24px] font-serif font-bold mb-4"
                style={{ color: "#3a3530" }}
              >
                About This Program
              </h2>
              <p className="text-[15px] text-[#7a7470] leading-[1.9]">
                {program.description}
              </p>
            </div>
          </div>

          {/* Conditions */}
          <div
            className="bg-white rounded-[24px] mt-8 p-8 md:p-10"
            style={{
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              border: "1px solid rgba(0,0,0,0.04)",
            }}
          >
            <h2
              className="text-[24px] font-serif font-bold mb-6"
              style={{ color: "#3a3530" }}
            >
              Conditions We Treat
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {program.conditions.map((condition) => (
                <div
                  key={condition}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-[14px] transition-all duration-300 hover:-translate-y-[2px]"
                  style={{
                    backgroundColor: `${accent.color}08`,
                    border: `1px solid ${accent.color}15`,
                  }}
                >
                  <CheckCircle2
                    className="h-[18px] w-[18px] flex-shrink-0"
                    style={{ color: accent.color }}
                  />
                  <span className="text-[14px] font-[600] text-[#3a3530]">
                    {condition}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div
            className="rounded-[24px] mt-8 p-10 md:p-12 text-center"
            style={{
              background: accent.gradient,
            }}
          >
            <h2 className="text-[26px] font-serif font-bold text-white mb-3">
              Ready to Get Started?
            </h2>
            <p className="text-white/75 text-[15px] mb-8 max-w-md mx-auto leading-relaxed">
              Take the first step towards better mental health. Book an
              appointment with our experienced team today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/book-appointment"
                className={cn(
                  "inline-flex items-center gap-2 px-7 py-3.5 rounded-full",
                  "bg-white text-[14px] font-[700]",
                  "hover:shadow-lg hover:scale-[1.03]",
                  "transition-all duration-300"
                )}
                style={{ color: accent.color }}
              >
                Book an Appointment
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center gap-2 px-7 py-3.5 rounded-full",
                  "border-2 border-white/40 text-white text-[14px] font-[700]",
                  "hover:bg-white/15",
                  "transition-all duration-300"
                )}
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Navigation between programs */}
          <div className="mt-8 flex items-center justify-between">
            {prevProgram ? (
              <Link
                href={`/programs/${prevProgram.slug}`}
                className="inline-flex items-center gap-2 text-[14px] font-[600] text-[#5b7a5e] hover:text-[#3d5a40] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {prevProgram.title}
              </Link>
            ) : (
              <div />
            )}
            {nextProgram ? (
              <Link
                href={`/programs/${nextProgram.slug}`}
                className="inline-flex items-center gap-2 text-[14px] font-[600] text-[#5b7a5e] hover:text-[#3d5a40] transition-colors"
              >
                {nextProgram.title}
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* Back link */}
          <div className="mt-6 text-center">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-[13px] font-[600] text-[#7a7470] hover:text-[#5b7a5e] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              View All Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
