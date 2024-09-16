import React from "react";
import { type Metadata } from "next";
import { bgtName } from "@bera/config";
import { getMetaTitle } from "@bera/shared-ui";
import NewProposal from "./components/new-proposal";

export const metadata: Metadata = {
  title: getMetaTitle("Create Proposal", bgtName),
  description: "Create a new proposal on Berachain",
};
export default function Create() {
  return (
    <div className="grid grid-cols-12 gap-6">
      <NewProposal />
    </div>
  );
}
