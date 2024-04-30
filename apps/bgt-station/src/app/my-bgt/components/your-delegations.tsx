import React from "react";
import { cloudinaryUrl, docsUrl } from "@bera/config";

import { Banner } from "./banner";
import ValidatorCard from "./validator-card";

export default function YourDelegations() {
  const total = undefined;
  const delegatedValidators = undefined;

  const prices = undefined;
  const delegatorPolValidators = [] as any[];
  return (
    <div>
      {total !== 0 && !Number.isNaN(total) ? (
        <div className="flex flex-col gap-3">
          {delegatorPolValidators?.map((validator: any) => (
            <ValidatorCard validator={validator} key={validator.operatorAddr} />
          ))}
          {delegatorPolValidators?.length === 0 && (
            <p className="mt-4 self-center text-xl font-semibold">
              No BGT Delegated.
            </p>
          )}
        </div>
      ) : (
        <Banner
          img={`${cloudinaryUrl}/bears/kj33rvgbemret3xrknv9`}
          title="How do I delegate BGT?"
          subtitle="Delegate like a pro with these helpful guides."
          href={`${docsUrl}/getting-started/bgt-station-bgt.html#delegating-bgt`}
        />
      )}
    </div>
  );
}
