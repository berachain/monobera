"use";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Separator } from "@bera/ui/separator";

import MyBalance from "~/components/my-balance";
import { items } from "./dashboard/components/CuttingBoard";
import ValidatorsTable from "./stake/components/ValidatorsTable";
// import { yourColumns } from "./stake/components/column";

const DynamicChart = dynamic(() => import("~/components/cutting-board-chart"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Home() {
  return (
    <div className="container mb-10 flex flex-col gap-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-5">
            <MyBalance />

            <div>
              <Separator
                orientation="vertical"
                className="bg-backgroundSecondary"
              />
            </div>
            <div>
              <h4 className="text-foregroundSecondary">
                Redelegation cooldown
              </h4>
              <p className="text-2xl font-semibold">4 days</p>
            </div>
            <div>
              <Separator
                orientation="vertical"
                className="bg-backgroundSecondary"
              />
            </div>
            <div className="flex grow flex-wrap justify-between gap-3">
              <div>
                <h4 className="text-foregroundSecondary">Current Warmup</h4>
                <p className="text-2xl font-semibold">69</p>
              </div>
              <div>
                <h4 className="text-foregroundSecondary">Current cooldown</h4>
                <p className="text-2xl font-semibold">420</p>
              </div>
              <div>
                <h4 className="text-foregroundSecondary">Commisions</h4>
                <p className="text-2xl font-semibold">69%</p>
              </div>
              <div>
                <h4 className="text-foregroundSecondary">APY</h4>
                <p className="text-2xl font-semibold">69%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-10 gap-6">
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <h3 className="text-lg font-medium">Unbonding Queue</h3>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-5">
              {Array.from({ length: 5 }).map((_, i) => {
                return (
                  <div
                    key={i}
                    className="flex flex-row items-center justify-between gap-3 border-t pt-2"
                  >
                    <div className="flex flex-col">
                      <p className="text-foregroundSecondary">
                        10 BGT from Validator A
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="flex items-center text-foregroundSecondary">
                        21 Days left{" "}
                        <span className="ml-2">
                          <Icons.external className="h-4 w-4" />
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-6">
          <CardHeader className="flex flex-row items-center justify-between pb-0">
            <h3 className="text-lg font-medium">
              Average weight of your delegates
            </h3>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <DynamicChart items={items} />
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-0">
          <h3 className="text-lg font-medium">Your delegates</h3>
          <Input type="text" placeholder="Search" className="w-72" />
        </CardHeader>
        <CardContent>
          {/* <ValidatorsTable columns={yourColumns} data={validators} /> */}
        </CardContent>
      </Card>
    </div>
  );
}
