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
    </>
  );
}
