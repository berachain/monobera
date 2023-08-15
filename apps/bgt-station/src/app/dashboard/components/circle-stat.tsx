"use client";

import React, { useEffect, useRef } from "react";

export function CircleStat({
  label,
  value,
  // valueLabel,
  percent,
}: {
  label: string;
  value: string;
  valueLabel: string;
  percent: number;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.transform = `rotate(${45 + percent * 1.8}deg)`;
    }
  }, [percent]);
  return (
    <div className="relative h-[90px] sm:h-[107px]">
      <div className="relative mb-[-60px] h-[45px] w-[90px] overflow-hidden sm:h-[77px] sm:w-[154px]">
        <div className="absolute top-6 w-full text-center text-sm font-semibold leading-7 sm:top-12 sm:text-xl">
          {value}
        </div>
        <div
          ref={barRef}
          className="absolute left-0 top-0 box-border h-[90px] w-[90px] rounded-full border-8 border-[#FBBF24] border-b-[border] border-r-border sm:h-[154px] sm:w-[154px]"
        />
      </div>
      <div className="absolute bottom-0 w-full text-center text-xs font-medium leading-tight text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
