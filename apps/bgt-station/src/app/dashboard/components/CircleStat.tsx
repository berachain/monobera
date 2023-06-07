"use client";

import React, { useEffect, useRef } from "react";

export function CircleStat({
  label,
  value,
  valueLabel,
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
    <div>
      <div className="m-2 block text-center">
        <div className="relative mb-[-60px] h-[120px] w-[240px] overflow-hidden">
          <div
            ref={barRef}
            className="absolute left-0 top-0 box-border h-[240px] w-[240px] rounded-full border-8 border-muted border-b-border border-r-border"
          ></div>
        </div>
        <div>
          <p className="text-3xl font-semibold">{value}</p>
          <p className="font-medium text-backgroundSecondary">{valueLabel}</p>
        </div>
      </div>

      <div className="mt-5 text-center">
        <span className="font-medium text-backgroundSecondary">{label}</span>
      </div>
    </div>
  );
}
