import { useMemo, useState } from "react";
import {
  TransactionActionType,
  bTokenAbi,
  useBeraJs,
  usePollAllowance,
  usePollBHoneyPendingWithdraw,
  usePollLastDailySupply,
  usePollMaxDeposit,
} from "@bera/berajs";
import { bhoneyVaultContractAddress, honeyAddress } from "@bera/config";
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
import BigNumber from "bignumber.js";
import { format } from "date-fns";
import { parseUnits } from "ethers";

import { usePollWithdrawQueue } from "~/hooks/usePollWithdrawQueue";

interface DepositWithdrawProps {
  actionType: "deposit" | "withdraw";
  setActionType: (actionType: "deposit" | "withdraw") => void;
}

export default function DepositWithdraw({
  actionType,
  setActionType,
}: DepositWithdrawProps) {
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");

  const [isDepositExceeding, setIsDepositExceeding] = useState(false);
  const [isWithdrawExceeding, setIsWithdrawExceeding] = useState(false);

  const { data: lastDailySupply } = usePollLastDailySupply();

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

  const { useBHoneyEligibleWithdraw } = usePollBHoneyPendingWithdraw();
  const eligibleForWithdraw = useBHoneyEligibleWithdraw();

  const { data: allowance } = usePollAllowance({
    spender: bhoneyVaultContractAddress,
    token: honey,
  });

  const withdrawPayload = [
    parseUnits(withdrawAmount === "" ? "0" : withdrawAmount, 18),
  ];

  const { isLoading: isMaxDepositLoading, useMaxDeposit } = usePollMaxDeposit();

  const maxDeposit = useMaxDeposit();

  const isMaxDepositExceeding = useMemo(() => {
    if ((maxDeposit === 0 || maxDeposit) && depositAmount) {
      return BigNumber(maxDeposit).lt(BigNumber(depositAmount));
    }
    return false;
  }, [maxDeposit, depositAmount]);

  const maxDepositExceedingMessage = useMemo(() => {
    if (isMaxDepositExceeding) {
      if (
        maxDeposit === 0 ||
        BigNumber(maxDeposit ?? 0).isLessThan(0.01) ||
        !maxDeposit
      ) {
        return "The daily deposit limit has been reached and deposits are not being accepted at this time.";
      }
      return `Your deposit exceeds the current daily maximum deposit limit of ${(
        maxDeposit ?? 0
      ).toFixed(2)} Honey.`;
    }
    return "";
  }, [maxDeposit, depositAmount, isMaxDepositExceeding]);

  return (
    <div className="flex h-full min-h-[400px] w-full flex-col justify-between rounded-lg border border-border px-4 py-6 md:flex-row">
      {DepositModalPortal}
      {WithdrawModalPortal}
      <div className="w-full flex-shrink-0">
        <Tabs defaultValue={actionType} className="flex h-full flex-col">
          <TabsList className="mb-8 w-full">
            <TabsTrigger
              value="deposit"
              className="w-full"
              onClick={() => setActionType("deposit")}
            >
              Deposit
            </TabsTrigger>
            <TabsTrigger
              value="withdraw"
              className="w-full"
              onClick={() => setActionType("withdraw")}
            >
              Withdraw
            </TabsTrigger>
          </TabsList>
          <TabsContent value="deposit" className="flex flex-col gap-4">
            <div className="mb-2 flex gap-1 text-xl font-semibold leading-7">
              <Icons.lock className="h-6 w-6 text-accent" />
              Deposit Honey
            </div>
            <div className="text-sm leading-6 text-muted-foreground">
              Deposit HONEY in exchange for bHONEY, stakers receive fees from
              each trade placed on the platform. bHONEY Accumulates these fees
              in real-time.
            </div>
            <div className="my-2">
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
            <Alert variant="warning" className="mb-4 rounded-md">
              <AlertTitle>
                {" "}
                <Icons.info className="inline-block h-4 w-4" /> Please read
                before you deposit
              </AlertTitle>
              <AlertDescription>
                There is a 1-3 Epoch wait period to withdraw your Honey from the
                Vault.
              </AlertDescription>
            </Alert>
            <ActionButton>
              {allowance?.formattedAllowance === "0" ||
              (allowance?.allowance ?? 0n) <
                parseUnits(depositAmount === "" ? "0" : depositAmount, 18) ? (
                <ApproveButton
                  token={honey}
                  disabled={depositAmount === "" || depositAmount === "0"}
                  spender={bhoneyVaultContractAddress}
                  amount={parseUnits(
                    depositAmount === "" ? "0" : depositAmount,
                    18,
                  )}
                />
              ) : (
                <Button
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
                      address: bhoneyVaultContractAddress,
                      abi: bTokenAbi,
                      functionName: "deposit",
                      gasLimit: 1000000n,
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
                {`${maxDepositExceedingMessage}${
                  lastDailySupply
                    ? `The daily deposit limit will reset at ${format(
                        new Date((Number(lastDailySupply) + 86400) * 1000),
                        "MM/dd/yy, h:mma",
                      )}.`
                    : ""
                }
                `}
              </Alert>
            )}
          </TabsContent>

          <TabsContent
            value="withdraw"
            className="flex grow flex-col justify-between gap-4"
          >
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
                    symbol: "bHONEY",
                    address: bhoneyVaultContractAddress,
                    decimals: 18,
                    name: "bHONEY",
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
            <ActionButton>
              <Button
                disabled={
                  isWithdrawLoading || !withdrawAmount || isWithdrawExceeding
                }
                onClick={() =>
                  withdrawWrite({
                    address: bhoneyVaultContractAddress,
                    abi: bTokenAbi,
                    gasLimit: 1000000n,
                    functionName: "makeWithdrawRequest",
                    params: withdrawPayload,
                  })
                }
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
