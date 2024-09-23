"use client";
import { useEffect } from "react";

export const useOnResize = (cb: () => void) => {
  useEffect(() => {
    window.addEventListener("resize", cb);
    return () => window.removeEventListener("resize", cb);
  }, [cb]);
};
