"use client";

import { useEffect, useState } from "react";

// Define your breakpoints
export enum BREAKPOINTS {
  xs = 0,
  sm = 576,
  md = 768,
  lg = 992,
  xl = 1200,
}

export const useBreakpoint = () => {
  // Helper function to get current breakpoint
  const getBreakpoint = (windowWidth: number) => {
    let result = BREAKPOINTS.xl;
    if (windowWidth < BREAKPOINTS.sm) result = BREAKPOINTS.xs;
    else if (windowWidth >= BREAKPOINTS.sm && windowWidth < BREAKPOINTS.md)
      result = BREAKPOINTS.sm;
    else if (windowWidth >= BREAKPOINTS.md && windowWidth < BREAKPOINTS.lg)
      result = BREAKPOINTS.md;
    else if (windowWidth >= BREAKPOINTS.lg && windowWidth < BREAKPOINTS.xl)
      result = BREAKPOINTS.lg;
    return result;
  };

  // State to store the current breakpoint
  const [breakpoint, setBreakpoint] = useState(() =>
    getBreakpoint(window.innerWidth),
  );

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
};
