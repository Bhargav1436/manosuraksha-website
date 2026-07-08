import { Hero } from "@/components/sections/hero";
import { AboutPreview } from "@/components/sections/about-preview";
import { GallerySection } from "@/components/sections/gallery-section";
import { BeliefsPreview } from "@/components/sections/beliefs-preview";
import { ProgramsPreview } from "@/components/sections/programs-preview";
import { TeamPreview } from "@/components/sections/team-preview";
import { CTASection } from "@/components/sections/cta-section";
import { ContactPreview } from "@/components/sections/contact-preview";
import { SectionDivider } from "@/components/shared/section-divider";

export default function Home() {
  return (
    <>
      <Hero />
      <GallerySection />
      <div id="about" style={{ scrollMarginTop: 100 }}><AboutPreview /></div>
      <SectionDivider />
      <div id="beliefs" style={{ scrollMarginTop: 100 }}><BeliefsPreview /></div>
      <SectionDivider />
      <div id="programs" style={{ scrollMarginTop: 100 }}><ProgramsPreview /></div>
      <SectionDivider />
      <div id="team" style={{ scrollMarginTop: 100 }}><TeamPreview /></div>
      <CTASection />
      <div id="contact" style={{ scrollMarginTop: 100 }}><ContactPreview /></div>

      {/* Healing CTA */}
      <section className="bg-[#fdf8f2] px-4 sm:px-[60px]">
        <div
          className="mx-auto rounded-[24px] sm:rounded-[40px] text-center max-w-[1280px]"
          style={{
            background: "linear-gradient(135deg, #3d5a40 0%, #5b7a5e 40%, #6b8b8b 80%, #5a7a7a 100%)",
            padding: "clamp(32px, 5vw, 60px) clamp(20px, 4vw, 48px)",
          }}
        >
          <p
            className="font-serif text-white leading-relaxed"
            style={{ fontSize: 24, maxWidth: 640, margin: "0 auto" }}
          >
            Healing isn&apos;t just a process; it&apos;s a story! We are the pioneering
            experts of mental health who will guide you to craft your story of triumph.
          </p>
          <a
            href="/book-appointment"
            className="inline-flex items-center justify-center text-[#3d5a40] rounded-full mt-8"
            style={{
              background: "#ffffff",
              fontSize: 14,
              fontWeight: 700,
              padding: "14px 32px",
              transition: "all 0.3s ease",
            }}
          >
            I Want To Heal
          </a>
        </div>
      </section>

      {/* Google Maps */}
      <section style={{ backgroundColor: "#f5efe5", padding: "0 60px 60px" }} className="max-sm:!px-4 max-sm:!pb-8">
        <div className="max-w-[1280px] mx-auto">
          <div
            className="rounded-[24px] overflow-hidden"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.05)" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15554!2d77.5846856!3d12.9253677!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xef03117ea55f277%3A0x9a47f7aefd4cd8e3!2sManosuraksha!5e0!3m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Manosuraksha Nurturing Minds - Jayanagar, Bengaluru"
            />
          </div>
        </div>
      </section>
    </>
  );
}
