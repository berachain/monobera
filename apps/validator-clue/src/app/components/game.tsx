import { useEffect, useState } from "react";
import Link from "next/link";
import { formatter, truncateHash } from "@bera/berajs";
import { bgtTokenAddress, blockExplorerUrl } from "@bera/config";
import { TokenIcon } from "@bera/shared-ui";
import { cn } from "@bera/ui";

export default function GAME() {
  const [tab, setTab] = useState<"pools" | "validators" | "eliminated">(
    "pools",
  );
  const [pools, setPools] = useState<any[]>([]);
  const [validators, setValidators] = useState<any[]>([]);
  const [obituaries, setObituaries] = useState<any[]>([]);

  const fetchPools = async () => {
    try {
      const poolsRes = await fetch(`/api/get-pools`);
      const pools = (await poolsRes.json()).sort(
        (a: any, b: any) => a.bgt < b.bgt,
      );
      setPools(pools);
      return;
    } catch (error) {
      console.error("Somethings wrong with fecthing pools:", error);
      return undefined;
    }
  };

  const fetchValidators = async () => {
    try {
      const valisRes = await fetch(`/api/get-validators`);
      const validators = (await valisRes.json()).sort(
        (a: any, b: any) => a.bgt < b.bgt,
      );
      setValidators(validators);
      return;
    } catch (error) {
      console.error("Somethings wrong with fecthing validators:", error);
      return undefined;
    }
  };

  const fetchObituaries = async () => {
    try {
      const obiRes = await fetch(`/api/get-obituaries `);
      const obituaries = (await obiRes.json()).sort(
        (a: any, b: any) => a.bgt < b.bgt,
      );
      setObituaries(obituaries);
      return;
    } catch (error) {
      console.error("Somethings wrong with fecthing validators:", error);
      return undefined;
    }
  };

  useEffect(() => {
    void fetchPools();
    void fetchValidators();
    void fetchObituaries();
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="flex gap-3">
        <div
          className={cn(
            "font-retro-gaming cursor-pointer rounded-t-sm bg-background px-3 py-1 leading-6 text-muted-foreground",
            tab === "pools" && "bg-foreground",
          )}
          onClick={() => setTab("pools")}
        >
          Pools
        </div>
        <div
          className={cn(
            "font-retro-gaming cursor-pointer rounded-t-sm bg-background px-3 py-1 leading-6 text-muted-foreground",
            tab === "validators" && "bg-foreground",
          )}
          onClick={() => setTab("validators")}
        >
          Validators
        </div>
        <div
          className={cn(
            "font-retro-gaming cursor-pointer rounded-t-sm bg-destructive px-3 py-1 leading-6 text-destructive-foreground",
            tab === "eliminated" &&
              "bg-destructive-foreground text-destructive",
          )}
          onClick={() => setTab("eliminated")}
        >
          Eliminated
        </div>
      </div>
      <div
        className={cn(
          "w-full flex-1 overflow-y-auto rounded-b-sm rounded-tr-sm bg-foreground p-4",
          tab !== "pools" && "rounded-tl-sm",
          tab === "eliminated" && "bg-destructive-foreground",
        )}
      >
        {tab === "pools" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {pools.map((value: any, index) => (
              <div
                key={index}
                className="flex h-[52px] w-full items-center gap-3 rounded-xs bg-muted p-2"
              >
                <div className="font-retro-gaming text-2xl">{index + 1}</div>
                <div className="flex h-full flex-1 flex-col justify-between">
                  <Link
                    className="font-retro-gaming text-sm leading-5 hover:text-muted-foreground"
                    href={`${blockExplorerUrl}/address/${value.address}`}
                    target="_blank"
                  >
                    {value.name}
                  </Link>
                  <div className="text-xs text-muted-foreground">BGT Score</div>
                </div>
                <div className="flex h-full items-end gap-1">
                  <div className="scroll-mb-0.5 text-xs text-muted-foreground">
                    {formatter.format(value.bgt)}
                  </div>
                  <TokenIcon address={bgtTokenAddress} fetch size="sm" />
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "validators" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {validators.map((value: any, index) => (
              <div
                key={index}
                className="flex h-[52px] w-full items-center gap-3 rounded-xs bg-muted p-2"
              >
                <div className="flex h-full flex-1 flex-col justify-between">
                  <div className="font-retro-gaming text-sm leading-5">
                    {value.name}
                  </div>
                  <Link
                    className="text-xs text-muted-foreground hover:text-foreground"
                    href={`${blockExplorerUrl}/address/${value.address}`}
                    target="_blank"
                  >
                    {truncateHash(value.address)}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "eliminated" && (
          <div className="flex flex-col gap-4">
            {obituaries.map((value: any, index) => (
              <div key={index} className="flex items-center">
                <div
                  key={index}
                  className="flex h-[52px] flex-1 items-center gap-3 rounded-xs bg-destructive p-2 text-destructive-foreground"
                >
                  <div className="flex h-full flex-1 flex-col justify-between">
                    <div className="font-retro-gaming text-sm leading-5 line-through">
                      {value.validator.name}
                    </div>
                    <div className="text-xs line-through">
                      {truncateHash(value.validator.address)}
                    </div>
                  </div>
                  <div className="flex h-full items-end">
                    <svg
                      width="13"
                      height="12"
                      viewBox="0 0 13 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 6.5C5.27614 6.5 5.5 6.27614 5.5 6C5.5 5.72386 5.27614 5.5 5 5.5C4.72386 5.5 4.5 5.72386 4.5 6C4.5 6.27614 4.72386 6.5 5 6.5Z"
                        stroke="#DC2626"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8 6.5C8.27614 6.5 8.5 6.27614 8.5 6C8.5 5.72386 8.27614 5.5 8 5.5C7.72386 5.5 7.5 5.72386 7.5 6C7.5 6.27614 7.72386 6.5 8 6.5Z"
                        stroke="#DC2626"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.5 10V11H8.5V10"
                        stroke="#DC2626"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.75 8.5L6.5 8L6.25 8.5H6.75Z"
                        stroke="#DC2626"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.5 10.001C8.68835 10.0009 8.87283 9.94761 9.03221 9.84726C9.1916 9.7469 9.3194 9.60357 9.4009 9.43377C9.4824 9.26397 9.5143 9.07461 9.49291 8.88748C9.47152 8.70035 9.39772 8.52307 9.28 8.37604C9.85299 7.82219 10.2475 7.10981 10.4129 6.33025C10.5783 5.5507 10.5071 4.7395 10.2084 4.00069C9.90968 3.26188 9.3971 2.62913 8.73638 2.18358C8.07566 1.73804 7.29691 1.5 6.5 1.5C5.70309 1.5 4.92435 1.73804 4.26362 2.18358C3.6029 2.62913 3.09033 3.26188 2.79162 4.00069C2.49292 4.7395 2.42171 5.5507 2.58712 6.33025C2.75252 7.10981 3.14702 7.82219 3.72 8.37604C3.60228 8.52307 3.52848 8.70035 3.50709 8.88748C3.48571 9.07461 3.5176 9.26397 3.5991 9.43377C3.68061 9.60357 3.80841 9.7469 3.96779 9.84726C4.12717 9.94761 4.31165 10.0009 4.5 10.001"
                        stroke="#DC2626"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <svg
                  width="58"
                  height="11"
                  viewBox="0 0 58 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.1667 5.5C25.1667 8.44552 27.5545 10.8333 30.5 10.8333C33.4455 10.8333 35.8333 8.44552 35.8333 5.5C35.8333 2.55448 33.4455 0.166667 30.5 0.166667C27.5545 0.166667 25.1667 2.55448 25.1667 5.5ZM0.5 6.5H30.5V4.5H0.5V6.5Z"
                    fill="#FEF2F2"
                  />
                  <line
                    x1="28.5"
                    y1="4.5"
                    x2="57.5"
                    y2="4.5"
                    stroke="#FEF2F2"
                    stroke-width="2"
                  />
                </svg>
                <div className="flex h-[52px] flex-1 items-center gap-3 rounded-xs bg-destructive p-2 text-destructive-foreground">
                  <div className="flex h-full flex-1 flex-col justify-between">
                    <div className="font-retro-gaming text-sm leading-5 line-through">
                      {value.pool}
                    </div>
                    <div className="text-xs">BGT Score</div>
                  </div>
                  <div className="flex h-full items-end gap-1">
                    <div className="scroll-mb-0.5 text-xs">00.00</div>
                    <TokenIcon address={bgtTokenAddress} fetch size="sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
