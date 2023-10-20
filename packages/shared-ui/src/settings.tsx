import { useEffect, useState } from "react";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { ThemeToggle } from "./theme-toggle";
import { Tooltip } from "./tooltip";

export const Setting = ({
  goback,
  isHoney,
}: {
  goback: () => void;
  isHoney?: boolean;
}) => {
  const [slippageAuto, setSlippageAuto] = useState(
    localStorage.getItem("slippageAuto") === `"true"`,
  );
  const [slippage, setSlippage] = useState<`${number}`>(
    (localStorage.getItem("slippage") ?? "0.3").replaceAll(
      `"`,
      ``,
    ) as `${number}`,
  );
  const [transactionAuto, setTransactionAuto] = useState(
    localStorage.getItem("transactionAuto") === `"true"`,
  );
  const [transactionDeadline, setTransactionDeadline] = useState<`${number}`>(
    (localStorage.getItem("transactionDeadline") ?? "30").replaceAll(
      `"`,
      ``,
    ) as `${number}`,
  );

  useEffect(() => {
    if (slippageAuto) {
      localStorage.setItem("slippageAuto", "true");
      localStorage.setItem("slippage", "0.3");
    } else {
      localStorage.setItem("slippageAuto", "false");
      localStorage.setItem("slippage", slippage);
    }
  }, [slippageAuto, slippage]);

  useEffect(() => {
    if (transactionAuto) {
      localStorage.setItem("transactionAuto", "true");
      localStorage.setItem("transactionDeadline", "30");
    } else {
      localStorage.setItem("transactionAuto", "false");
      localStorage.setItem("transactionDeadline", transactionDeadline);
    }
  }, [transactionAuto, transactionDeadline]);

  return (
    <>
      <div
        className="flex cursor-pointer items-center gap-1 font-medium leading-6"
        onClick={goback}
      >
        <Icons.chevronLeft className="h-5 w-5" />
        Settings
      </div>

      <div
        className={cn(
          "flex flex-col gap-2 text-sm font-medium",
          isHoney && "pointer-events-none opacity-50",
        )}
      >
        Theme
        <ThemeToggle />
      </div>

      <div
        className={cn(
          "flex flex-col gap-2 text-sm font-medium",
          isHoney && "pointer-events-none opacity-50",
        )}
      >
        <div className="flex items-center gap-1">
          Max slippage <Tooltip text="Max slippage" />
        </div>
        <div className="flex w-full items-center gap-4">
          <Tabs defaultValue={slippageAuto ? "auto" : "custom"}>
            <TabsList>
              <TabsTrigger value={"auto"} onClick={() => setSlippageAuto(true)}>
                Auto
              </TabsTrigger>
              <TabsTrigger
                value={"custom"}
                onClick={() => setSlippageAuto(false)}
              >
                Custom
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Input
            placeholder={"0.3"}
            endAdornment="%"
            type="number"
            disabled={slippageAuto}
            value={slippageAuto ? "0.3" : slippage}
            onChange={(e) => setSlippage(e.target.value as `${number}`)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 text-sm font-medium">
        <div className="flex items-center gap-1">
          Transaction deadline <Tooltip text="Transaction deadline" />{" "}
        </div>
        <div className="flex w-full items-center gap-4">
          <Tabs defaultValue={transactionAuto ? "auto" : "custom"}>
            <TabsList>
              <TabsTrigger
                value={"auto"}
                onClick={() => setTransactionAuto(true)}
              >
                Auto
              </TabsTrigger>
              <TabsTrigger
                value={"custom"}
                onClick={() => setTransactionAuto(false)}
              >
                Custom
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Input
            placeholder="30"
            endAdornment="min"
            type="number"
            disabled={transactionAuto}
            value={transactionAuto ? "30" : transactionDeadline}
            onChange={(e) =>
              setTransactionDeadline(e.target.value as `${number}`)
            }
          />
        </div>
      </div>
    </>
  );
};
