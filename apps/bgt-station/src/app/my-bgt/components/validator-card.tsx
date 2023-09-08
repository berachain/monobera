import { useRouter } from "next/navigation";
import {
  BRIBE_PRECOMPILE_ABI,
  useBeraJs,
  usePollAccountDelegations,
  usePollActiveValidators,
  usePollBribes,
  type PoLValidator,
} from "@bera/berajs";
import { formatUsd } from "@bera/berajs/src/utils";
import { TokenIconList, Tooltip, ValidatorIcon, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { useSWRConfig } from "swr";
import { formatEther, type Address } from "viem";

import { usePollPrices } from "~/hooks/usePollPrices";

export default function ValidatorCard({
  validator,
}: {
  validator: PoLValidator;
}) {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { account } = useBeraJs();

  const { usePercentageDelegated } = usePollActiveValidators();
  const percentageDelegated = usePercentageDelegated(
    validator.operatorAddr as Address,
  );

  const { useSelectedAccountDelegation } = usePollAccountDelegations(
    validator.operatorAddr as Address,
  );
  const userDelegated = useSelectedAccountDelegation();

  const { usePrices } = usePollPrices();
  const prices = usePrices();
  const { useValidatorBribeTotal, useValidatorUserBribes, QUERY_KEY } =
    usePollBribes();

  const bribeTotal = useValidatorBribeTotal(validator.operatorAddr, prices);
  const userBribeTokenList = useValidatorUserBribes(validator.operatorAddr);
  const { write, ModalPortal } = useTxn({
    message: "Claiming bribes",
    onSuccess: () => {
      void mutate(QUERY_KEY);
    },
  });

  console.log(userBribeTokenList);
  const valiInfo = [
    {
      title: (
        <div>
          BGT Delegated{" "}
          <Tooltip text="amount of BGT that you delegated to this validator." />
        </div>
      ),
      value: `${Number(userDelegated ?? 0).toFixed(2)}`,
    },
    {
      title: (
        <div>
          Voting power{" "}
          <Tooltip text="represents a delegator's influence in validator decisions." />
        </div>
      ),
      value: `${percentageDelegated?.toFixed(2) ?? 0}%`,
    },
    {
      title: (
        <div>
          Commision{" "}
          <Tooltip text="amount of validator rewards retained by this validator." />
        </div>
      ),
      value: `${(
        Number(formatEther(validator.commission.commissionRates.rate)) * 100
      ).toFixed(2)}%`,
    },
    {
      title: (
        <div>
          vAPY <Tooltip text="projected measure of potential yearly earnings" />
        </div>
      ),
      value: `${Number(validator.vApy).toFixed(2)}%`,
    },
    {
      title: (
        <div>
          Bribes Earned{" "}
          <Tooltip text="total bribes earned from delegating to this validator" />
        </div>
      ),
      value: `${formatUsd(bribeTotal ?? 0)}`,
    },
  ];

  const claimBribe = () => {
    console.log(account, validator.operatorAddr);
    write({
      address: process.env.NEXT_PUBLIC_ERC20BRIBEMODULE_ADDRESS as Address,
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
          <ValidatorIcon address={validator.operatorAddr as Address} />
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
            disabled={userBribeTokenList.length === 0}
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
        <div className="mr-4 flex items-center gap-4">
          <TokenIconList size="2xl" tokenList={validator.bribeTokenList} />
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
            disabled={userBribeTokenList.length === 0}
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
