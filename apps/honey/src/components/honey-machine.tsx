"use client";

import { useEffect, useState } from "react";
import {
  HONEY_ROUTER_ABI,
  TransactionActionType,
  truncateHash,
} from "@bera/berajs";
import { honeyRouterAddress } from "@bera/config";
import {
  ConnectButton,
  SSRSpinner,
  Spinner,
  TokenInput,
  useTxn,
} from "@bera/shared-ui";
import Identicon from "@bera/shared-ui/src/identicon";
import { cn } from "@bera/ui";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import {
  EventType,
  Fit,
  Layout,
  useRive,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import { parseUnits, erc20Abi } from "viem";

import { LoadingBee } from "~/components/loadingBee";
import { usePsm } from "~/hooks/usePsm";

const STATE_MACHINE_NAME = "pawsAndClaws";

export function HoneyMachine() {
  // i know this looks extra but rive is dumb, we need an extra state to trigger txn
  const [currentState, setCurrentState] = useState<
    "approval" | "minting" | "redeeming" | "idle"
  >("idle");
  const [disableInputs, setDisableInputs] = useState(false);

  const {
    account,
    payload,
    isReady,
    selectedFrom,
    selectedTo,
    fromAmount,
    toAmount,
    isMint,
    fromBalance,
    toBalance,
    fee,
    needsApproval,
    honey,
    collateralList,
    exceedBalance,
    isLoading,
    isTyping,
    onSwitch,
    setGivenIn,
    setSelectedFrom,
    setSelectedTo,
    setFromAmount,
    setToAmount,
    setIsTyping,
  } = usePsm();

  const { RiveComponent, rive } = useRive({
    src: "/pawsandclaws.riv",
    stateMachines: STATE_MACHINE_NAME,
    artboard: "PawsAndClaws_Main",
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain }),
  });

  const userReady = useStateMachineInput(rive, STATE_MACHINE_NAME, "ready");

  // 1 pending, 2 success, 3 fail
  const txnState = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "txnState",
    0,
  );
  // 1 approve, 2 mint, 3 redeem
  const buttonState = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "buttonState",
  );

  const buttonActive = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "buttonActive",
  );

  async function reset(waitingTime: number) {
    await new Promise((resolve) => setTimeout(resolve, waitingTime));
    txnState!.value = 0;
    buttonActive!.value = true;
    setDisableInputs(false);
  }

  const { write } = useTxn({
    message: needsApproval
      ? `Approve ${selectedFrom?.symbol}`
      : isMint
        ? `Mint ${toAmount} HONEY`
        : `Redeem ${fromAmount} HONEY`,
    actionType: needsApproval
      ? TransactionActionType.APPROVAL
      : isMint
        ? TransactionActionType.MINT_HONEY
        : TransactionActionType.REDEEM_HONEY,
    onError: () => {
      if (txnState) {
        txnState.value = 3;
        void reset(2000);
      }
    },
    onSuccess: () => {
      if (txnState) {
        txnState.value = 2;
        void reset(5000);
      }
    },
  });

  useEffect(() => {
    if (userReady) {
      if (isReady) {
        if (!userReady.value) userReady.value = true;
      } else {
        if (userReady.value) userReady.value = false;
        if (buttonState) buttonState.value = 0;
        setFromAmount(undefined);
      }
    }
  }, [isReady, userReady]);

  useEffect(() => {
    if (buttonActive) {
      if (!exceedBalance && fromAmount && toAmount && !isTyping && !isLoading) {
        if (!buttonActive.value) buttonActive.value = true;
      } else {
        if (buttonActive.value) buttonActive.value = false;
      }
    }
  }, [exceedBalance, fromAmount, toAmount]);

  useEffect(() => {
    if (buttonState && txnState && txnState.value === 0) {
      if (needsApproval) {
        if (buttonState.value !== 1) buttonState.value = 1;
      } else if (isMint) {
        if (buttonState.value !== 2) buttonState.value = 2;
      } else if (!isMint) {
        if (buttonState.value !== 3) buttonState.value = 3;
      }
    }
  }, [needsApproval, isMint, txnState?.value, fromAmount]);

  useEffect(() => {
    if (rive) {
      rive.on(EventType.StateChange, (event: any) => {
        if (event.data.includes("buttonAnimApprove")) {
          setCurrentState("approval");
        } else if (event.data.includes("buttonAnimMint")) {
          setCurrentState("minting");
        } else if (event.data.includes("buttonAnimRedeem")) {
          setCurrentState("redeeming");
        }
      });
    }
  }, [rive]);

  // you have to do this out of rive.on or it wont work
  // i dont know why, u tell me smh
  useEffect(() => {
    if (currentState !== "idle") {
      txnState!.value = 1;
      buttonActive!.value = false;
      setDisableInputs(true);
      if (currentState === "approval") {
        performApproval();
      } else if (currentState === "minting") {
        performMinting();
      } else if (currentState === "redeeming") {
        performRedeeming();
      }
      setCurrentState("idle");
    }
  }, [currentState]);

  const performApproval = () => {
    write({
      address: selectedFrom?.address as `0x${string}`,
      abi: erc20Abi as unknown as (typeof erc20Abi)[],
      functionName: "approve",
      params: [
        honeyRouterAddress,
        parseUnits(
          `${fromAmount ?? "0"}` as `${number}`,
          selectedFrom?.decimals ?? 18,
        ),
      ],
    });
  };

  const performMinting = () =>
    write({
      address: honeyRouterAddress,
      abi: HONEY_ROUTER_ABI,
      functionName: "mint",
      params: payload,
    });

  const performRedeeming = () =>
    write({
      address: honeyRouterAddress,
      abi: HONEY_ROUTER_ABI,
      functionName: "redeem",
      params: payload,
    });

  return (
    <>
      <div className="relative bg-backgroundSecondary pb-12" id="mint-and-burn">
        {buttonState?.value === 1 && txnState?.value === 1 && (
          <div className="absolute left-[300px] top-[300px] flex items-center gap-2 text-5xl text-background">
            <Spinner size={40} color="white" />
            Approving
          </div>
        )}
        {rive ? (
          <>
            <div className="absolute left-[830px] top-[166px] flex h-[42px] items-center">
              {isReady ? (
                <>
                  <Identicon
                    account={account ?? ""}
                    className="mr-2 flex"
                    size={25}
                  />
                  <div className="text-background">
                    {truncateHash(account ?? "0x", 6)}
                  </div>
                </>
              ) : (
                <ConnectButton className="bg-transparent" />
              )}
            </div>
            <div
              className={cn(
                "absolute right-[21px] top-[214px] z-30 m-6 w-[332px] overflow-hidden",
                (!isReady || disableInputs) &&
                  "pointer-events-none opacity-50 grayscale",
              )}
            >
              <h1 className="relative px-1 text-lg font-semibold text-background">
                {isMint ? "Mint" : "Redeem"}
                <div className="absolute right-0 top-1 text-sm font-light">
                  Static fee of {(Number(fee ?? 0) * 100).toFixed(2)}%
                </div>
              </h1>
              <Tabs
                defaultValue={"mint"}
                value={isMint ? "mint" : "redeem"}
                className="mb-1"
              >
                <TabsList className="w-full">
                  <TabsTrigger
                    value={"mint"}
                    className="flex-1 capitalize data-[state=active]:bg-success-foreground"
                    onClick={() => {
                      if (!isMint) onSwitch();
                    }}
                  >
                    Mint
                  </TabsTrigger>
                  <TabsTrigger
                    value={"redeem"}
                    className="flex-1 capitalize data-[state=active]:bg-destructive-foreground"
                    onClick={() => {
                      if (isMint) onSwitch();
                    }}
                  >
                    Redeem
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <ul className="relative">
                <div className="rounded-t-md border-2 border-b-0 border-foreground bg-muted">
                  <TokenInput
                    selected={selectedFrom}
                    selectedTokens={[selectedFrom, selectedTo]}
                    onTokenSelection={setSelectedFrom}
                    amount={fromAmount}
                    balance={fromBalance?.formattedBalance}
                    selectable={selectedFrom?.address !== honey?.address}
                    customTokenList={collateralList}
                    showExceeding
                    setIsTyping={setIsTyping}
                    setAmount={(amount) => {
                      setGivenIn(true);
                      setFromAmount(amount);
                    }}
                  />
                </div>
                {(isLoading || isTyping) && (
                  <SSRSpinner className="absolute left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-md border border-border bg-background p-2" />
                )}
                <div className="rounded-b-md border-2 border-foreground bg-muted">
                  <TokenInput
                    selected={selectedTo}
                    selectedTokens={[selectedFrom, selectedTo]}
                    onTokenSelection={setSelectedTo}
                    amount={toAmount}
                    setAmount={(amount) => {
                      setGivenIn(false);
                      setToAmount(amount);
                    }}
                    selectable={selectedTo?.address !== honey?.address}
                    customTokenList={collateralList}
                    hideMax
                    balance={toBalance?.formattedBalance}
                    setIsTyping={setIsTyping}
                  />
                </div>
              </ul>
            </div>
          </>
        ) : (
          <LoadingBee />
        )}
        <div className="h-[800px] w-[1200px]">
          <RiveComponent />
        </div>
      </div>
    </>
  );
}
