import Link from "next/link";
import { truncateHash, useBeraJs, useSelectedValidator } from "@bera/berajs";
import { ValidatorIcon } from "@bera/shared-ui";
import { getHubValidatorPath } from "@bera/shared-ui/src/utils/getHubUrls";
import { Icons } from "@bera/ui/icons";

export const GaugeCreation = () => {
  return (
    <Link
      className="rounded-sm border px-4 py-6 mb-12"
      href="/vaults/create-gauge"
    >
      <div className="flex items-center gap-3 text-2xl font-semibold leading-loose">
        Add your protocol's Rewards Vault <Icons.arrowRight />
      </div>
      <div className="text-sm font-medium leading-5 text-muted-foreground">
        LPs will be able to deposit your protocol receipt and earn BGT rewards
      </div>
    </Link>
  );
};
