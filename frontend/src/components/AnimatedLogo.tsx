"use client";

import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

export default function AnimatedLogo() {
  const glowControls = useAnimation();

  useEffect(() => {
    // Continuous glow pulse
    glowControls.start({
      boxShadow: [
        "0 0 8px 2px rgba(139,92,246,0.3)",
        "0 0 20px 6px rgba(139,92,246,0.6)",
        "0 0 8px 2px rgba(139,92,246,0.3)",
      ],
      transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
    });
  }, [glowControls]);

  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      {/* Logo Image with animations */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, duration: 0.6 }}
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.92 }}
      >
        {/* Floating animation wrapper */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Glow ring */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            animate={glowControls}
          />
          <img
            src="/logo.png"
            alt="CampusEsoul"
            className="w-9 h-9 rounded-xl object-cover relative z-10"
          />
        </motion.div>

        {/* Sparkle particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-brand-violet"
            style={{
              top: i === 0 ? "-4px" : i === 1 ? "2px" : "-2px",
              right: i === 0 ? "-4px" : i === 1 ? "-6px" : "10px",
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Brand text with shimmer */}
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Main text */}
        <motion.span
          className="text-xl font-bold relative inline-block"
          style={{
            background: "linear-gradient(90deg, #6366f1, #a855f7, #6366f1)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          animate={{
            backgroundPosition: ["0% center", "200% center"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          whileHover={{ scale: 1.04 }}
        >
          Campus
          <motion.span
            style={{
              background: "linear-gradient(90deg, #f59e0b, #a855f7, #f59e0b)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            animate={{
              backgroundPosition: ["0% center", "200% center"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: 0.5,
            }}
          >
            Esoul
          </motion.span>
        </motion.span>

        {/* Shimmer overlay sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
        />
      </motion.div>
    </Link>
  );
}
