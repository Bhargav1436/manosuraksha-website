import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { teamMembers, clinicalTeam } from "@/data/team";
import { MotionWrapper } from "@/components/shared/motion-wrapper";
import { PageHero } from "@/components/shared/page-hero";
import { TeamGrid } from "@/components/sections/team-grid";
import { CTASection } from "@/components/sections/cta-section";
import { PageTransition } from "@/components/shared/page-transition";

export const metadata: Metadata = {
  title: "Our Team - Meet Our Experts",
  description:
    "Meet the distinguished NIMHANS-trained team at Manosuraksha — psychiatrists, clinical psychologists, psychotherapists, and yoga therapists united by expertise, empathy, and care.",
};

const supportStaff = teamMembers.filter(
  (member) => member.role.startsWith("Front Desk")
);

export default function TeamPage() {
  return (
    <PageTransition>
      <PageHero
        title="People of Manosuraksha"
        subtitle="At Manosuraksha, our experts are not just practitioners; they are architects of mental well-being, sculpted by training from premier global institutes."
        breadcrumb="Our Team"
      />

      {/* Clinical Team */}
      <section
        style={{ backgroundColor: "#fdf8f2" }}
        className="px-4 py-[60px] sm:px-[60px] sm:py-[100px]"
      >
        <div className="mx-auto" style={{ maxWidth: 1280 }}>
          {/* Header */}
          <div className="text-center mb-16">
            <span
              className="inline-flex items-center rounded-full"
              style={{
                backgroundColor: "rgba(91,122,94,0.08)",
                color: "#5b7a5e",
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1,
                padding: "6px 16px",
              }}
            >
              Clinical Team
            </span>
            <h2
              className="font-['Libre_Baskerville',serif] mt-4"
              style={{ fontSize: 32, color: "#3d5a40" }}
            >
              Our Clinical Experts
            </h2>
            <p
              className="mt-4 mx-auto"
              style={{ fontSize: 16, color: "#7a7470", lineHeight: 1.8, maxWidth: 660 }}
            >
              At Manosuraksha, our experts are not just practitioners; they are architects
              of mental well-being, sculpted by training from premier global institutes.
              Our multidisciplinary team, spanning psychiatry, addiction medicine, clinical
              psychology, psychiatric social work, nursing, and yoga, forms a powerhouse of unparalleled expertise.
            </p>
          </div>

          {/* Team Grid — Photo cards with expand-below detail */}
          <MotionWrapper variant="fadeInUp">
            <TeamGrid members={clinicalTeam} columns={3} />
          </MotionWrapper>
        </div>
      </section>

      {/* Support Staff */}
      <section
        style={{ backgroundColor: "#fdf8f2" }}
        className="px-4 pb-[60px] sm:px-[60px] sm:pb-[100px]"
      >
        <div className="mx-auto" style={{ maxWidth: 1280 }}>
          <div className="text-center mb-12">
            <span
              className="inline-flex items-center rounded-full"
              style={{
                backgroundColor: "rgba(91,122,94,0.08)",
                color: "#5b7a5e",
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1,
                padding: "6px 16px",
              }}
            >
              Support Staff
            </span>
            <h2
              className="font-['Libre_Baskerville',serif] mt-4"
              style={{ fontSize: 40, color: "#3d5a40" }}
            >
              The Faces That Welcome You
            </h2>
            <p
              className="mt-4 mx-auto"
              style={{ fontSize: 16, color: "#7a7470", lineHeight: 1.8, maxWidth: 560 }}
            >
              Our front desk team ensures your visit is smooth, comfortable, and warm
              from the very first moment.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <MotionWrapper variant="fadeInUp">
              <TeamGrid members={supportStaff} columns={2} />
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ backgroundColor: "#fdf8f2", padding: "0 0 60px" }}>
        <CTASection />
      </section>
    </PageTransition>
  );
}
