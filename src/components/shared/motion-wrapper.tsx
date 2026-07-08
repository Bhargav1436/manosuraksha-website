"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimationVariant = "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scaleIn";

interface MotionWrapperProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  className?: string;
}

const animations = {
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
} as const;

export const MotionWrapper = ({
  children,
  variant = "fadeInUp",
  delay = 0,
  className,
}: MotionWrapperProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      variants={animations[variant]}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};
