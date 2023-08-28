"use client";

import React from "react";

import { HoneyChart } from "./honey-chart";

export default function Graph({
  arcade,
  hourlySupply,
  hourlyVolume,
  weeklyVolume,
  weeklySupply,
  monthlyVolume,
  monthlySupply,
  quarterlyVolume,
  quarterlySupply,
}: {
  arcade: boolean;
  hourlySupply: number[];
  hourlyVolume: number[];

  weeklyVolume: number[];
  weeklySupply: number[];
  monthlyVolume: number[];
  monthlySupply: number[];
  quarterlyVolume: number[];
  quarterlySupply: number[];
}) {
  console.log(weeklyVolume, weeklySupply);
  return (
    <HoneyChart
      arcade={arcade}
      hourlySupply={hourlySupply ?? []}
      hourlyVolume={hourlyVolume ?? []}
      weeklyVolume={weeklyVolume ?? []}
      weeklyFees={weeklySupply ?? []}
      monthlyVolume={monthlyVolume ?? []}
      monthlyFees={monthlySupply ?? []}
      quarterlyVolume={quarterlyVolume ?? []}
      quarterlyFees={quarterlySupply ?? []}
      weeklyVolumeTotal={weeklyVolume.reduce((a, b) => a + b, 0) ?? 0}
      weeklyFeesTotal={weeklySupply.reduce((a, b) => a + b, 0) ?? 0}
      monthlyVolumeTotal={monthlyVolume.reduce((a, b) => a + b, 0) ?? 0}
      monthlyFeesTotal={monthlySupply.reduce((a, b) => a + b, 0) ?? 0}
      quarterlyVolumeTotal={quarterlyVolume.reduce((a, b) => a + b, 0) ?? 0}
      quarterlyFeesTotal={quarterlySupply.reduce((a, b) => a + b, 0) ?? 0}
    />
  );
}
