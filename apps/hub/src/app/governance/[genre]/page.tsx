import React from "react";
import { notFound } from "next/navigation";

import {
  GOVERNANCE_GENRES,
  PROPOSAL_GENRE,
  getDappByGenre,
  isValidGenre,
} from "../governance-genre-helper";
import GovernanceByStatus from "./components/governance-by-status";
import { governorAddress } from "@bera/config";

export default function Page({
  params,
}: {
  params: { genre: PROPOSAL_GENRE };
}) {
  if (!isValidGenre(params.genre)) return notFound();

  return (
    <GovernanceByStatus
      governorAddress={governorAddress}
      dapp={getDappByGenre(params.genre)!}
    />
  );
}

export async function generateStaticParams() {
  return GOVERNANCE_GENRES.map((genre) => ({
    genre,
  }));
}
