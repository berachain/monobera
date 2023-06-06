import { Card, CardContent, CardHeader } from "@bera/ui/card";
import { Input } from "@bera/ui/input";
import { Separator } from "@bera/ui/separator";

import MyBalance from "~/components/my-balance";
import ValidatorsTable from "./stake/components/ValidatorsTable";
import { yourColumns } from "./stake/components/column";
import { validators } from "./stake/data/validators";

export default function Home() {
  return (
    <div className="container">
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
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between pb-0">
          <h3 className="text-lg font-medium">Your delegates</h3>
          <Input type="text" placeholder="Search" className="w-72" />
        </CardHeader>
        <CardContent>
          <ValidatorsTable columns={yourColumns} data={validators} />
        </CardContent>
      </Card>
    </div>
  );
}
