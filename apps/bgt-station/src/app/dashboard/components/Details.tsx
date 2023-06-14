"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@bera/ui/card";

import { type bgtDetails } from "../constants";
import { CurrentSupply } from "./CurrentSupply";
import { CuttingBoard } from "./CuttingBoard";
import { EpochTimeline } from "./EpochTimeline";
import { Stats } from "./Stats";
import { Supply } from "./Supply";

export function Details({ details }: { details: typeof bgtDetails }) {
  return (
    <div className="mb-10 flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <EpochTimeline />
      </div>
      {/* <Validators validators={details.validators} /> */}
      <CuttingBoard />
      <Stats stats={details.stats} />
      <div className="flex gap-5">
        <div className="flex-1">
          <Supply />
        </div>
        <div className="flex flex-1 flex-col gap-5">
          <Card>
            <CardHeader>
              <h3 className="text-md font-semibold text-backgroundSecondary">
                Supply change
              </h3>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <h4 className="text-2xl font-medium">
                  {details.supplyChange.change}
                </h4>
                <div>
                  <p className="text-right text-sm text-backgroundSecondary">
                    {details.supplyChange.bgtStaked} BGT staked
                  </p>
                  <p className="text-right text-sm text-backgroundSecondary">
                    {details.supplyChange.bgtIssued} BGT issued
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <CurrentSupply />
        </div>
      </div>
    </div>
  );
}
