"use client";

import Link from "next/link";
import { Home, ArrowLeft, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <section
      className="min-h-[calc(100vh-108px)] flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: "#fdf8f2" }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#5b7a5e]/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#c4956a]/5 blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-[#5b7a5e]/20" />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-[#c4956a]/20" />
        <div className="absolute bottom-1/4 right-1/4 w-4 h-4 rounded-full bg-[#5b7a5e]/10" />
      </div>

      <motion.div
        className="relative text-center px-6 py-16 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Large 404 number */}
        <motion.div
          className="relative mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span
            className="block font-['Libre_Baskerville',serif] font-bold leading-none select-none"
            style={{
              fontSize: "clamp(100px, 20vw, 180px)",
              background: "linear-gradient(135deg, #5b7a5e 0%, #c4956a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              opacity: 0.15,
            }}
          >
            404
          </span>
          {/* Overlapping leaf/mind icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #5b7a5e, #6b9b6e)",
                boxShadow: "0 8px 32px rgba(91,122,94,0.3)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-10 h-10 sm:w-12 sm:h-12"
              >
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2" />
                <path d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4" />
                <path d="M12 2v6" />
                <path d="M12 16v6" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Text */}
        <h1
          className="font-['Libre_Baskerville',serif] mb-4"
          style={{ fontSize: "clamp(24px, 4vw, 36px)", color: "#3d5a40" }}
        >
          Page Not Found
        </h1>
        <p
          className="mx-auto mb-10"
          style={{
            fontSize: 16,
            color: "#7a7470",
            lineHeight: 1.8,
            maxWidth: 420,
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Don&apos;t worry — let&apos;s help you find your way back.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white rounded-full transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #5b7a5e, #6b9b6e)",
              padding: "14px 28px",
              fontSize: 14,
              fontWeight: 700,
              boxShadow: "0 4px 15px rgba(91,122,94,0.3)",
            }}
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "white",
              color: "#5b7a5e",
              padding: "14px 28px",
              fontSize: 14,
              fontWeight: 700,
              border: "1.5px solid rgba(91,122,94,0.2)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <Phone className="w-4 h-4" />
            Contact Us
          </Link>
        </div>

        {/* Go back link */}
        <button
          onClick={() => {
            if (typeof window !== "undefined") window.history.back();
          }}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline underline-offset-4 transition-colors cursor-pointer"
          style={{ color: "#c4956a" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Go back to previous page
        </button>
      </motion.div>
    </section>
  );
}
