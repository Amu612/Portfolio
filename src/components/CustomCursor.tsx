"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Outer ring — laggy (slow follow)
  const outerX = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.8 });
  const outerY = useSpring(my, { stiffness: 80, damping: 20, mass: 0.8 });

  // Inner dot — fast (near-instant)
  const innerX = useSpring(mx, { stiffness: 500, damping: 40 });
  const innerY = useSpring(my, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setIsVisible(true);
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setIsHovered(
        !!(
          t.closest("a") ||
          t.closest("button") ||
          t.closest("[data-cursor='hover']") ||
          t.classList.contains("hover-trigger")
        )
      );
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [mx, my]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[9999]"
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Outer laggy ring */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/60 transition-[width,height,background] duration-300"
        style={{
          left: outerX,
          top: outerY,
          width: isHovered ? 60 : isClicking ? 20 : 36,
          height: isHovered ? 60 : isClicking ? 20 : 36,
          backgroundColor: isHovered ? "rgba(103,232,249,0.06)" : "transparent",
          boxShadow: isHovered ? "0 0 20px rgba(103,232,249,0.15)" : "none",
        }}
      />

      {/* Inner fast dot */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300"
        style={{
          left: innerX,
          top: innerY,
          width: isClicking ? 3 : isHovered ? 6 : 4,
          height: isClicking ? 3 : isHovered ? 6 : 4,
          boxShadow: "0 0 12px 2px rgba(103,232,249,0.8)",
        }}
      />
    </motion.div>
  );
}
