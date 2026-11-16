"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps } from "react";

type RevealProps = ComponentProps<typeof motion.div> & {
  delay?: number;
};

export default function Reveal({ children, delay = 0, ...props }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
