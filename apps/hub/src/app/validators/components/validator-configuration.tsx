import { useCallback, useState } from "react";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Address } from "viem";
import { CuttingBoardConfiguration } from "./cutting-board-configuration";

export const ValidatorConfiguration = ({
  validatorAddress,
}: {
  validatorAddress: Address;
}) => {
  const [operatorAddress, setOperatorAddress] = useState<string>("");
  const [commission, setCommission] = useState<string>("0");

  const handleSaveSettings = useCallback(() => {
    console.log("changing settings", validatorAddress);
  }, []);

  const handleUpdateMetadata = useCallback(() => {
    console.log("updating metadata", validatorAddress);
  }, []);

  return (
    <div className="mt-10 flex flex-col gap-6">
      <Card className="flex flex-col gap-1 p-4">
        <span className="text-2xl font-bold">Berachef Weight</span>
        <span className="text-sm text-muted-foreground">
          Configure your gauge distribution weighting
        </span>
        <CuttingBoardConfiguration />
      </Card>
      <Card className="flex flex-col gap-1 p-4">
        <span className="text-2xl font-bold">General Settings</span>
        <span className="text-sm text-muted-foreground">
          Configure your operator address & commission
        </span>
        <span className="mt-2 flex font-semibold">Operator Address</span>
        <Input
          type="input"
          className="w-[300px]"
          value={operatorAddress}
          onChange={(e) => setOperatorAddress(e.target.value)}
        />
        <span className="mt-2 flex font-semibold">Commission</span>
        <Input
          type="input"
          className="w-[300px]"
          value={commission}
          onChange={(e) => setCommission(e.target.value)}
        />
        <div className="my-4 border-b border-border" />
        <Button
          className="flex w-[100px] self-end border border-border p-2"
          size={"sm"}
          onClick={handleSaveSettings}
        >
          {"Save"}
        </Button>
      </Card>
      <Card className="flex flex-col gap-1 p-4">
        <span className="text-2xl font-bold">Update your metadata</span>
        <span className="text-sm text-muted-foreground">
          Configure and modify your validator metadata
        </span>
        <div
          className="mt-2 flex cursor-pointer items-center text-xl font-bold"
          onClick={handleUpdateMetadata}
        >
          {"Coming Soon"}
          {/* <Icons.arrowRight className="ml-1 cursor-pointer" /> */}
        </div>
      </Card>
    </div>
  );
};
