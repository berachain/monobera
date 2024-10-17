import { truncateHash, useBeraJs } from "@bera/berajs";
import { Identicon } from "@bera/shared-ui";

export const UserSection = () => {
  const { isReady, account } = useBeraJs();
  return (
    <div className="flex w-[282px] flex-col gap-6 rounded-sm p-4">
      {isReady ? (
        <>
          <div className="ga-1 flex items-center">
            <Identicon account={account ?? ""} size={24} />
            {truncateHash(account ?? "0x", 6)}
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            Total Voting Power
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
