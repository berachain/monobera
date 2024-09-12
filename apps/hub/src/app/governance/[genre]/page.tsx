"use client";

import React from "react";
import { notFound } from "next/navigation";

import { PROPOSAL_GENRE, getDappByGenre } from "../governance-genre-helper";
import GovernanceByStatus from "./components/governance-by-status";
import { governorAddress } from "@bera/config";

export default function Page({
  params,
}: {
  params: { genre: PROPOSAL_GENRE };
}) {
  if (!["berahub", "honey", "bend", "berps", "general"].includes(params.genre))
    return notFound();

  return (
    <GovernanceByStatus
      governorAddress={governorAddress}
      dapp={getDappByGenre(params.genre)!}
    />
  );
}
