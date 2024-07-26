import React, { useCallback, useMemo } from "react";
import { useBeraJs } from "@bera/berajs";
import { ConnectButton } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { useRouter } from "next/navigation";

export const ValidatorPortalStatus = ({
  isLoading,
}: {
  isLoading: boolean;
}) => {
  const { isReady, isConnected, isWrongNetwork } = useBeraJs();
  const router = useRouter();

  // TODO: Add a check for isValidatorWallet
  const isValidatorWallet = true;

  const handleOpenValidatorPortal = useCallback(() => {
    const validatorUrl = "0xC5b889a28950e7F8c1F279f758d8a0ab1C89cC38"; // TODO: Add the correct validator URL
    router.push(`/validators/${validatorUrl}`);
  }, []);

  return (
    <div className="mt-12 flex flex-col rounded-md border border-border p-6 text-left">
      <div className="text-sm font-medium leading-[14px] text-muted-foreground">
        VALIDATOR PORTAL
      </div>
      {!isLoading ? (
        <div>
          <div className="semi-bolder  text-2xl font-semibold leading-loose text-foreground">
            {isValidatorWallet ? (
              <div
                className="flex cursor-pointer items-center"
                onClick={handleOpenValidatorPortal}
              >
                Manage your validator
                <Icons.arrowRight className="ml-2 cursor-pointer" />
              </div>
            ) : (
              "This wallet is not associated with a validator"
            )}
          </div>
          {isValidatorWallet ? (
            <div className="text-sm font-semibold leading-loose text-muted-foreground">
              View your validator's analytics and configure your settings.
            </div>
          ) : isConnected ? (
            <div className="text-sm font-semibold leading-loose text-muted-foreground">
              Reconnect with a validator wallet to view analytics and configure
              your settings.
            </div>
          ) : (
            <div className="text-sm font-semibold leading-loose text-muted-foreground">
              Connect with your validator wallet to view your analytics and
              configure your settings.
            </div>
          )}
          <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            {isValidatorWallet && (
              <Icons.checkCircle className="h-6 w-6 text-positive" />
            )}
            {isConnected && !isWrongNetwork && <div>Connected as </div>}
            <ConnectButton className="max-w-[300px]" />
          </div>
        </div>
      ) : (
        <Skeleton className="mt-4 h-[80px] w-[300px]" />
      )}
    </div>
  );
};
