"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Stethoscope } from "lucide-react";

const floatStyle = `
  @keyframes fabFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`;

export const FoundationFab = () => {
  const pathname = usePathname();

  if (pathname === "/foundation") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5, type: "spring", bounce: 0.4 }}
        className="fixed right-4 sm:right-6 z-[999]"
        style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
      >
        <style dangerouslySetInnerHTML={{ __html: floatStyle }} />
        <Link href="/">
          <div
            className="relative flex items-center justify-center cursor-pointer w-[88px] h-[88px] sm:w-[120px] sm:h-[120px]"
            style={{
              borderRadius: "50%",
              background: "linear-gradient(135deg, #c4956a, #dbb894)",
              boxShadow: "0 8px 28px rgba(196,149,106,0.4)",
              animation: "fabFloat 3s ease-in-out infinite",
              transition: "box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 12px 36px rgba(196,149,106,0.5)";
              e.currentTarget.style.animationPlayState = "paused";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(196,149,106,0.4)";
              e.currentTarget.style.animationPlayState = "running";
            }}
          >
            <div className="absolute inset-[5px] sm:inset-[7px]" style={{ borderRadius: "50%", border: "1px solid rgba(255,255,255,0.25)" }} />
            <div className="flex flex-col items-center justify-center gap-1 z-10 px-2 text-center">
              <Stethoscope className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              <span className="text-white leading-[1.2]" style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 9, fontWeight: 700, fontStyle: "italic", letterSpacing: 0.3 }}>
                Clinical
              </span>
              <div style={{ width: 18, height: 1, background: "rgba(255,255,255,0.4)", borderRadius: 1 }} />
              <span style={{ fontSize: 7, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: "rgba(255,255,255,0.8)" }}>
                Services
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5, type: "spring", bounce: 0.4 }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[999]"
    >
      <style dangerouslySetInnerHTML={{ __html: floatStyle }} />
      <Link href="/foundation">
        <div
          className="relative flex items-center justify-center cursor-pointer w-[88px] h-[88px] sm:w-[120px] sm:h-[120px]"
          style={{
            borderRadius: "50%",
            background: "linear-gradient(135deg, #3d5a40, #5b7a5e)",
            boxShadow: "0 8px 28px rgba(61,90,64,0.4)",
            animation: "fabFloat 3s ease-in-out infinite",
            transition: "box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 12px 36px rgba(61,90,64,0.5)";
            e.currentTarget.style.animationPlayState = "paused";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 8px 28px rgba(61,90,64,0.4)";
            e.currentTarget.style.animationPlayState = "running";
          }}
        >
          <div className="absolute inset-[5px] sm:inset-[7px]" style={{ borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)" }} />
          <div className="flex flex-col items-center justify-center gap-1 z-10 px-2 text-center">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#dbb894] fill-[#dbb894]" />
            <span className="text-white leading-[1.2]" style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 10, fontWeight: 700, fontStyle: "italic", letterSpacing: 0.3 }}>
              Manosuraksha
            </span>
            <div style={{ width: 18, height: 1, background: "rgba(219,184,148,0.7)", borderRadius: 1 }} />
            <span style={{ fontSize: 7, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
              Foundation
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
