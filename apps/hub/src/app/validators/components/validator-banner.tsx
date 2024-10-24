import Link from "next/link";
import { truncateHash, useBeraJs, useSelectedValidator } from "@bera/berajs";
import { ValidatorIcon } from "@bera/shared-ui";
import { getHubValidatorPath } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";

export const ValidatorBanner = () => {
  const { account, isReady } = useBeraJs();
  const { data: validator, isLoading } = useSelectedValidator(account ?? "0x");
  if (!isReady || !account || isLoading || !validator) return <></>;
  return (
    <Link
      className="rounded-sm border px-4 py-6"
      href={getHubValidatorPath(account)}
    >
      <div className="flex items-center text-sm font-semibold leading-5 text-muted-foreground hover:text-primary">
        <Icons.checkCircle2 className="mr-1 h-4 w-4 text-success-foreground" />{" "}
        Connected as
        <ValidatorIcon address={account} className="ml-4 mr-1" />{" "}
        {validator?.metadata?.name} ({truncateHash(account)})
      </div>
      <div className="flex items-center gap-3 text-2xl font-semibold leading-loose">
        Manage as a validator <Icons.arrowRight />
      </div>
      <div className="text-sm font-medium leading-5 text-muted-foreground">
        View your validator’s analytics and configure your settings.
      </div>
    </Link>
  );
};
