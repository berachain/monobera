import Link from "next/link";
import { useBeraJs } from "@bera/berajs";
import { bgtTokenAddress } from "@bera/config";
import { TokenIcon } from "@bera/shared-ui";
import { useLocalStorage } from "usehooks-ts";

export default function PersonalInfo() {
  const { isConnected, account } = useBeraJs();
  const [authToken, _] = useLocalStorage<{ token: string; address: string }>(
    "VALCLUE_AUTH_TOKEN",
    { token: "", address: "" },
  );
  if (isConnected && authToken.address === account && authToken.token) {
    return (
      <div className="flex w-full justify-between rounded-sm border border-border px-3 py-4">
        <div>
          <div className="font-retro-gaming text-lg leading-7">
            Select Validator
          </div>
          <Link
            className="mt-1 text-xs leading-4 text-muted-foreground underline"
            href={"/"}
            target="_blank"
          >
            My Pool: Berautist Honey
          </Link>
        </div>
        <div className="flex flex-col items-end gap-6 border-l border-border pl-4 sm:flex-row sm:border-none">
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 14L15 11"
                stroke="#713F12"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 16.4183 6 12 6C7.58172 6 4 9.58172 4 14C4 18.4183 7.58172 22 12 22Z"
                stroke="#713F12"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div>
              <div className="font-retro-gaming whitespace-nowrap text-sm leading-5">
                42Hrs 2Mins
              </div>
              <div className="whitespace-nowrap text-xs leading-3 text-muted-foreground">
                Epoch Countdown
              </div>
            </div>
          </div>

          <div className="flex items-center gap-[6px]">
            <TokenIcon address={bgtTokenAddress} fetch />
            <div>
              <div className="font-retro-gaming text-sm leading-5">420.69</div>
              <div className="text-xs leading-3 text-muted-foreground">
                BGT Score
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <></>;
}
