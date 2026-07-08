import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  FlaskConical,
  Globe,
  HeartHandshake,
  Award,
  Users,
  Clock,
  CalendarCheck,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MotionWrapper } from "@/components/shared/motion-wrapper";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { PageHero } from "@/components/shared/page-hero";
import { PageTransition } from "@/components/shared/page-transition";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "Manosuraksha is a NIMHANS-trained mental health clinic in Bengaluru offering psychiatry, psychology, yoga therapy and multilingual care. Learn about our mission and team.",
};

const aboutPoints = [
  {
    icon: GraduationCap,
    title: "NIMHANS-Trained",
    description: "Clinicians from India's premier institutions",
    gradient: "linear-gradient(135deg, #5b7a5e, #7a9a7d)",
  },
  {
    icon: FlaskConical,
    title: "Evidence-Based",
    description: "Treatments rooted in scientific research",
    gradient: "linear-gradient(135deg, #c4956a, #dbb894)",
  },
  {
    icon: Globe,
    title: "8 Languages",
    description: "Multilingual care for every individual",
    gradient: "linear-gradient(135deg, #6b8b8b, #8aabab)",
  },
  {
    icon: HeartHandshake,
    title: "Holistic Approach",
    description: "Psychiatry, psychology, yoga & more",
    gradient: "linear-gradient(135deg, #9b7b5e, #b89a7e)",
  },
];

const stats = [
  { value: 12, suffix: "+", label: "Expert Clinicians" },
  { value: 8, suffix: "", label: "Languages Supported" },
  { value: 6, suffix: "", label: "Specialized Programs" },
  { value: 14, suffix: "", label: "Dedicated Team Members" },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <PageHero
        title="Who We Are"
        subtitle="Where the Mind Finds Its Sanctuary"
        breadcrumb="Who We Are"
      />

      {/* About Section - White rounded card */}
      <section
        style={{ backgroundColor: "#fdf8f2", padding: "100px 60px" }}
        className="max-sm:!px-4 max-sm:!py-[60px]"
      >
        <div
          className={cn(
            "bg-white rounded-[24px] sm:rounded-[40px] mx-0 sm:mx-[30px] max-lg:mx-0"
          )}
          style={{ padding: "clamp(24px, 5vw, 60px) clamp(16px, 4vw, 48px)" }}
        >
          <div className="mx-auto" style={{ maxWidth: 1280 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Visual Column */}
              <MotionWrapper variant="fadeInLeft">
                <div className="relative">
                  <div
                    className="rounded-[24px] relative overflow-hidden max-sm:!min-h-[260px]"
                    style={{
                      minHeight: 420,
                    }}
                  >
                    <Image
                      src="/images/about/slide1.png"
                      alt="Manosuraksha - compassionate mental healthcare"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  {/* Floating accent card */}
                  <div
                    className="absolute -bottom-6 -right-6 bg-white rounded-[20px] p-5 max-w-[220px] max-sm:hidden"
                    style={{
                      boxShadow: "0 15px 40px rgba(0,0,0,0.06)",
                    }}
                  >
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl mb-3"
                      style={{ background: "linear-gradient(135deg, #c4956a, #dbb894)" }}
                    >
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-sm font-bold text-[#3a3530] font-['Nunito_Sans',sans-serif]">
                      12+ Expert Clinicians
                    </p>
                    <p className="text-xs text-[#7a7470] mt-1">
                      Multidisciplinary care team
                    </p>
                  </div>
                </div>
              </MotionWrapper>

              {/* Text Column */}
              <MotionWrapper variant="fadeInRight" delay={0.1}>
                <div>
                  {/* Section Label Chip */}
                  <span
                    className="inline-flex items-center rounded-full font-bold uppercase"
                    style={{
                      backgroundColor: "rgba(91,122,94,0.08)",
                      color: "#5b7a5e",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: 1,
                      padding: "6px 16px",
                    }}
                  >
                    Who Are We?
                  </span>

                  {/* Title */}
                  <h2
                    className="font-['Libre_Baskerville',serif] mt-4 max-sm:!text-[28px]"
                    style={{ fontSize: 40, color: "#3d5a40" }}
                  >
                    Where the Mind Finds Its Sanctuary
                  </h2>

                  {/* Exact paragraphs from old website */}
                  <p
                    className="mt-5"
                    style={{
                      fontSize: 16,
                      color: "#7a7470",
                      lineHeight: 1.8,
                      maxWidth: 560,
                    }}
                  >
                    In the realm of mental health, Manosuraksha emerges, echoing the
                    ancient resonance of{" "}
                    <strong
                      style={{
                        background: "linear-gradient(135deg, #c4956a, #dbb894)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      &lsquo;Manas&rsquo; — the heartbeat within our minds
                    </strong>
                    .
                  </p>

                  <p
                    className="mt-4"
                    style={{
                      fontSize: 16,
                      color: "#7a7470",
                      lineHeight: 1.8,
                      maxWidth: 560,
                    }}
                  >
                    We envision a world where understanding one&apos;s mind is a journey,
                    a passage to resilience and purpose. Manosuraksha isn&apos;t a service;
                    it&apos;s the catalyst for metamorphosis.
                  </p>

                  <p
                    className="mt-4"
                    style={{
                      fontSize: 16,
                      color: "#7a7470",
                      lineHeight: 1.8,
                      maxWidth: 560,
                    }}
                  >
                    Rooted in scientific evidence, our expertise isn&apos;t a mere answer;
                    it&apos;s the alchemy transforming understanding mental health into a
                    profound evolution, beyond symptoms, delving into the essence of
                    mental vitality.
                  </p>

                  <p
                    className="mt-4"
                    style={{
                      fontSize: 16,
                      color: "#7a7470",
                      lineHeight: 1.8,
                      maxWidth: 560,
                    }}
                  >
                    Manosuraksha isn&apos;t a presence; it&apos;s a kinship, walking beside you
                    on the path of self-discovery. We offer not just solutions but the
                    tools, the strength, the unwavering support — the arsenal to forge
                    your mind&apos;s anthem.
                  </p>

                  {/* 2x2 About Points Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    {aboutPoints.map((point) => (
                      <div
                        key={point.title}
                        className="flex items-start gap-3 rounded-full"
                        style={{
                          backgroundColor: "#fdf8f2",
                          padding: "12px 18px",
                        }}
                      >
                        <div
                          className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-lg"
                          style={{
                            background: point.gradient,
                          }}
                        >
                          <point.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4
                            className="font-['Nunito_Sans',sans-serif]"
                            style={{ fontWeight: 800, fontSize: 14, color: "#3a3530" }}
                          >
                            {point.title}
                          </h4>
                          <p style={{ fontSize: 12, color: "#7a7470" }}>
                            {point.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </MotionWrapper>
            </div>
          </div>
        </div>
      </section>

      {/* Leap of Faith Banner */}
      <section
        style={{ backgroundColor: "#fdf8f2", padding: "0 60px 100px" }}
        className="max-sm:!px-4 max-sm:!pb-[60px]"
      >
        <div className="mx-auto" style={{ maxWidth: 1280 }}>
          <MotionWrapper variant="fadeInUp">
            <div
              className={cn(
                "relative overflow-hidden rounded-[28px]",
                "bg-gradient-to-br from-[#3d5a40] via-[#4a6e4d] to-[#5b7a5e]",
                "px-12 py-14 text-center",
                "max-sm:px-6 max-sm:py-10"
              )}
            >
              <div className="absolute top-[-60px] right-[-60px] w-[200px] h-[200px] rounded-full bg-white/5" />
              <div className="absolute bottom-[-40px] left-[-40px] w-[160px] h-[160px] rounded-full bg-white/5" />

              <p className="relative text-[26px] sm:text-[30px] font-['Libre_Baskerville',serif] font-bold text-white leading-snug max-w-[600px] mx-auto">
                Change often starts with a{" "}
                <span className="text-[#dbb894]">Leap Of Faith!</span>
              </p>
              <p className="relative mt-3 text-[17px] text-white/80 leading-relaxed max-w-[500px] mx-auto">
                What if this is your moment? Together, let us make that leap.
              </p>
              <Link
                href="/book-appointment"
                className={cn(
                  "relative inline-flex items-center gap-2.5 mt-8",
                  "px-7 py-3.5 rounded-full",
                  "bg-gradient-to-r from-[#c4956a] to-[#dbb894] text-white",
                  "text-[15px] font-[700] shadow-lg",
                  "hover:shadow-xl hover:scale-[1.03] active:scale-[0.98]",
                  "transition-all duration-300"
                )}
              >
                I Want To Take Action
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* Mission / Approach / Promise */}
      <section
        style={{ backgroundColor: "#fdf8f2", padding: "0 60px 100px" }}
        className="max-sm:!px-4 max-sm:!pb-[60px]"
      >
        <div className="mx-auto" style={{ maxWidth: 1280 }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                title: "Our Mission",
                description:
                  "To make quality mental healthcare accessible, stigma-free, and deeply personal for every individual in our community.",
                gradient: "linear-gradient(135deg, #5b7a5e, #7a9a7d)",
              },
              {
                icon: Users,
                title: "Our Approach",
                description:
                  "A multidisciplinary team working together — psychiatrists, psychologists, yoga therapists, and neuropsychologists — to offer truly holistic care.",
                gradient: "linear-gradient(135deg, #c4956a, #dbb894)",
              },
              {
                icon: Clock,
                title: "Our Promise",
                description:
                  "A safe, judgment-free space where your courage is celebrated and your path to healing is supported at every step.",
                gradient: "linear-gradient(135deg, #6b8b8b, #8aabab)",
              },
            ].map((item, index) => (
              <MotionWrapper key={item.title} variant="fadeInUp" delay={index * 0.1}>
                <div
                  className="bg-white rounded-[20px] h-full hover:-translate-y-1.5 hover:shadow-lg"
                  style={{
                    padding: "36px 28px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl mb-5"
                    style={{ background: item.gradient }}
                  >
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3
                    className="font-['Nunito_Sans',sans-serif] mb-3"
                    style={{ fontWeight: 800, fontSize: 18, color: "#3a3530" }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "#7a7470", lineHeight: 1.7 }}>
                    {item.description}
                  </p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #3d5a40 0%, #5b7a5e 40%, #6b8b8b 80%, #5a7a7a 100%)",
          padding: "80px 60px",
        }}
        className="max-sm:!px-6"
      >
        <div className="mx-auto" style={{ maxWidth: 1280 }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <MotionWrapper key={stat.label} variant="scaleIn" delay={index * 0.1}>
                <div className="text-center">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    className="text-4xl md:text-5xl font-bold text-white font-['Libre_Baskerville',serif]"
                  />
                  <p className="mt-2 text-white/80 text-sm md:text-base font-medium">
                    {stat.label}
                  </p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{ backgroundColor: "#fdf8f2", padding: "100px 60px" }}
        className="max-sm:!px-6 max-sm:!py-[60px]"
      >
        <div className="mx-auto text-center" style={{ maxWidth: 1280 }}>
          <MotionWrapper variant="fadeInUp">
            <h2
              className="font-['Libre_Baskerville',serif] max-sm:!text-[28px]"
              style={{ fontSize: 40, color: "#3d5a40" }}
            >
              Ready to Begin Your Journey?
            </h2>
            <p
              className="mx-auto mt-4"
              style={{
                fontSize: 16,
                color: "#7a7470",
                lineHeight: 1.8,
                maxWidth: 560,
              }}
            >
              Take the first step toward a healthier mind. Our team is here to support you
              every step of the way.
            </p>
            <Link
              href="/book-appointment"
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
              <CalendarCheck className="mr-2 h-5 w-5" />
              Book an Appointment
            </Link>
          </MotionWrapper>
        </div>
      </section>
    </PageTransition>
  );
}
