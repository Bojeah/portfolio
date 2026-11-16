"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps } from "react";

type AnimatedProjectProps = ComponentProps<typeof motion.li> & {
  delay?: number;
};

export default function AnimatedProject({ children, delay = 0, ...props }: AnimatedProjectProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.li
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.li>
  );
}
