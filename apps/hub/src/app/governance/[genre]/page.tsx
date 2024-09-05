"use client";

import React from "react";
import { notFound } from "next/navigation";

import {
  NativeDapps,
  Others,
  PROPOSAL_GENRE,
} from "../governance-genre-helper";
import GovernanceByStatus from "./components/governance-by-status";

export default function Page({
  params,
}: {
  params: { genre: PROPOSAL_GENRE };
}) {
  if (!["berahub", "honey", "bend", "berps", "general"].includes(params.genre))
    return notFound();

  const getDappByGenre = (genre: PROPOSAL_GENRE) => {
    return (
      NativeDapps.find((dapp) => dapp.link === genre) ||
      Others.find((dapp) => dapp.link === genre)
    );
  };

  return <GovernanceByStatus dapp={getDappByGenre(params.genre)!} />;
}
