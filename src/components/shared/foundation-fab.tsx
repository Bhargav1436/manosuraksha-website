"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Stethoscope, ArrowRight } from "lucide-react";

export const FoundationFab = () => {
  const pathname = usePathname();

  if (pathname === "/foundation") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5, type: "spring", bounce: 0.4 }}
        className="fixed bottom-6 right-6 z-[999]"
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes fabFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}} />
        <Link href="/">
          <div
            className="relative flex items-center justify-center cursor-pointer"
            style={{
              width: 120,
              height: 120,
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
            {/* Inner ring */}
            <div
              className="absolute"
              style={{
                inset: 7,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            />

            {/* Center content */}
            <div className="flex flex-col items-center justify-center gap-1.5 z-10 px-3 text-center">
              <Stethoscope className="w-4 h-4 text-white" />
              <span
                className="text-white leading-[1.2]"
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: 10,
                  fontWeight: 700,
                  fontStyle: "italic",
                  letterSpacing: 0.3,
                }}
              >
                Clinical
              </span>
              <div
                style={{
                  width: 24,
                  height: 1,
                  background: "rgba(255,255,255,0.4)",
                  borderRadius: 1,
                }}
              />
              <span
                style={{
                  fontSize: 8,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
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
      className="fixed bottom-6 right-6 z-[999]"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fabFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}} />
      <Link href="/foundation">
        <div
          className="relative flex items-center justify-center cursor-pointer"
          style={{
            width: 120,
            height: 120,
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
          {/* Inner ring border */}
          <div
            className="absolute"
            style={{
              inset: 7,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          />

          {/* Center content */}
          <div className="flex flex-col items-center justify-center gap-1.5 z-10 px-3 text-center">
            <Heart className="w-4 h-4 text-[#dbb894] fill-[#dbb894]" />
            <span
              className="text-white leading-[1.2]"
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: 12,
                fontWeight: 700,
                fontStyle: "italic",
                letterSpacing: 0.3,
              }}
            >
              Manosuraksha
            </span>
            <div
              style={{
                width: 24,
                height: 1,
                background: "rgba(219,184,148,0.7)",
                borderRadius: 1,
              }}
            />
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Foundation
            </span>
          </div>
        </div>
      </Link>

    </motion.div>
  );
};
