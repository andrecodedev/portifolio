import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type FadeInProps = {
  children: ReactNode;
  duration?: number;
  delay?: number;
  y?: number;
  scale?: number;
  blur?: number;
  direction?: 'up' | 'down' | 'none';
  className?: string;
  amount?: "some" | "all" | number;
};

export default function FadeIn({
  children,
  duration = 650,
  delay = 0,
  y = 24,
  scale = 0.97,
  blur = 5,
  direction = 'up',
  className = "w-full",
  amount = 0.05
}: FadeInProps) {
  const initialY = direction === 'up' ? y : direction === 'down' ? -y : 0;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: initialY,
        scale: scale,
        filter: blur > 0 ? `blur(${blur}px)` : 'none'
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)'
      }}
      viewport={{ once: true, amount: amount, margin: "0px 0px 250px 0px" }}
      transition={{
        duration: duration / 1000,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
