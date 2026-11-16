"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollTelemetry() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="telemetry-bar"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
