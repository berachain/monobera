import React from "react";
import Link from "next/link";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

import { validator } from "../data/validator";

export default function ValidatorDetailsPage({
  params: { validatorAddress },
}: {
  params: { validatorAddress: string };
}) {
  return (
    <div className="container">
      <Card>
        <CardHeader>
          <Link href="/stake" className="flex flex-row items-center gap-2">
            <Icons.chevronLeft className="h-5 w-5" />
            <h2 className="mt-0 text-lg font-medium">Validator Details</h2>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <h3 className="flex flex-row items-center gap-5">
              <Link
                href={validator.description.website}
                target="_blank"
                className="flex flex-row items-center gap-2 font-semibold"
              >
                <span className="text-2xl">Name</span>
                <span>
                  <Icons.external className="h-4 w-4" />
                </span>
              </Link>
              <span>
                <Badge variant="secondary">{validator.status}</Badge>{" "}
              </span>
            </h3>
            <h4 className="text-backgroundSecondary">
              <span className="font-medium">Operator BECH32 Address:</span>{" "}
              {validator.operator_address}
            </h4>
            <h4 className="text-backgroundSecondary">
              <span className="font-medium">Hex Address:</span>{" "}
              {validatorAddress}
            </h4>
          </div>
          <div className="mt-5 flex flex-row flex-wrap gap-2">
            <Button className="w-36">Stake</Button>
            <Link href={`/stake/${validatorAddress}/bribe`}>
              <Button className="w-36" variant="secondary">
                Bribe
              </Button>
            </Link>
            <Button className="w-36" variant="secondary">
              Redelegate
            </Button>
            <Button className="w-36" variant="secondary">
              Undelegate
            </Button>
          </div>
          <div className="mt-5">
            <h4 className="text-lg font-medium">Details</h4>
            <p className="text-backgroundSecondary">
              Meet the random blockchain validator, a crucial participant in the
              world of decentralized networks. This validator tirelessly
              contributes to the integrity and consensus of the blockchain by
              diligently verifying transactions and blocks. Armed with
              computational power and advanced cryptographic algorithms, this
              validator plays a key role in maintaining the trust and security
              of the network. Their responsibility lies in independently
              validating the accuracy and legitimacy of transactions, ensuring
              that no fraudulent or duplicate activities take place.
              Collaborating with other validators, they engage in a consensus
              mechanism, collectively deciding on the validity of new additions
              to the blockchain. With unwavering dedication to the
              network&apos;s rules and protocols, this random validator helps
              maintain the decentralization and immutability of the blockchain,
              ultimately fostering a transparent and efficient ecosystem.
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
                  <span>Current commission</span>
                  <span>{validator.commission.commission_rates.rate}</span>
                </p>
                <p className="mb-3 flex flex-row justify-between border-t border-backgroundSecondary pt-3">
                  <span>Max commission</span>
                  <span>{validator.commission.commission_rates.max_rate}</span>
                </p>
                <p className="mb-3 flex flex-row justify-between border-t border-backgroundSecondary pt-3">
                  <span>Max daily change</span>
                  <span>
                    {validator.commission.commission_rates.max_change_rate}
                  </span>
                </p>
                <p className="mb-3 flex flex-row justify-between border-t border-backgroundSecondary pt-3">
                  <span>Last changed</span>
                  <span>{validator.commission.update_time}</span>
                </p>
                <p className="mb-3 flex flex-row justify-between border-t border-backgroundSecondary pt-3">
                  <span>APR</span>
                  <span>69%</span>
                </p>
                <div className="mb-3 flex flex-row items-center justify-between border-t border-backgroundSecondary pt-3">
                  <p>Bribe rewards</p>
                  <div className="flex flex-row">
                    {Array.from(Array(3), (_, index) => (
                      <div
                        key={index}
                        className="ml-[-15px] h-10 w-10 rounded-full border-2 border-white bg-gray-300"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-center text-lg text-backgroundSecondary">
                Cutting board
              </h3>
              {/* Will replace with newly created PieChart component */}
              {/* <DynamicChart type="pie" chartData={{ name: "test", data: [] }} /> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
