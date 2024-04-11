import { useRouter } from "next/navigation";
import {
  BRIBE_PRECOMPILE_ABI,
  TransactionActionType,
  useBeraJs,
} from "@bera/berajs";
import { formatUsd } from "@bera/berajs/src/utils";
import { erc20BribeModule } from "@bera/config";
import {
  BribeApyTooltip,
  TokenIconList,
  Tooltip,
  ValidatorIcon,
  useTxn,
} from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { useSWRConfig } from "swr";
import { formatEther, type Address } from "viem";

export default function ValidatorCard({
  validator,
}: {
  validator: any;
}) {
  const router = useRouter();
  const { account } = useBeraJs();
  const userDelegated = undefined
  const bribeTotal = undefined
  const { write, ModalPortal } = useTxn({
    message: "Claiming bribes",
    actionType: TransactionActionType.CLAIMING_BRIBES,
  });

  const valiInfo = [
    {
      title: (
        <div className="flex flex-row items-center gap-1">
          BGT Delegated{" "}
          <Tooltip text="Amount of BGT that you delegated to this validator." />
        </div>
      ),
      value: `${Number(userDelegated ?? 0).toFixed(2)}`,
    },
    {
      title: (
        <div className="flex flex-row items-center gap-1">
          Voting power{" "}
          <Tooltip text="Represents the influence in network governance based on amount delegated to this validator" />
        </div>
      ),
      value: "0",
    },
    {
      title: (
        <div className="flex flex-row items-center gap-1">
          Commision{" "}
          <Tooltip text="Amount of validator rewards retained by this validator" />
        </div>
      ),
      value: `${(
        Number(formatEther(validator.commission.commissionRates.rate)) * 100
      ).toFixed(2)}%`,
    },
    {
      title: (
        <div className="flex flex-row items-center gap-1">
          APY <BribeApyTooltip />
        </div>
      ),
      value: `${Number(validator.vApy).toFixed(2)}%`,
    },
    {
      title: (
        <div className="flex flex-row items-center gap-1">
          Bribes Earned{" "}
          <Tooltip text="Total amount of bribes accrued from this validator" />
        </div>
      ),
      value: `${formatUsd(bribeTotal ?? 0)}`,
    },
  ];
  const claimBribe = () => {
    write({
      address: erc20BribeModule as Address,
      abi: BRIBE_PRECOMPILE_ABI,
      functionName: "claimValidatorBribes",
      params: [account, validator.operatorAddr],
    });
  };
  return (
    <Card className="p-6 ">
      {ModalPortal}
      <div className="flex items-center justify-center md:justify-between">
        <div className="flex items-center gap-3">
          <ValidatorIcon
            address={validator.operatorAddr as Address}
            description={validator?.description?.identity ?? undefined}
          />
          <div className="text-lg font-semibold leading-loose text-foreground md:text-2xl">
            {validator.description.moniker}
          </div>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              router.push(
                `/delegate?action=delegate&validator=${validator.operatorAddr}`,
              )
            }
          >
            Delegate <Icons.add className="relative ml-1 h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              router.push(
                `/delegate?action=redelegate&validator=${validator.operatorAddr}`,
              )
            }
          >
            Redelegate <Icons.redo className="relative ml-1 h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              router.push(
                `/delegate?action=unbond&validator=${validator.operatorAddr}`,
              )
            }
          >
            Unbond <Icons.minus className="relative ml-1 h-4 w-4" />
          </Button>
          <Button
            size="sm"
            onClick={claimBribe}
          >
            Claim Bribes
          </Button>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div className="flex w-full flex-col items-center md:flex-row md:gap-4">
          {valiInfo.map((item, index) => (
            <div
              className="flex w-full items-center justify-between gap-1 py-1 md:w-fit md:flex-col md:justify-center md:px-4 md:py-2"
              key={index}
            >
              <div className="w-full text-xs font-medium leading-tight text-muted-foreground">
                {item.title}
              </div>
              <div className="text-left text-base font-medium leading-normal md:w-full">
                {item.value}
              </div>
            </div>
          ))}
        </div>
        <div className="mr-4 flex flex-shrink-0 items-center gap-4">
          {!validator.bribeTokenList ||
          validator.bribeTokenList.length === 0 ? (
            <div className="text-muted-foreground">No active bribes</div>
          ) : (
            <TokenIconList size="2xl" tokenList={[]} />
          )}
        </div>
        <div className="flex items-center justify-center gap-4 md:hidden">
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              router.push(
                `/delegate?action=delegate&validator=${validator.operatorAddr}`,
              )
            }
          >
            <Icons.add className="relative h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              router.push(
                `/delegate?action=redelegate&validator=${validator.operatorAddr}`,
              )
            }
          >
            <Icons.redo className="relative h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              router.push(
                `/delegate?action=unbond&validator=${validator.operatorAddr}`,
              )
            }
          >
            <Icons.minus className="relative h-4 w-4" />
          </Button>
          <Button
            size="sm"
            onClick={claimBribe}
          >
            Claim Bribes
          </Button>
        </div>
      </div>
    </Card>
  );
}
