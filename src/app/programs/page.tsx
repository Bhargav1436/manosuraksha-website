import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { MotionWrapper } from "@/components/shared/motion-wrapper";
import { PageHero } from "@/components/shared/page-hero";
import { PageTransition } from "@/components/shared/page-transition";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Programs",
  description:
    "Comprehensive mental health services tailored to your needs. Explore our programs including psychiatry, addiction treatment, child mental health, virtual consultations, and brain stimulation therapy.",
};

const cardAccents = [
  { accent: "#5b7a5e", gradient: "linear-gradient(135deg, #5b7a5e, #7a9a7d)" },
  { accent: "#c4956a", gradient: "linear-gradient(135deg, #c4956a, #dbb894)" },
  { accent: "#6b8b8b", gradient: "linear-gradient(135deg, #6b8b8b, #8aabab)" },
  { accent: "#9b7b5e", gradient: "linear-gradient(135deg, #9b7b5e, #b89a7e)" },
  { accent: "#7a6b8a", gradient: "linear-gradient(135deg, #7a6b8a, #9a8baa)" },
  { accent: "#c4956a", gradient: "linear-gradient(135deg, #c4956a, #dbb894)" },
];

export default async function ProgramsPage() {
  const programs = await prisma.program.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <PageTransition>
      <PageHero
        title="Our Programs"
        subtitle="At Manosuraksha, our commitment to your mental health goes beyond conventional approaches. Our specialized programs are meticulously tailored to reflect our unwavering dedication to your personal journey. Here, transformation is not just a goal; it's our legacy of excellence that sets the industry standard."
        breadcrumb="Our Programs"
      />

      {/* Programs Section */}
      <section
        className="relative overflow-hidden max-sm:!px-4 max-sm:!py-[60px]"
        style={{ backgroundColor: "#fdf8f2", padding: "100px 60px" }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-[8%] right-[5%] w-[350px] h-[350px] rounded-full bg-[#c4956a]/6 blur-[100px]" />
          <div className="absolute bottom-[10%] left-[8%] w-[300px] h-[300px] rounded-full bg-[#5b7a5e]/6 blur-[100px]" />
          <div className="absolute top-[50%] left-[40%] w-[250px] h-[250px] rounded-full bg-[#6b8b8b]/5 blur-[80px]" />
        </div>

        <div className="relative mx-auto" style={{ maxWidth: 1280 }}>
          <div className="text-center mb-16">
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
              What We Offer
            </span>
            <h2
              className="font-['Libre_Baskerville',serif] mt-4 max-sm:!text-[28px]"
              style={{ fontSize: 40, color: "#3d5a40" }}
            >
              Specialized Care Programs
            </h2>
            <p
              className="mt-4 mx-auto"
              style={{ fontSize: 16, color: "#7a7470", lineHeight: 1.8, maxWidth: 560 }}
            >
              Our specialized programs are meticulously tailored to reflect our
              unwavering dedication to your personal journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {programs.map((program, index) => {
              const color = cardAccents[index % cardAccents.length];
              return (
                <MotionWrapper key={program.id} variant="fadeInUp" delay={(index % 3) * 0.12}>
                  <Link href={`/programs/${program.slug}`} className="block h-full group">
                    <div
                      className={cn(
                        "relative rounded-[24px] h-full flex flex-col overflow-hidden bg-white",
                        "shadow-[0_2px_16px_rgba(0,0,0,0.04)]",
                        "hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]",
                        "transition-all duration-500"
                      )}
                    >
                      <div className="relative h-[220px] w-full overflow-hidden">
                        {program.image ? (
                          <Image
                            src={program.image}
                            alt={program.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full" style={{ background: color.gradient }} />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div
                          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white text-[13px] font-[800] group-hover:scale-110 transition-all duration-400"
                          style={{ background: color.gradient }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        {program.subtitle && (
                          <div className="absolute bottom-4 left-4">
                            <span
                              className="inline-block px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-[700] uppercase tracking-wider"
                              style={{ color: color.accent }}
                            >
                              {program.subtitle}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-6 pb-7 flex flex-col flex-1">
                        <h3
                          className="font-['Nunito_Sans',sans-serif] mb-3 transition-colors duration-300"
                          style={{ fontWeight: 800, fontSize: 20, color: "#3a3530" }}
                        >
                          {program.title}
                        </h3>
                        <p className="flex-1" style={{ fontSize: 13.5, color: "#7a7470", lineHeight: 1.75 }}>
                          {(program.description ?? "").length > 180
                            ? (program.description ?? "").slice(0, 180) + "..."
                            : (program.description ?? "")}
                        </p>
                        <div
                          className="inline-flex items-center gap-2 mt-5 text-[13px] font-[700] group-hover:gap-3 transition-all duration-300"
                          style={{ color: color.accent }}
                        >
                          <span>Explore Program</span>
                          <span
                            className="flex items-center justify-center w-7 h-7 rounded-full text-white group-hover:scale-110 transition-all duration-300"
                            style={{ background: color.gradient }}
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>

                      <div className="h-[3px] w-full mt-auto" style={{ background: color.gradient }} />
                    </div>
                  </Link>
                </MotionWrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ backgroundColor: "#fdf8f2" }} className="px-4 py-[60px] sm:px-[60px] sm:py-[100px]">
        <div className="mx-auto text-center" style={{ maxWidth: 1280 }}>
          <MotionWrapper variant="fadeInUp">
            <h2
              className="font-['Libre_Baskerville',serif] max-sm:!text-[28px]"
              style={{ fontSize: 40, color: "#3d5a40" }}
            >
              Not sure which program is right for you?
            </h2>
            <p className="mx-auto mt-4" style={{ fontSize: 16, color: "#7a7470", lineHeight: 1.8, maxWidth: 560 }}>
              Contact us for guidance. Our team will help you find the best path to mental wellness.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center text-white rounded-full mt-8"
              style={{
                background: "linear-gradient(135deg, #c4956a, #dbb894)",
                fontSize: 14,
                fontWeight: 700,
                padding: "14px 32px",
                boxShadow: "0 4px 15px rgba(196,149,106,0.3)",
                transition: "all 0.3s ease",
              }}
            >
              Contact Us for Guidance
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </MotionWrapper>
        </div>
      </section>
    </PageTransition>
  );
}
