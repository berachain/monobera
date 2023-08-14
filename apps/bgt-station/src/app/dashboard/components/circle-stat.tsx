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
    <div className="relative h-[107px]">
      <div className="relative mb-[-60px] h-[77px] w-[154px] overflow-hidden">
        <div className="absolute top-12 w-full text-center text-xl font-semibold leading-7">
          {value}
        </div>
        <div
          ref={barRef}
          className="absolute left-0 top-0 box-border h-[154px] w-[154px] rounded-full border-8 border-[#FBBF24] border-b-[border] border-r-border"
        />
      </div>
      <div className="absolute bottom-0 w-full text-center text-xs font-medium leading-tight text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
