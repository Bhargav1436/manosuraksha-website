"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    image: "/images/hero/slide-1.jpg",
    text: "Your mind has a story to tell. Sometimes, we just need to tune in. Let\u2019s listen to the story together!",
    cta: { label: "I Want To Recognize The Signs", href: "/programs" },
  },
  {
    image: "/images/hero/slide-2.jpg",
    text: "Remember the first time you admitted, \u2018I Need Help!\u2019 \u2014 It\u2019s a powerful moment. Let\u2019s revisit that strength together.",
    cta: { label: "I Want To Embrace My Truth", href: "/book-appointment" },
  },
  {
    image: "/images/hero/slide-3.jpg",
    text: "Think back to a time when you felt the pure joy of being \u2018YOU.\u2019 You can feel that way again.",
    cta: { label: "I Want To Elevate Myself", href: "/contact" },
  },
];

const textVariants = {
  enter: { opacity: 0, y: 30 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

export const Hero = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full h-[85vh] min-h-[500px] max-h-[750px] overflow-hidden max-sm:h-[70vh] max-sm:min-h-[400px]">
      {/* Background images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            current === index ? "opacity-100 z-[1]" : "opacity-0 z-0"
          )}
        >
          <Image
            src={slide.image}
            alt={`Slide ${index + 1}`}
            fill
            className="object-cover"
            sizes="100vw"
            priority={index === 0}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/35 to-black/55" />
        </div>
      ))}

      {/* Floating bubbles */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none" aria-hidden="true">
        {[
          { size: 10, left: "8%", delay: 0, duration: 6, color: "#c4956a" },
          { size: 8, left: "18%", delay: 1.2, duration: 5, color: "#dbb894" },
          { size: 12, left: "30%", delay: 2.5, duration: 7, color: "#7a9a7d" },
          { size: 14, left: "42%", delay: 1.8, duration: 8, color: "#c4956a" },
          { size: 9, left: "54%", delay: 3, duration: 6, color: "#ffffff" },
          { size: 11, left: "65%", delay: 0.8, duration: 7, color: "#dbb894" },
          { size: 7, left: "76%", delay: 2.8, duration: 5.5, color: "#7a9a7d" },
          { size: 10, left: "86%", delay: 1.5, duration: 6.5, color: "#c4956a" },
          { size: 8, left: "95%", delay: 4, duration: 5.5, color: "#ffffff" },
          { size: 7, left: "3%", delay: 3, duration: 5, color: "#dbb894" },
        ].map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: bubble.left,
              bottom: -10,
              backgroundColor: bubble.color,
            }}
            animate={{
              y: [0, -500],
              x: [0, Math.sin(i) * 25, 0],
              opacity: [0, 0.3, 0.25, 0],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Text content — centered */}
      <div className="relative z-[2] h-full flex items-center justify-center">
        <div className="text-center px-6 max-w-[850px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h1
                className={cn(
                  "font-serif font-bold text-white leading-snug",
                  "text-[24px] sm:text-[30px] lg:text-[36px]"
                )}
                style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
              >
                {slides[current].text}
              </h1>

              <Link
                href={slides[current].cta.href}
                className={cn(
                  "inline-block mt-8 px-8 py-3.5 rounded-full",
                  "bg-gradient-to-r from-[#c4956a] to-[#dbb894]",
                  "text-white text-[15px] font-[700]",
                  "shadow-[0_4px_20px_rgba(196,149,106,0.4)]",
                  "hover:shadow-[0_6px_30px_rgba(196,149,106,0.55)]",
                  "hover:scale-[1.03] active:scale-[0.98]",
                  "transition-all duration-300"
                )}
              >
                {slides[current].cta.label}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Left arrow */}
      <button
        onClick={prev}
        className={cn(
          "absolute left-5 top-1/2 -translate-y-1/2 z-[3]",
          "flex items-center justify-center w-[48px] h-[48px] rounded-full",
          "bg-white/10 text-white backdrop-blur-md",
          "hover:bg-[#c4956a]/70 hover:scale-110",
          "transition-all duration-300",
          "max-sm:w-[38px] max-sm:h-[38px] max-sm:left-3"
        )}
        style={{ border: "1px solid rgba(255,255,255,0.15)" }}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 max-sm:w-4 max-sm:h-4" />
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        className={cn(
          "absolute right-5 top-1/2 -translate-y-1/2 z-[3]",
          "flex items-center justify-center w-[48px] h-[48px] rounded-full",
          "bg-white/10 text-white backdrop-blur-md",
          "hover:bg-[#c4956a]/70 hover:scale-110",
          "transition-all duration-300",
          "max-sm:w-[38px] max-sm:h-[38px] max-sm:right-3"
        )}
        style={{ border: "1px solid rgba(255,255,255,0.15)" }}
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 max-sm:w-4 max-sm:h-4" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[3] flex items-center gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={cn(
              "rounded-full transition-all duration-400",
              current === index
                ? "w-8 h-2.5 bg-gradient-to-r from-[#c4956a] to-[#dbb894]"
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
