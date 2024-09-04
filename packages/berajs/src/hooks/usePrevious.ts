import { useEffect, useRef } from "react";

/**
 * Returns the previous value of a variable before the render
 * @param value - the value to return the previous value for
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
