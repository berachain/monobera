"use client";

import { useEffect, useRef } from "react";

/**
 * Returns the previous value of a variable before the render
 * @param {*} value - the value to return the previous value for
 */
export function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
