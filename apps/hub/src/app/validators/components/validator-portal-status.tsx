import React from "react";
import { truncateHash, useBeraJs, useSelectedValidator } from "@bera/berajs";
import { ActionButton } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";

export const ValidatorPortalStatus = () => {
  const { account, isReady } = useBeraJs();
  const { data: validator } = useSelectedValidator(account ?? "0x");
  if (validator) return <></>;

  return (
    <div className="flex w-full gap-6">
      <div className="flex flex-1 flex-col rounded-md border border-border p-6 text-left">
        <div className="text-sm font-medium leading-[14px] text-muted-foreground">
          VALIDATOR PORTAL
        </div>

        <div>
          <div className="semi-bolder  text-2xl font-semibold leading-loose text-foreground">
            {isReady ? (
              "This wallet is not associated with a validator"
            ) : (
              <div className="flex cursor-pointer items-center">
                Manage your validator
                <Icons.arrowRight className="ml-2 cursor-pointer" />
              </div>
            )}
          </div>
          {isReady ? (
            <div className="text-sm font-semibold leading-5 text-muted-foreground">
              Reconnect with a validator wallet to view analytics and configure
              your settings.
            </div>
          ) : (
            <div className="text-sm font-semibold leading-5 text-muted-foreground">
              Connect with your validator wallet to view your analytics and
              configure your settings.
            </div>
          )}
          <ActionButton className="mt-6 w-fit">
            <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              Connected as {truncateHash(account ?? "0x")}
            </div>
          </ActionButton>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col rounded-md border border-border p-6 text-left">
        <div className="text-sm font-medium leading-[14px] text-muted-foreground">
          SETUP
        </div>

        <div className="semi-bolder  text-2xl font-semibold leading-loose text-foreground">
          <div className="flex cursor-pointer items-center">
            Setup your own Validator
            <Icons.arrowRight className="ml-2 cursor-pointer" />
          </div>
        </div>

        <div className="text-sm font-semibold leading-5 text-muted-foreground">
          Get started in setting up your own validator
        </div>
        <span className="absolute right-14 text-8xl">🛠️</span>
      </div>
    </div>
  );
};
