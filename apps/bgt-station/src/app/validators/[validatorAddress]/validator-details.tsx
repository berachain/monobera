"use client";

import React from "react";
// import dynamic from "next/dynamic";
// import Link from "next/link";
import {
  // usePollAccountDelegations,
  usePollActiveValidators,
  // usePollUnbondingDelegations,
  // type Bribe,
} from "@bera/berajs";

// import { Button } from "@bera/ui/button";
// import { Card, CardContent, CardHeader } from "@bera/ui/card";
// import { Icons } from "@bera/ui/icons";
// import { formatUnits } from "viem";

// import BribesList from "~/components/bribes-list";
// import { ValidatorDescription } from "../components/ValidatorDescription";
// import DelegateButton from "./components/DelegateButton";
// import UnbondButton from "./components/UnbondButton";

// const DynamicChart = dynamic(() => import("~/components/cutting-board-chart"), {
//   loading: () => <p>Loading...</p>,
//   ssr: false,
// });

export default function ValidatorDetails({
  validatorAddress,
}: {
  validatorAddress: string;
}) {
  const {
    // useSelectedValidatorActiveBribes,
    // useActiveValidator,
    // useTotalDelegated,
    usePollSelectedValidatorCuttingBoard,
  } = usePollActiveValidators();
  const cuttingBoard = usePollSelectedValidatorCuttingBoard(validatorAddress);
  console.log("cb", cuttingBoard, validatorAddress);
  // const validator = useActiveValidator(validatorAddress);
  // const totalDelegated = useTotalDelegated();
  // const bribes: Bribe | undefined =
  //   useSelectedValidatorActiveBribes(validatorAddress);
  // console.log("bribes", bribes);
  // const { useSelectedAccountDelegation } =
  //   usePollAccountDelegations(validatorAddress);
  // const accountDelegation = useSelectedAccountDelegation();
  // const { useTotalUnbonding } = usePollUnbondingDelegations(validatorAddress);
  // const totalUnbonding = useTotalUnbonding();
  // const items = cuttingBoard?.map((cb) => ({
  //   weight: parseFloat(cb.weight) * 100,
  //   detail: {
  //     symbol: cb.symbol,
  //   },
  // }));

  // console.log(formatUnits(validator?.delegatorShares ?? 0n, 36));
  return (
    <div className="container mb-10 flex gap-5">
      {/* <div className="flex w-2/3 flex-col gap-5">
        <Card>
          <CardHeader>
            <Link href="/stake" className="flex flex-row items-center gap-2">
              <Icons.chevronLeft className="h-5 w-5" />
              <h2 className="mt-0 text-lg font-medium">Validator Details</h2>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="mt-5">
              <h4 className="text-lg font-medium">Details</h4>
              <p className="text-backgroundSecondary">
                {validator?.description.details ?? ""}
              </p>
            </div>
            <div className="mt-5 flex flex-row flex-wrap gap-5">
              <div className="grow">
                <div className="text-backgroundSecondary">
                  <p className="mb-3 flex flex-row justify-between border-t border-backgroundSecondary pt-3">
                    <span className="font-medium">Voting power</span>
                    <span>
                      {(
                        (Number(
                          formatUnits(validator?.delegatorShares ?? 0n, 18),
                        ) *
                          100) /
                        totalDelegated
                      ).toFixed(2)}
                      % ({formatUnits(validator?.delegatorShares ?? 0n, 18)}{" "}
                      BGT)
                    </span>
                  </p>
                  <p className="mb-3 flex flex-row justify-between border-t border-backgroundSecondary pt-3">
                    <span className="font-medium">Current commission</span>
                    <span>
                      {Number(
                        formatUnits(
                          validator?.commission.commissionRates.rate ?? 0n,
                          18,
                        ),
                      ) * 100}
                      %
                    </span>
                  </p>
                  <p className="mb-3 flex flex-row justify-between border-t border-backgroundSecondary pt-3">
                    <span className="font-medium">Max commission</span>
                    <span>
                      {Number(
                        formatUnits(
                          validator?.commission.commissionRates.maxRate ?? 0n,
                          18,
                        ),
                      ) * 100}
                      %
                    </span>
                  </p>
                  <p className="mb-3 flex flex-row justify-between border-t border-backgroundSecondary pt-3">
                    <span className="font-medium">Max daily change</span>
                    <span>
                      {Number(
                        formatUnits(
                          validator?.commission.commissionRates.maxChangeRate ??
                            0n,
                          18,
                        ),
                      ) * 100}
                      %
                    </span>
                  </p>
                  <p className="mb-3 flex flex-row justify-between border-t border-backgroundSecondary pt-3">
                    <span className="font-medium">Last changed</span>
                    <span>
                      {validator?.commission.updateTime
                        ? validator.commission.updateTime.toString()
                        : "-"}
                    </span>
                  </p>
                  <p className="mb-3 flex flex-row justify-between border-t border-backgroundSecondary pt-3">
                    <span className="font-medium">APR</span>
                    <span>-%</span>
                  </p>
                  <div className="mb-3 flex flex-row items-center justify-between border-t border-backgroundSecondary pt-3">
                    <p className="font-medium">Bribe rewards</p>
                    <BribesList bribes={bribes} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="mt-0 text-lg font-medium">Your stats</h2>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row flex-wrap gap-5">
              <div className="grow">
                <div className="text-backgroundSecondary">
                  <p className="mb-3 flex flex-row justify-between border-t border-backgroundSecondary pt-3">
                    <span className="font-medium">Delegated</span>
                    <span>{formatUnits(accountDelegation ?? 0n, 0)}</span>
                  </p>
                  <p className="mb-3 flex flex-row justify-between border-t border-backgroundSecondary pt-3">
                    <span className="font-medium">Pending Unbonding</span>
                    <span>{totalUnbonding ?? 0}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-4 gap-5">
              <DelegateButton
                validator={validator}
                validatorAddress={validatorAddress}
              />
              <Link href={`/stake/${validatorAddress}/redelegate`}>
                <Button className="w-full" variant="secondary">
                  Redelegate
                </Button>
              </Link>
              <UnbondButton
                validator={validator}
                validatorAddress={validatorAddress}
              />
              <Link href={`/stake/${validatorAddress}/bribe`}>
                <Button className="w-full" variant="secondary">
                  Bribe
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div> */}
      {/* <div className="flex w-1/3 flex-col gap-5">
        <Card>
          <CardHeader>
            <h2 className="mt-0 text-lg font-medium">Emission Allocation</h2>
          </CardHeader>
          <CardContent>
            <DynamicChart items={items} />
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
}
