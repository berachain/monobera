import { useMemo, useState } from "react";
import {
  BGT_ABI,
  IContractWrite,
  SubgraphUserValidator,
  TransactionActionType,
  truncateHash,
  useBgtUnstakedBalance,
  useUserValidatorsSubgraph,
  useValidatorList,
} from "@bera/berajs";
import { bgtTokenAddress, blockTime } from "@bera/config";
import {
  FormattedNumber,
  Spinner,
  ValidatorIcon,
  useTxn,
} from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Skeleton } from "@bera/ui/skeleton";
import { Address, parseUnits } from "viem";
import { useBlock } from "wagmi";

export const HISTORY_BUFFER = 8192;

export const BoostQueue = ({
  selectedValidator,
  isValidatorDataLoading,
  setIsValidatorDataLoading,
}: {
  selectedValidator?: string | undefined;
  isValidatorDataLoading?: boolean;
  setIsValidatorDataLoading: (loading: boolean) => void;
}) => {
  const { data = [], refresh } = useUserValidatorsSubgraph();
  const { refresh: refreshBalance } = useBgtUnstakedBalance();

  const result = useBlock();
  const blockNumber = result?.data?.number;

  const queuedList = useMemo(() => {
    return !data || !blockNumber || !data.length
      ? []
      : data
          .filter((validator: SubgraphUserValidator) => {
            return parseFloat(validator.amountQueued) !== 0;
          })
          .map((validator: SubgraphUserValidator) => {
            return {
              ...validator,
              canActivate:
                parseInt(validator.latestBlock) +
                  HISTORY_BUFFER -
                  Number(blockNumber) <=
                0,
            };
          })
          .filter((validator: SubgraphUserValidator) => {
            return selectedValidator !== undefined
              ? validator.coinbase.toLowerCase() ===
                  selectedValidator.toLowerCase()
              : true;
          });
  }, [data, blockNumber]);

  const [hasSubmittedTxn, setHasSubmittedTxn] = useState<
    Record<number, boolean>
  >({} as any);

  const {
    write: activateWrite,
    isLoading: isActivationLoading,
    ModalPortal: ActivateModalPortal,
  } = useTxn({
    message: "Activating queued BGT to Validator",
    actionType: TransactionActionType.DELEGATE,
    onSuccess: () => {
      setIsValidatorDataLoading(true);
      setTimeout(() => {
        refresh();
        refreshBalance();
        setHasSubmittedTxn({} as any);
        setIsValidatorDataLoading(false);
      }, 5000);
    },
  });

  const {
    write: cancelWrite,
    isLoading: isCancelLoading,
    ModalPortal: CancelModalPortal,
  } = useTxn({
    message: "Cancelling queued BGT to Validator",
    actionType: TransactionActionType.DELEGATE,
    onSuccess: () => {
      setIsValidatorDataLoading(true);
      setTimeout(() => {
        refresh();
        refreshBalance();
        setHasSubmittedTxn({} as any);
        setIsValidatorDataLoading(false);
      }, 5000);
    },
  });

  const handleTransaction = (
    index: number,
    isActivate: boolean,
    props: IContractWrite,
  ) => {
    setHasSubmittedTxn({ ...hasSubmittedTxn, [index]: true } as any);
    if (isActivate) {
      activateWrite(props);
    } else {
      cancelWrite(props);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {ActivateModalPortal}
      {CancelModalPortal}
      <div className="flex items-center">
        <div className="mr-2 text-lg font-semibold leading-7">
          Delegation Queue
        </div>
        {isValidatorDataLoading && <Spinner size={18} color="white" />}
      </div>

      {!queuedList ? (
        <div>
          <Skeleton className="h-28 w-full rounded-md" />
          <Skeleton className="h-28 w-full rounded-md" />
        </div>
      ) : (
        <>
          {queuedList?.map(
            (validator: SubgraphUserValidator, index: number) => (
              <ConfirmationCard
                key={validator.coinbase}
                userValidator={validator}
                index={index}
                hasSubmittedTxn={hasSubmittedTxn[index] ?? false}
                blocksLeft={
                  parseInt(validator.latestBlock) +
                  HISTORY_BUFFER -
                  Number(blockNumber)
                }
                isTxnLoading={isActivationLoading || isCancelLoading}
                handleTransaction={handleTransaction}
              />
            ),
          )}
          {!queuedList?.length && (
            <div className="text-muted-foreground">No validators in queue</div>
          )}
        </>
      )}
    </div>
  );
};

const ConfirmationCard = ({
  userValidator,
  blocksLeft,
  isTxnLoading,
  index,
  hasSubmittedTxn,
  handleTransaction,
}: {
  userValidator: SubgraphUserValidator;
  blocksLeft: number;
  isTxnLoading: boolean;
  index: number;
  hasSubmittedTxn: boolean;
  handleTransaction: (
    index: number,
    isActivate: boolean,
    props: IContractWrite,
  ) => void;
}) => {
  const width = userValidator.canActivate
    ? 100
    : Math.round(Math.abs(1 - blocksLeft / HISTORY_BUFFER) * 100);

  const timeText = (
    <span className=" text-info-foreground">{blocksLeft} blocks remaining</span>
  );

  const { data } = useValidatorList();

  const coinbase = userValidator.coinbase;
  const validatorInfo = data?.validatorDictionary
    ? data.validatorDictionary[coinbase]
    : undefined;

  return (
    <div className="w-full rounded-md border border-border p-4">
      <div className="flex w-full justify-between">
        <div className="font-medium">
          <div className="flex items-center gap-2">
            <ValidatorIcon
              address={userValidator.coinbase as Address}
              className="h-8 w-8"
              // imgOverride={userValidator.metadata?.logoURI}
            />
            <div>
              {validatorInfo?.name ?? truncateHash(userValidator.coinbase)}
            </div>
          </div>
          <div className="ml-8 text-muted-foreground ">
            <FormattedNumber
              showIsSmallerThanMin
              value={userValidator.amountQueued}
              compact
            />{" "}
            BGT
          </div>
        </div>
        <div>
          <Button
            variant="ghost"
            disabled={
              isTxnLoading || !userValidator.canActivate || hasSubmittedTxn
            }
            onClick={() =>
              handleTransaction(index, true, {
                address: bgtTokenAddress,
                abi: BGT_ABI,
                functionName: "activateBoost",
                params: [userValidator.coinbase],
              })
            }
          >
            Confirm
          </Button>
          <Button
            variant="ghost"
            disabled={isTxnLoading || hasSubmittedTxn}
            onClick={() =>
              handleTransaction(index, false, {
                address: bgtTokenAddress,
                abi: BGT_ABI,
                functionName: "cancelBoost",
                params: [
                  userValidator.coinbase,
                  parseUnits(userValidator.amountQueued, 18),
                ],
              })
            }
          >
            Cancel
          </Button>
        </div>
      </div>

      <div className="mt-6 pl-8 pr-4">
        <div className="h-[9px] overflow-hidden rounded border border-border">
          <div
            className={cn(
              userValidator.canActivate
                ? "bg-success-foreground"
                : "bg-info-foreground",
              "h-full",
            )}
            style={{ width: `${width}%` }}
          />
        </div>
        <div className="flex justify-between pt-2 text-sm font-medium leading-6">
          {userValidator.canActivate ? (
            <div className="text-success-foreground">
              Ready for confirmation
            </div>
          ) : (
            <div>Confirmation Wait Duration</div>
          )}
          <div>{!userValidator.canActivate && timeText}</div>
        </div>
      </div>
    </div>
  );
};
