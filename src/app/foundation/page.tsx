import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart } from "lucide-react";
import { MotionWrapper } from "@/components/shared/motion-wrapper";
import { PageHero } from "@/components/shared/page-hero";
import { PageTransition } from "@/components/shared/page-transition";

export const metadata: Metadata = {
  title: "Manosuraksha Mental Health Foundation",
  description:
    "Manosuraksha Foundation unites mental health stakeholders through philanthropy, research, and education — advancing psychiatric research, capacity-building, and patient engagement in India.",
};

const canvasPoints = [
  {
    title: "A Unique Crossroads",
    description:
      "India stands at a crossroads with its burgeoning population and flourishing economic prowess. In the midst of this dynamism, the need for mental health support has never been more critical.",
    color: "#5b7a5e",
    bg: "rgba(91,122,94,0.06)",
    num: "01",
  },
  {
    title: "Harmony of Stakeholders",
    description:
      "To make a lasting impact on global research, we acknowledge the significance of harmonizing various stakeholders. Researchers, clinicians, analysts, healthcare providers, patients, caregivers, and generous benefactors—it takes a collective force.",
    color: "#c4956a",
    bg: "rgba(196,149,106,0.06)",
    num: "02",
  },
  {
    title: "Cutting-edge Technical Research",
    description:
      "Advanced investigational methodologies for understanding psychiatry and refining treatment techniques should transcend geographical and demographical limitations. We need to commit resources towards serving patients in need by contributing significantly to research and aim to be at the forefront of pioneering advancements.",
    color: "#6b8b8b",
    bg: "rgba(107,139,139,0.06)",
    num: "03",
  },
];

const visionPoints = [
  {
    title: "Uniting Hearts and Minds",
    description:
      "Our foremost objective is to unite all stakeholders in the realm of mental health, creating a harmonious forum where philanthropy meets purpose.",
    color: "#5b7a5e",
  },
  {
    title: "Illuminating the Path",
    description:
      "We dedicate ourselves to illuminating the path with transformative educational and research endeavors. Our initiatives include capacity-building workshops, advanced training in research methodologies, research ethics, responsible conduct of research, public and patient engagement, as well as caregiver and patient education.",
    color: "#c4956a",
  },
  {
    title: "Lived Stories, Shared Strength",
    description:
      "At the core of our foundation are the voices and stories of individuals who have faced the challenges of mental health. Their experiences guide our mission, reminding us that philanthropy isn't just about giving; it's about sharing and empowering.",
    color: "#9b7b5e",
  },
];

const leaders = [
  {
    name: "Dr. Suhas Ganesh",
    role: "Founder",
    institution: "NIMHANS, Bengaluru & Yale University",
    bio: "Driven by the belief that our minds deserve a profound understanding, sees the Manosuraksha foundation as a unifying force for diverse stakeholders. With a rich background in esteemed research institutes like NIMHANS, Bengaluru, and Yale University in the US, Dr. Ganesh envisions this platform as a catalyst for accelerating our comprehension of mental illnesses. His goal is to contribute significantly to the development of innovative strategies for the prevention and healing of what could be the most significant burden on humanity in the 21st century.",
    color: "#5b7a5e",
    gradient: "linear-gradient(135deg, #5b7a5e, #7a9a7d)",
    photo: "/images/foundation/dr-suhas.jpg" as string | null,
    initials: "SG",
  },
  {
    name: "Dr. Rakshathi Basavaraju",
    role: "Director & Psychiatrist",
    institution: "BMCRI, NIMHANS | Harvard & Columbia Universities",
    bio: "An accomplished psychiatrist trained at Bangalore Medical College and Research Institute (BMCRI) and National Institute of Mental Health and Neurosciences (NIMHANS). With additional research expertise gained at Harvard and Columbia Universities, USA, she passionately integrates holistic clinical care with cutting-edge research. Driven by a commitment to advancing mental health care and a burning quest to answer some of the most challenging questions in psychiatry, she emphasizes the pivotal role of high-impact translational research in continuous evolution of the field of Psychiatry. Dedicated to mentoring the next generation, she channels her passion through the Manosuraksha Foundation, aiming to make impactful strides in mental health research and education.",
    color: "#c4956a",
    gradient: "linear-gradient(135deg, #c4956a, #dbb894)",
    photo: "/images/foundation/dr-rakshathi.jpg" as string | null,
    initials: "RB",
  },
  {
    name: "Dr. Dhruva Ithal",
    role: "Neuromodulation Expert",
    institution: "MD & PhD in Psychiatry | Bharatanatyam Vidwan",
    bio: "Our multidimensional expert, brings a unique blend of artistry and science to the realm of mental health. As a Vidwan in Bharatanatyam and a MD and PhD in psychiatry with a focus on neuromodulation. With a firm belief in the delicate balance of our best selves, rooted in the right and branching out to the left halves of our brain, symbolized by the foundation's logo, he is dedicated to integrating these diverse domains to enhance education and research in mental health—the bedrock of Manosuraksha Foundation.",
    color: "#6b8b8b",
    gradient: "linear-gradient(135deg, #6b8b8b, #8aabab)",
    photo: "/images/foundation/dr-dhruva.jpg" as string | null,
    initials: "DI",
  },
];

export default function FoundationPage() {
  return (
    <PageTransition>
      <PageHero
        title="Manosuraksha Mental Health Foundation"
        subtitle="Uniting researchers, clinicians, patients, caregivers, and benefactors — illuminating progress through transformative education, research, and compassionate action."
        breadcrumb="Foundation"
      />

      {/* The Canvas of India's Mental Health Needs */}
      <section style={{ backgroundColor: "#fdf8f2", padding: "100px 60px" }} className="max-sm:!px-4 max-sm:!py-[60px]">
        <div className="max-w-[1280px] mx-auto">
          <MotionWrapper variant="fadeInUp">
            <div className="text-center mb-16">
              <span
                className="inline-flex items-center rounded-full mb-4"
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
                Our Focus
              </span>
              <h2
                className="font-['Libre_Baskerville',serif] mt-2 max-sm:!text-[26px]"
                style={{ fontSize: 36, color: "#3d5a40" }}
              >
                The Canvas of India&apos;s Mental Health Needs
              </h2>
            </div>
          </MotionWrapper>

          {/* Featured first card + two side-by-side */}
          <div className="flex flex-col gap-8">
            {/* First card — full width featured */}
            <MotionWrapper variant="fadeInUp">
              <div
                className="rounded-[28px] overflow-hidden"
                style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.05)" }}
              >
                <div className="flex flex-col md:flex-row">
                  <div
                    className="md:w-[45%] flex-shrink-0 relative flex items-center justify-center p-12 max-sm:p-8"
                    style={{ background: "linear-gradient(135deg, #3d5a40, #5b7a5e)", minHeight: 240 }}
                  >
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5" style={{ transform: "translate(30%, -30%)" }} />
                    <div className="relative text-center">
                      <div
                        className="font-['Libre_Baskerville',serif] text-white/10 select-none"
                        style={{ fontSize: 100, fontWeight: 700, lineHeight: 1 }}
                      >
                        01
                      </div>
                      <h3
                        className="font-['Libre_Baskerville',serif] text-white mt-[-20px] relative z-10"
                        style={{ fontSize: 24, fontWeight: 700 }}
                      >
                        {canvasPoints[0].title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex-1 bg-white p-10 max-sm:p-7 flex items-center">
                    <p className="text-justify" style={{ fontSize: 16, color: "#7a7470", lineHeight: 1.95 }}>
                      {canvasPoints[0].description}
                    </p>
                  </div>
                </div>
              </div>
            </MotionWrapper>

            {/* Two cards side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {canvasPoints.slice(1).map((point, i) => (
                <MotionWrapper key={point.title} variant="fadeInUp" delay={(i + 1) * 0.12}>
                  <div
                    className="bg-white rounded-[28px] h-full flex flex-col overflow-hidden hover:-translate-y-1 transition-transform duration-300"
                    style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.05)" }}
                  >
                    {/* Colored header strip */}
                    <div
                      className="relative p-8 pb-6"
                      style={{ background: `linear-gradient(135deg, ${point.color}, ${point.color}dd)` }}
                    >
                      <div
                        className="font-['Libre_Baskerville',serif] absolute top-4 right-6 text-white/10 select-none"
                        style={{ fontSize: 72, fontWeight: 700, lineHeight: 1 }}
                      >
                        {point.num}
                      </div>
                      <h3
                        className="font-['Libre_Baskerville',serif] text-white relative z-10"
                        style={{ fontSize: 20, fontWeight: 700 }}
                      >
                        {point.title}
                      </h3>
                    </div>
                    {/* Body */}
                    <div className="p-8 pt-6 flex-1">
                      <p className="text-justify" style={{ fontSize: 15, color: "#7a7470", lineHeight: 1.9 }}>
                        {point.description}
                      </p>
                    </div>
                  </div>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision and Philanthropic Mission */}
      <section style={{ backgroundColor: "#f5efe5", padding: "100px 60px" }} className="max-sm:!px-4 max-sm:!py-[60px]">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <MotionWrapper variant="fadeInLeft">
              <div className="relative">
                <div
                  className="rounded-[28px] overflow-hidden"
                  style={{ boxShadow: "0 24px 64px rgba(61,90,64,0.18)" }}
                >
                  <Image
                    src="/images/foundation/brain-chalk.jpg"
                    alt="Brain concept illustration representing mental health research"
                    width={700}
                    height={520}
                    className="w-full h-auto object-cover"
                  />
                </div>
                {/* Floating badge */}
                <div
                  className="absolute -bottom-6 -right-6 rounded-2xl p-5 flex items-center gap-3 max-sm:hidden"
                  style={{
                    background: "linear-gradient(135deg, #3d5a40, #5b7a5e)",
                    boxShadow: "0 12px 32px rgba(61,90,64,0.3)",
                  }}
                >
                  <Heart className="w-5 h-5 text-[#dbb894] fill-[#dbb894] flex-shrink-0" />
                  <div>
                    <p style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>Philanthropy</p>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>Meets Purpose</p>
                  </div>
                </div>
              </div>
            </MotionWrapper>

            {/* Text */}
            <MotionWrapper variant="fadeInRight">
              <span
                className="inline-flex items-center rounded-full mb-4"
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
                Our Vision
              </span>
              <h2
                className="font-['Libre_Baskerville',serif] mb-10 max-sm:!text-[26px]"
                style={{ fontSize: 34, color: "#3d5a40", lineHeight: 1.35 }}
              >
                Our Vision and Philanthropic Mission
              </h2>
              <div className="flex flex-col gap-7">
                {visionPoints.map((point, i) => (
                  <div key={point.title} className="flex gap-4">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5"
                      style={{ background: point.color }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <h3
                        className="font-['Libre_Baskerville',serif] mb-1.5"
                        style={{ fontSize: 17, color: "#3a3530", fontWeight: 700 }}
                      >
                        {point.title}
                      </h3>
                      <p className="text-justify" style={{ fontSize: 14.5, color: "#7a7470", lineHeight: 1.85 }}>
                        {point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </MotionWrapper>

          </div>
        </div>
      </section>

      {/* Founder & Leadership */}
      <section style={{ backgroundColor: "#fdf8f2", padding: "100px 60px" }} className="max-sm:!px-4 max-sm:!py-[60px]">
        <div className="max-w-[1100px] mx-auto">
          <MotionWrapper variant="fadeInUp">
            <div className="text-center mb-16">
              <span
                className="inline-flex items-center rounded-full mb-4"
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
                Leadership
              </span>
              <h2
                className="font-['Libre_Baskerville',serif] mt-2 max-sm:!text-[26px]"
                style={{ fontSize: 36, color: "#3d5a40" }}
              >
                Founder &amp; Leadership
              </h2>
            </div>
          </MotionWrapper>

          <div className="flex flex-col gap-10">
            {leaders.map((leader, i) => {
              const isEven = i % 2 === 1;
              return (
                <MotionWrapper key={leader.name} variant={isEven ? "fadeInRight" : "fadeInLeft"}>
                  <div
                    className="rounded-[28px] overflow-hidden"
                    style={{
                      boxShadow: "0 8px 40px rgba(0,0,0,0.07)",
                      border: "1px solid rgba(0,0,0,0.05)",
                      background: "#fff",
                    }}
                  >
                    <div className={`flex flex-col md:flex-row ${isEven ? "md:flex-row-reverse" : ""}`}>

                      {/* Photo */}
                      <div
                        className="md:w-[300px] lg:w-[340px] flex-shrink-0 relative"
                        style={{ minHeight: 340 }}
                      >
                        {leader.photo ? (
                          <Image
                            src={leader.photo}
                            alt={leader.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 340px"
                            className="object-cover object-center"
                          />
                        ) : (
                          <div
                            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                            style={{ background: leader.gradient }}
                          >
                            <span
                              className="font-['Libre_Baskerville',serif] text-white font-bold"
                              style={{ fontSize: 52 }}
                            >
                              {leader.initials}
                            </span>
                            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>
                              {leader.role}
                            </span>
                          </div>
                        )}
                        {/* accent bar */}
                        <div
                          className={`absolute top-0 bottom-0 w-1 ${isEven ? "right-0" : "left-0"}`}
                          style={{ background: leader.gradient }}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
                        <div
                          className="inline-flex items-center rounded-full self-start mb-4"
                          style={{
                            backgroundColor: `${leader.color}12`,
                            color: leader.color,
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: 1.5,
                            padding: "5px 14px",
                          }}
                        >
                          {leader.role}
                        </div>
                        <h3
                          className="font-['Libre_Baskerville',serif]"
                          style={{ fontSize: 26, color: "#3a3530", fontWeight: 700, lineHeight: 1.2 }}
                        >
                          {leader.name}
                        </h3>
                        <p style={{ fontSize: 13, color: "#7a7470", marginTop: 4, marginBottom: 20 }}>
                          {leader.institution}
                        </p>
                        <div
                          style={{ width: 36, height: 2, borderRadius: 1, background: leader.color, marginBottom: 20 }}
                        />
                        <p
                          className="text-justify"
                          style={{ fontSize: 15, color: "#7a7470", lineHeight: 1.9 }}
                        >
                          {leader.bio}
                        </p>
                      </div>

                    </div>
                  </div>
                </MotionWrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{ padding: "100px 60px" }}
        className="max-sm:!px-4 max-sm:!py-[60px] relative overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #3d5a40 0%, #5b7a5e 50%, #6b8b8b 100%)" }}
        />
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white/5" />

        <div className="relative max-w-[800px] mx-auto text-center">
          <MotionWrapper variant="fadeInUp">
            <h2
              className="font-['Libre_Baskerville',serif] text-white mb-5 max-sm:!text-[26px]"
              style={{ fontSize: 36, lineHeight: 1.3 }}
            >
              Join Us in Making a Difference
            </h2>
            <p
              className="text-white/80 mb-10 mx-auto"
              style={{ fontSize: 17, lineHeight: 1.8, maxWidth: 560 }}
            >
              Whether you are a researcher, clinician, benefactor, or someone who cares about mental health —
              there is a place for you in this mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full text-white font-[700] text-[14px] px-8 py-4 hover:-translate-y-0.5 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #c4956a, #dbb894)",
                  boxShadow: "0 4px 20px rgba(196,149,106,0.4)",
                }}
              >
                Get Involved
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-full font-[700] text-[14px] px-8 py-4 hover:-translate-y-0.5 transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  color: "#ffffff",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  backdropFilter: "blur(8px)",
                }}
              >
                Learn About Us
              </Link>
            </div>
          </MotionWrapper>
        </div>
      </section>

    </PageTransition>
  );
}
