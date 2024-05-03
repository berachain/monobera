"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

// import { translateInViewVariant } from "./Transition";
const translateInViewVariant = {
  initial: {
    opacity: 0,
    y: 90,
    // height: '10px'
  },
  whileInview: {
    opacity: 1,
    y: 0,
    // height: 'auto',
  },
};

interface ComponentTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

const ComponentTransition: React.FC<ComponentTransitionProps> = ({
  children,
  className,
  delay,
  onClick,
}) => {
  return (
    <motion.div
      initial="initial"
      whileInView="whileInview"
      variants={translateInViewVariant}
      transition={{
        delay: delay,
        ease: [0.2, 0.65, 0.3, 0.9],
        duration: 1,
      }}
      className={className}
      viewport={{ once: true }}
      onClick={() => onClick?.()}
    >
      {children}
    </motion.div>
  );
};

export default ComponentTransition;
