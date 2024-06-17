"use client";

import React, { useState } from "react";
import { cn } from "@bera/ui";
import { motion } from "framer-motion";

export const WobbleCard = ({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, width: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width) / 2) / 20;
    const y = (clientY - (rect.top + rect.height) / 2) / 20;
    setMousePosition({ x, y, width: rect.width });
  };
  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0, width: 0 });
      }}
      className={cn(
        "relative mx-auto w-full  overflow-hidden bg-transparent",
        containerClassName,
      )}
    >
      <div
        className="relative  h-full overflow-hidden"
        style={{
          boxShadow:
            "0 10px 32px rgba(34, 42, 53, 0.12), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.05), 0 4px 6px rgba(34, 42, 53, 0.08), 0 24px 108px rgba(47, 48, 55, 0.10)",
        }}
      >
        <motion.div
          style={{
            transform: isHovering
              ? `translate(-${Math.abs(
                  mousePosition.x + mousePosition.width / 15,
                )}px, -${Math.abs(mousePosition.y + 5)}px) scale(1.3, 1.3)`
              : "translate(0px, 0px) scale(1, 1)",
            transition: "transform 0.1s ease-out",
          }}
          className={cn("h-full px-4", className)}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
};
