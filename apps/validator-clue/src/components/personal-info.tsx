"use client";

import Link from "next/link";
import { formatter } from "@bera/berajs";
import { bgtTokenAddress, blockExplorerUrl } from "@bera/config";
import { TokenIcon } from "@bera/shared-ui";

import { usePollEpoch } from "~/hooks/usePollEpoch";
import { usePollMe } from "~/hooks/usePollMe";

export default function PersonalInfo({ epoch }: { epoch: any }) {
  const { data: me, isLoading } = usePollMe();
  const { data: epo } = usePollEpoch(epoch);
  function countdown(targetDateTime: string) {
    const targetDate = new Date(targetDateTime);
    const currentDate = new Date();
    const diff = targetDate.getTime() - currentDate.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours}Hs ${minutes}mins ${seconds}secs`;
  }

  if (!isLoading && me && !me.error) {
    return (
      <div className="flex w-full justify-between rounded-sm border border-border px-3 py-4">
        <div>
          <div className="font-retro-gaming text-lg leading-7">{me.name}</div>
          <Link
            className="mt-1 text-xs leading-4 text-muted-foreground underline"
            href={`${blockExplorerUrl}/address/${me.pool.address}`}
            target="_blank"
          >
            {me.pool.name}
          </Link>
        </div>
        <div className="xs:items-start flex flex-col gap-6 border-l border-border pl-4 sm:flex-row sm:items-end sm:border-none md:items-end lg:items-end">
          <div className="flex items-center gap-[6px]">
            <TokenIcon address={bgtTokenAddress} fetch />
            <div>
              <div className="font-retro-gaming text-sm leading-5">
                {formatter.format(me.bgt)}
              </div>
              <div className="text-xs leading-3 text-muted-foreground">
                BGT Score
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[6px]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2H14"
                stroke="#713F12"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 14L15 11"
                stroke="#713F12"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 16.4183 6 12 6C7.58172 6 4 9.58172 4 14C4 18.4183 7.58172 22 12 22Z"
                stroke="#713F12"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <div className="font-retro-gaming whitespace-nowrap text-sm leading-5">
                {countdown(epo?.nextEpoch)}
              </div>
              <div className="whitespace-nowrap text-xs leading-3 text-muted-foreground">
                Epoch Countdown
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <></>;
}
