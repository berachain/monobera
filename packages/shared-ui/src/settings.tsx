import { cn } from "@bera/ui";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { useLocalStorage } from "usehooks-ts";

import { ThemeToggle } from "./theme-toggle";
import { Tooltip } from "./tooltip";

export const SLIPPAGE_TOLERANCE_TYPE = "SLIPPAGE_TOLERANCE_TYPE";
export const SLIPPAGE_TOLERANCE_VALUE = "SLIPPAGE_TOLERANCE_VALUE";
export const DEFAULT_SLIPPAGE = 1; // 0.3%

export const DEADLINE_TYPE = "DEADLINE_TYPE";
export const DEADLINE_VALUE = "DEADLINE_VALUE";
export const DEFAULT_DEADLINE = 30; // minutes

export enum SLIPPAGE_MODE {
  AUTO = "auto",
  CUSTOM = "custom",
  DEGEN = "degen",
}

export enum TRANSACTION_MODE {
  AUTO = "auto",
  CUSTOM = "custom",
  INFINITY = "infinity",
}

export const Setting = ({
  goback,
  isHoney,
}: {
  goback: () => void;
  isHoney: boolean;
}) => {
  const [slippageMode, setSlippageMode] = useLocalStorage<SLIPPAGE_MODE>(
    SLIPPAGE_TOLERANCE_TYPE,
    SLIPPAGE_MODE.AUTO,
  );
  const [slippage, setSlippage] = useLocalStorage<number>(
    SLIPPAGE_TOLERANCE_VALUE,
    DEFAULT_SLIPPAGE,
  );
  const [transactionMode, setTransactionMode] =
    useLocalStorage<TRANSACTION_MODE>(DEADLINE_TYPE, TRANSACTION_MODE.AUTO);
  const [transactionDeadline, setTransactionDeadline] = useLocalStorage<number>(
    DEADLINE_VALUE,
    DEFAULT_DEADLINE,
  );

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
          <Tabs defaultValue={slippageMode}>
            <TabsList>
              <TabsTrigger
                value={SLIPPAGE_MODE.AUTO}
                onClick={() => setSlippageMode(SLIPPAGE_MODE.AUTO)}
              >
                Auto
              </TabsTrigger>
              <TabsTrigger
                value={SLIPPAGE_MODE.CUSTOM}
                onClick={() => setSlippageMode(SLIPPAGE_MODE.CUSTOM)}
              >
                Custom
              </TabsTrigger>
              <TabsTrigger
                value={SLIPPAGE_MODE.DEGEN}
                onClick={() => setSlippageMode(SLIPPAGE_MODE.DEGEN)}
                className={cn(
                  slippageMode === SLIPPAGE_MODE.DEGEN &&
                    "data-[state=active]:bg-destructive-foreground",
                )}
              >
                Degen
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Input
            placeholder={DEFAULT_SLIPPAGE.toString()}
            endAdornment="%"
            type="number"
            disabled={slippageMode !== SLIPPAGE_MODE.CUSTOM}
            value={
              slippageMode === SLIPPAGE_MODE.AUTO
                ? DEFAULT_SLIPPAGE
                : slippage === 0
                ? undefined
                : slippage
            }
            onChange={(e: any) => setSlippage(Number(e.target.value))}
          />
        </div>
        {slippageMode === SLIPPAGE_MODE.DEGEN && (
          <Alert variant={"destructive"} className="flex gap-2">
            <Icons.info className="h-4 w-4 flex-shrink-0 text-destructive-foreground" />
            <div>
              <AlertTitle>Extremely High slippage</AlertTitle>
              <AlertDescription className="text-xs">
                Please be aware this could result in extremely high slippage
                (i.e., A swap could cost you 50% or more)
              </AlertDescription>
            </div>
          </Alert>
        )}
      </div>

      <div className="flex flex-col gap-2 text-sm font-medium">
        <div className="flex items-center gap-1">
          Transaction deadline <Tooltip text="Transaction deadline" />{" "}
        </div>
        <div className="flex w-full items-center gap-4">
          <Tabs defaultValue={transactionMode}>
            <TabsList>
              <TabsTrigger
                value={TRANSACTION_MODE.AUTO}
                onClick={() => setTransactionMode(TRANSACTION_MODE.AUTO)}
              >
                Auto
              </TabsTrigger>
              <TabsTrigger
                value={TRANSACTION_MODE.CUSTOM}
                onClick={() => setTransactionMode(TRANSACTION_MODE.CUSTOM)}
              >
                Custom
              </TabsTrigger>
              <TabsTrigger
                value={TRANSACTION_MODE.INFINITY}
                onClick={() => setTransactionMode(TRANSACTION_MODE.INFINITY)}
                className={cn(
                  transactionMode === TRANSACTION_MODE.INFINITY &&
                    "data-[state=active]:bg-destructive-foreground",
                )}
              >
                Infinity
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Input
            placeholder={DEFAULT_DEADLINE.toString()}
            endAdornment="min"
            type="number"
            disabled={transactionMode !== TRANSACTION_MODE.CUSTOM}
            value={
              transactionMode === TRANSACTION_MODE.AUTO
                ? DEFAULT_DEADLINE
                : transactionDeadline
            }
            onChange={(e) => setTransactionDeadline(Number(e.target.value))}
          />
        </div>
        {transactionMode === TRANSACTION_MODE.INFINITY && (
          <Alert variant={"destructive"} className="flex gap-2">
            <Icons.info className="h-4 w-4 flex-shrink-0 text-destructive-foreground" />
            <div>
              <AlertTitle>No Txn Deadline</AlertTitle>
              <AlertDescription className="text-xs">
                Please be aware this could result in the txn being active
                forever.
              </AlertDescription>
            </div>
          </Alert>
        )}
      </div>
    </>
  );
};
