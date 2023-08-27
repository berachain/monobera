"use client";

import React from "react";
import { formatUnits } from "viem";

import { type HoneyEntry } from "~/app/type";
import { honey } from "~/config/tokens";
import { HoneyChart } from "./honey-chart";

export default function Graph({
  arcade,
  hourlySupply,
  hourlyVolume,
  weeklyVolume,
  // weeklySupply,
  monthlyVolume,
  // monthlySupply,
  quarterlyVolume,
}: // quarterlySupply,
{
  arcade: boolean;
  hourlySupply: HoneyEntry[];
  hourlyVolume: HoneyEntry[];
  weeklyVolume: HoneyEntry[];
  weeklySupply: HoneyEntry[];
  monthlyVolume: HoneyEntry[];
  monthlySupply: HoneyEntry[];
  quarterlyVolume: HoneyEntry[];
  quarterlySupply: HoneyEntry[];
}) {
  return (
    <HoneyChart
      arcade={arcade}
      hourlySupply={hourlySupply ?? []}
      hourlyVolume={hourlyVolume ?? []}
      weeklyVolume={
        weeklyVolume.map((honeyEntry) =>
          Number(formatUnits(BigInt(honeyEntry.amount), honey.decimals)),
        ) ?? []
      }
      weeklyFees={
        weeklyVolume.map(
          (honeyEntry) =>
            Number(formatUnits(BigInt(honeyEntry.amount), honey.decimals)) *
            0.01,
        ) ?? []
      }
      monthlyVolume={
        monthlyVolume.map((honeyEntry) =>
          Number(formatUnits(BigInt(honeyEntry.amount), honey.decimals)),
        ) ?? []
      }
      monthlyFees={
        monthlyVolume.map(
          (honeyEntry) =>
            Number(formatUnits(BigInt(honeyEntry.amount), honey.decimals)) *
            0.01,
        ) ?? []
      }
      quarterlyVolume={
        quarterlyVolume.map((honeyEntry) =>
          Number(formatUnits(BigInt(honeyEntry.amount), honey.decimals)),
        ) ?? []
      }
      quarterlyFees={
        quarterlyVolume.map(
          (honeyEntry) =>
            Number(formatUnits(BigInt(honeyEntry.amount), honey.decimals)) *
            0.01,
        ) ?? []
      }
      weeklyVolumeTotal={
        weeklyVolume.reduce(
          (a, b) => a + Number(formatUnits(BigInt(b.amount), honey.decimals)),
          0,
        ) ?? 0
      }
      weeklyFeesTotal={
        weeklyVolume.reduce(
          (a, b) =>
            a + Number(formatUnits(BigInt(b.amount), honey.decimals)) * 0.01,
          0,
        ) ?? 0
      }
      monthlyVolumeTotal={
        monthlyVolume.reduce(
          (a, b) => a + Number(formatUnits(BigInt(b.amount), honey.decimals)),
          0,
        ) ?? 0
      }
      monthlyFeesTotal={
        monthlyVolume.reduce(
          (a, b) =>
            a + Number(formatUnits(BigInt(b.amount), honey.decimals)) * 0.01,
          0,
        ) ?? 0
      }
      quarterlyVolumeTotal={
        quarterlyVolume.reduce(
          (a, b) => a + Number(formatUnits(BigInt(b.amount), honey.decimals)),
          0,
        ) ?? 0
      }
      quarterlyFeesTotal={
        quarterlyVolume.reduce(
          (a, b) =>
            a + Number(formatUnits(BigInt(b.amount), honey.decimals)) * 0.01,
          0,
        ) ?? 0
      }
    />
  );
}
