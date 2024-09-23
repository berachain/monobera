"use client";

import { MutableRefObject, useEffect, useRef } from "react";

export const useInterval = (
  callback: () => void,
  interval: number,
): MutableRefObject<() => void> => {
  const cleanRef = useRef(() => {});

  useEffect(() => {
    const id = setInterval(callback, interval);

    cleanRef.current = () => clearInterval(id);

    return () => cleanRef.current();
  }, [callback]);

  return cleanRef;
};
