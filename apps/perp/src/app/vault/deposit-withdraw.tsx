"use client";

import { useMemo, useState } from "react";
import {
  BTOKEN_ABI,
  TransactionActionType,
  useBeraJs,
  usePollAllowance,
  usePollBHoneyPendingWithdraw,
  usePollMaxDeposit,
} from "@bera/berajs";
import { honeyAddress } from "@bera/config";
import {
  ActionButton,
  ApproveButton,
  TokenInput,
  TokenList,
  useTxn,
} from "@bera/shared-ui";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { parseUnits } from "ethers";
import { type Address } from "wagmi";

import { getSafeNumber } from "~/utils/getSafeNumber";
import { usePollWithdrawQueue } from "~/hooks/usePollWithdrawQueue";

export default function DepositWithdraw() {
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");

  const [isDepositExceeding, setIsDepositExceeding] = useState(false);
  const [isWithdrawExceeding, setIsWithdrawExceeding] = useState(false);

  const {
    write: depositWrite,
    isLoading: isDepositLoading,
    ModalPortal: DepositModalPortal,
  } = useTxn({
    message: "Staking HONEY",
    actionType: TransactionActionType.DEPOSIT_HONEY,
  });

  const { refetch } = usePollWithdrawQueue();

  const {
    write: withdrawWrite,
    isLoading: isWithdrawLoading,
    ModalPortal: WithdrawModalPortal,
  } = useTxn({
    message: "Creating HONEY Withdraw Request",
    actionType: TransactionActionType.START_WITHDRAW_REQUEST,
    onSuccess: () => {
      refetch();
    },
  });

  const { account } = useBeraJs();
  const honey = {
    symbol: "HONEY",
    address: honeyAddress,
    decimals: 18,
    name: "Honey",
  };

  const gTokenAddress = process.env
    .NEXT_PUBLIC_GTOKEN_CONTRACT_ADDRESS as Address;

  const { useBHoneyEligibleWithdraw } = usePollBHoneyPendingWithdraw();
  const eligibleForWithdraw = useBHoneyEligibleWithdraw();

  const { useAllowance } = usePollAllowance({
    contract: gTokenAddress,
    token: honey,
  });

  const allowance = useAllowance();

  const withdrawPayload = [
    parseUnits(withdrawAmount === "" ? "0" : withdrawAmount, 18),
  ];

  const { isLoading: isMaxDepositLoading, useMaxDeposit } = usePollMaxDeposit();

  const maxDeposit = useMaxDeposit();

  const isMaxDepositExceeding = useMemo(() => {
    if (maxDeposit && depositAmount) {
      return maxDeposit < getSafeNumber(depositAmount);
    }
    return false;
  }, [maxDeposit, depositAmount]);
  // console.log(isMaxDepositExceeding);
  return (
    <div className="flex h-fit w-full flex-col justify-between rounded-lg border border-border px-4 py-6 md:flex-row">
      {DepositModalPortal}
      {WithdrawModalPortal}
      <div className="w-full flex-shrink-0">
        <Tabs defaultValue="deposit">
          <TabsList className="mb-8 w-full">
            <TabsTrigger value="deposit" className="w-full">
              Deposit
            </TabsTrigger>
            <TabsTrigger value="withdraw" className="w-full">
              Withdraw
            </TabsTrigger>
          </TabsList>
          <TabsContent value="deposit" className="flex flex-col gap-4">
            <div className="flex gap-1 text-xl font-semibold leading-7">
              <Icons.lock className="h-6 w-6 text-accent" />
              Deposit Honey
            </div>
            <div className="text-sm leading-6 text-muted-foreground">
              Deposit HONEY in exchange for bHONEY, stakers receive fees from
              each trade placed on the platform. bHONEY Accumulates these fees
              in real-time.
            </div>
            <div>
              <TokenList>
                <TokenInput
                  selectable={false}
                  selected={honey}
                  amount={depositAmount}
                  setAmount={setDepositAmount}
                  showExceeding={true}
                  onExceeding={(isExceeding) =>
                    setIsDepositExceeding(isExceeding)
                  }
                />
              </TokenList>
            </div>
            <Alert variant="warning" className="rounded-md">
              <AlertTitle>
                {" "}
                <Icons.info className="inline-block h-4 w-4" /> Please read
                before you deposit
              </AlertTitle>
              <AlertDescription>
                There is a 1-3 EPOCH Wait period to withdraw your Honey Deposit
                from the HONEY Vault.
              </AlertDescription>
            </Alert>
            <ActionButton>
              {allowance?.formattedAllowance === "0" ||
              allowance?.allowance <
                parseUnits(depositAmount === "" ? "0" : depositAmount, 18) ? (
                <ApproveButton
                  token={honey}
                  spender={gTokenAddress}
                  amount={parseUnits(
                    depositAmount === "" ? "0" : depositAmount,
                    18,
                  )}
                />
              ) : (
                <Button
                  // variant={"success"}
                  className="w-full"
                  disabled={
                    isDepositLoading ||
                    !depositAmount ||
                    isDepositExceeding ||
                    isMaxDepositExceeding ||
                    isMaxDepositLoading
                  }
                  onClick={() =>
                    depositWrite({
                      address: gTokenAddress,
                      abi: BTOKEN_ABI,
                      functionName: "deposit",
                      params: [
                        parseUnits(
                          depositAmount === "" ? "0" : depositAmount,
                          18,
                        ),
                        account,
                      ],
                    })
                  }
                >
                  Deposit Honey
                </Button>
              )}
            </ActionButton>
            {isMaxDepositExceeding && (
              <Alert variant="destructive" className="mt-2">
                Deposit amount exceeds the maximum deposit amount.
              </Alert>
            )}
          </TabsContent>

          <TabsContent value="withdraw" className="flex flex-col gap-4">
            <div className="flex gap-1 text-xl font-semibold leading-7">
              <Icons.lock className="h-6 w-6 text-accent" />
              Withdraw Honey
            </div>
            <div className="text-sm leading-6 text-muted-foreground">
              Submit your withdrawal request anytime. It will be processed
              within 3 epochs.
            </div>
            <div>
              <TokenList>
                <TokenInput
                  selectable={false}
                  balance={eligibleForWithdraw}
                  selected={{
                    symbol: "BHONEY",
                    address: gTokenAddress,
                    decimals: 18,
                    name: "BHONEY",
                    logoURI:
                      "https://raw.githubusercontent.com/berachain/default-token-list/main/src/assets/bhoney.png",
                  }}
                  amount={withdrawAmount}
                  setAmount={setWithdrawAmount}
                  showExceeding={true}
                  onExceeding={(isExceeding) =>
                    setIsWithdrawExceeding(isExceeding)
                  }
                />
              </TokenList>
            </div>
            {/* <Alert variant="warning">
              <AlertTitle>
                {" "}
                <Icons.info className="mr-1 inline-block h-4 w-4" />
                Must withdraw in the EPOCH’s first 18 hours
              </AlertTitle>
              <AlertDescription>
                You must withdraw your assets in the first 18 hours of your
                withdraw epoch, otherwise a new request is required.
              </AlertDescription>
            </Alert> */}
            <ActionButton>
              <Button
                disabled={
                  isWithdrawLoading || !withdrawAmount || isWithdrawExceeding
                }
                onClick={() =>
                  withdrawWrite({
                    address: gTokenAddress,
                    abi: BTOKEN_ABI,
                    functionName: "makeWithdrawRequest",
                    params: withdrawPayload,
                  })
                }
                // variant={"destructive"}
                className="w-full"
              >
                Request Withdraw
              </Button>
            </ActionButton>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
