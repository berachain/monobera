"use client";

import React from "react";

import { type HoneyEntry } from "~/app/page";
import { HoneyChart } from "./honey-chart";

export default function Graph({
  hourlySupply,
  hourlyVolume,
}: {
  hourlySupply: HoneyEntry[];
  hourlyVolume: HoneyEntry[];
}) {
  const honey = {} as any;
  return (
    <HoneyChart
      hourlySupply={hourlySupply ?? []}
      hourlyVolume={hourlyVolume ?? []}
      weeklyVolume={honey.weeklyVolume ?? []}
      weeklyFees={honey.weeklyFees ?? []}
      weeklyVolumeTotal={honey.weeklyVolumeTotal ?? 0}
      monthlyVolume={honey.monthlyVolume ?? []}
      monthlyFees={honey.monthlyFees ?? []}
      monthlyVolumeTotal={honey.monthlyVolumeTotal ?? 0}
      quarterlyVolume={honey.quarterlyVolume ?? []}
      quarterlyFees={honey.quarterlyFees ?? []}
      quarterlyVolumeTotal={honey.quarterlyVolumeTotal ?? 0}
      weeklyFeesTotal={honey.weeklyFeesTotal ?? 0}
      monthlyFeesTotal={honey.monthlyFeesTotal ?? 0}
      quarterlyFeesTotal={honey.quarterlyFeesTotal ?? 0}
    />
  );
}
