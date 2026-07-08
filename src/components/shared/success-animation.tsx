"use client";

import { motion } from "framer-motion";

interface SuccessAnimationProps {
  size?: number;
  color?: string;
}

export const SuccessAnimation = ({
  size = 80,
  color = "#5b7a5e",
}: SuccessAnimationProps) => {
  const circleRadius = size * 0.38;
  const center = size / 2;
  const circumference = 2 * Math.PI * circleRadius;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color, opacity: 0 }}
        animate={{ opacity: [0, 0.15, 0.08] }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* SVG circle + checkmark */}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Animated circle */}
        <motion.circle
          cx={center}
          cy={center}
          r={circleRadius}
          fill="none"
          stroke={color}
          strokeWidth={size * 0.04}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
        />

        {/* Fill circle */}
        <motion.circle
          cx={center}
          cy={center}
          r={circleRadius}
          fill={color}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ delay: 0.4, duration: 0.3, ease: "easeOut" }}
          style={{ transformOrigin: "center" }}
        />

        {/* Checkmark */}
        <motion.path
          d={`M${center * 0.65} ${center} L${center * 0.9} ${center * 1.2} L${center * 1.4} ${center * 0.7}`}
          fill="none"
          stroke={color}
          strokeWidth={size * 0.05}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
        />
      </svg>

      {/* Burst particles */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <motion.div
          key={angle}
          className="absolute rounded-full"
          style={{
            width: size * 0.05,
            height: size * 0.05,
            backgroundColor: color,
          }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{
            x: Math.cos((angle * Math.PI) / 180) * size * 0.55,
            y: Math.sin((angle * Math.PI) / 180) * size * 0.55,
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            delay: 0.5,
            duration: 0.6,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};
