"use client";

import React from "react";
import { notFound } from "next/navigation";

import { PROPOSAL_GENRE } from "../types";
import GovernanceByStatus from "./components/governance-by-status";

export default function Page({
  params,
}: {
  params: { genre: PROPOSAL_GENRE };
}) {
  if (!["berahub", "honey", "bend", "berps", "general"].includes(params.genre))
    return notFound();

  return <GovernanceByStatus genre={params.genre} />;
}
