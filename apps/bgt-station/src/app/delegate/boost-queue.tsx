import {
  BGT_ABI,
  IContractWrite,
  TransactionActionType,
  UserValidator,
  useUserValidators,
} from "@bera/berajs";
import { bgtTokenAddress, blockTime } from "@bera/config";
import {
  FormattedNumber,
  ValidatorIcon,
  timeDifferenceFromNow,
  useTxn,
} from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { useMemo } from "react";
import { parseUnits } from "viem";
import { useBlock } from "wagmi";

export const HISTORY_BUFFER = 8192;
export const BoostQueue = () => {
  const { data, refresh } = useUserValidators();
  const result = useBlock();
  const blockNumber = result?.data?.number;

  const queuedList = useMemo(() => {
    return !data
      ? []
      : data
          .filter((validator) => {
            return parseFloat(validator.userQueued) !== 0;
          })
          .map((validator) => {
            return {
              ...validator,
              canActivate:
                parseInt(validator.latestBlock) +
                  HISTORY_BUFFER -
                  Number(blockNumber) <=
                0,
            };
          });
  }, [data, blockNumber]);

  const {
    write: activateWrite,
    isLoading: isActivationLoading,
    ModalPortal: ActivateModalPortal,
  } = useTxn({
    message: "Activating queued BGT to Validator",
    actionType: TransactionActionType.DELEGATE,
    onSuccess: () => {
      refresh();
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
      refresh();
    },
  });

  return (
    <div className="flex flex-col gap-3">
      {ActivateModalPortal}
      {CancelModalPortal}
      <div className="text-lg font-semibold leading-7">Delegation Queue</div>
      {queuedList?.map((validator) => (
        <ConfirmationCard
          key={validator.id}
          userValidator={validator}
          blocksLeft={
            parseInt(validator.latestBlock) +
            HISTORY_BUFFER -
            Number(blockNumber)
          }
          isTxnLoading={isActivationLoading || isCancelLoading}
          activateWrite={activateWrite}
          cancelWrite={cancelWrite}
        />
      ))}
      {!queuedList?.length && (
        <div className="text-muted-foreground">No validators in queue</div>
      )}
    </div>
  );
};

const ConfirmationCard = ({
  userValidator,
  blocksLeft,
  isTxnLoading,
  activateWrite,
  cancelWrite,
}: {
  userValidator: UserValidator;
  blocksLeft: number;
  isTxnLoading: boolean;
  activateWrite: (props: IContractWrite) => void;
  cancelWrite: (props: IContractWrite) => void;
}) => {
  const width = userValidator.canActivate
    ? 100
    : Math.round(Math.abs(1 - HISTORY_BUFFER / blocksLeft) * 100);
  const time =
    parseInt(userValidator.latestBlockTime) + HISTORY_BUFFER * blockTime;

  const timeText = (
    <span className=" text-info-foreground">{timeDifferenceFromNow(time)}</span>
  );
  return (
    <div className="w-full rounded-md border border-border p-4">
      <div className="flex w-full justify-between">
        <div className="font-medium">
          <div className="flex items-center gap-2">
            <ValidatorIcon address={userValidator.id} className="h-8 w-8" />
            <div>{userValidator.metadata.name}</div>
          </div>
          <div className="ml-8 text-muted-foreground ">
            <FormattedNumber value={userValidator.userQueued} compact /> BGT
          </div>
        </div>
        <div>
          <Button
            variant="ghost"
            disabled={isTxnLoading}
            onClick={() =>
              activateWrite({
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
            disabled={isTxnLoading}
            onClick={() =>
              cancelWrite({
                address: bgtTokenAddress,
                abi: BGT_ABI,
                functionName: "cancelBoost",
                params: [
                  userValidator.coinbase,
                  parseUnits(userValidator.userQueued, 18),
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
        <div className="flex justify-between text-sm font-medium leading-6 pt-2">
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
