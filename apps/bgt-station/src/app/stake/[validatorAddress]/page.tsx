import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

import BribesList from "~/components/bribes-list";
import { items } from "~/app/dashboard/components/CuttingBoard";
import { ValidatorDescription } from "../components/ValidatorDescription";
import { validator } from "../data/validator";
import DelegateButton from "./components/DelegateButton";

const DynamicChart = dynamic(() => import("~/components/cutting-board-chart"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

function getRandomBoolean(): boolean {
  return Math.random() < 0.5;
}

export default function ValidatorDetailsPage({
  params: { validatorAddress },
}: {
  params: { validatorAddress: `0x{string}` };
}) {
  return (
    <div className="container mb-10 flex gap-5">
      <div className="flex w-2/3 flex-col gap-5">
        <Card>
          <CardHeader>
            <Link href="/stake" className="flex flex-row items-center gap-2">
              <Icons.chevronLeft className="h-5 w-5" />
              <h2 className="mt-0 text-lg font-medium">Validator Details</h2>
            </Link>
          </CardHeader>
          <CardContent>
            <ValidatorDescription
              validator={validator}
              validatorAddress={validatorAddress}
            />

            <div className="mt-5">
              <h4 className="text-lg font-medium">Details</h4>
              <p className="text-backgroundSecondary">
                Meet the random blockchain validator, a crucial participant in
                the world of decentralized networks. This validator tirelessly
                contributes to the integrity and consensus of the blockchain by
                diligently verifying transactions and blocks. Armed with
                computational power and advanced cryptographic algorithms, this
                validator plays a key role in maintaining the trust and security
                of the network. Their responsibility lies in independently
                validating the accuracy and legitimacy of transactions, ensuring
                that no fraudulent or duplicate activities take place.
                Collaborating with other validators, they engage in a consensus
                mechanism, collectively deciding on the validity of new
                additions to the blockchain. With unwavering dedication to the
                network&apos;s rules and protocols, this random validator helps
                maintain the decentralization and immutability of the
                blockchain, ultimately fostering a transparent and efficient
                ecosystem.
              </p>
            </div>
            <div className="mt-5 flex flex-row flex-wrap gap-5">
              <div className="grow">
                <div className="text-backgroundSecondary">
                  <p className="mb-3 flex flex-row justify-between border-t border-backgroundSecondary pt-3">
                    <span className="font-medium">Voting power</span>
                    <span>69% (666,666,666 BGT)</span>
                  </p>
                  <p className="mb-3 flex flex-row justify-between border-t border-backgroundSecondary pt-3">
                    <span className="font-medium">Current commission</span>
                    <span>{validator.commission.commission_rates.rate}</span>
                  </p>
                  <p className="mb-3 flex flex-row justify-between border-t border-backgroundSecondary pt-3">
                    <span className="font-medium">Max commission</span>
                    <span>
                      {validator.commission.commission_rates.max_rate}
                    </span>
                  </p>
                  <p className="mb-3 flex flex-row justify-between border-t border-backgroundSecondary pt-3">
                    <span className="font-medium">Max daily change</span>
                    <span>
                      {validator.commission.commission_rates.max_change_rate}
                    </span>
                  </p>
                  <p className="mb-3 flex flex-row justify-between border-t border-backgroundSecondary pt-3">
                    <span className="font-medium">Last changed</span>
                    <span>{validator.commission.update_time}</span>
                  </p>
                  <p className="mb-3 flex flex-row justify-between border-t border-backgroundSecondary pt-3">
                    <span className="font-medium">APR</span>
                    <span>69%</span>
                  </p>
                  <div className="mb-3 flex flex-row items-center justify-between border-t border-backgroundSecondary pt-3">
                    <p className="font-medium">Bribe rewards</p>
                    <BribesList />
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
                    <span>0</span>
                  </p>
                  <p className="mb-3 flex flex-row justify-between border-t border-backgroundSecondary pt-3">
                    <span className="font-medium">Unbonding</span>
                    <span>0</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-4 gap-5">
              <DelegateButton
                validator={validator}
                validatorAddress={validatorAddress}
              />

              <Button className="w-full" variant="secondary">
                Redelegate
              </Button>
              <Button className="w-full" variant="secondary">
                Unbond
              </Button>
              <Link href={`/stake/${validatorAddress}/bribe`}>
                <Button className="w-full" variant="secondary">
                  Bribe
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex w-1/3 flex-col gap-5">
        <Card>
          <CardHeader>
            <h2 className="mt-0 text-lg font-medium">Cutting wheel</h2>
          </CardHeader>
          <CardContent>
            <DynamicChart items={items} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="mt-0 text-lg font-medium">Uptime</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 justify-center gap-5">
              {Array.from(Array(54), (_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-8 w-8 rounded-lg",
                    getRandomBoolean() ? "bg-green-300" : "bg-red-300",
                  )}
                ></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
