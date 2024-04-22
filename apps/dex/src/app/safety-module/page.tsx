import { type Metadata } from "next";
import { getMetaTitle } from "@bera/shared-ui";
import { dexName } from "@bera/config";
import { UserStats } from "./user-stats";
import { ClaimRewardsCard } from "./claim-rewards";
import { SafetyModule } from "./safety-module";

export const metadata: Metadata = {
  title: getMetaTitle("Pools", dexName),
  description: "View pools",
};

export default function safetyPage() {
  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-12">
      <div className="w-full sm:w-1/2">
        <SafetyModule rewards={123} />
      </div>
      <div className="w-full sm:w-1/2 flex flex-col gap-2">
        <UserStats />
        <ClaimRewardsCard rewards={0} />
      </div>
    </div>
  );
}
