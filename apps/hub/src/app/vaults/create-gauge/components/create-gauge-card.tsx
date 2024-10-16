"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Input } from "@bera/ui/input";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Tooltip } from "@bera/shared-ui";

interface VaultInfo {
  name: string;
  totalSupply: string;
  status: "Available" | "Already exists" | "Reached";
}

export const CreateGaugeCard: React.FC = () => {
  const [targetAddress, setTargetAddress] = useState("");
  const [vaultInfo, setVaultInfo] = useState<VaultInfo | null>(null);

  useEffect(() => {
    // Simulating API call to fetch vault info
    if (targetAddress) {
      // This is a mock function. In a real scenario, you'd make an API call here.
      const mockFetchVaultInfo = () => {
        if (targetAddress === "0x79f453D56C4bC66586215827FbBc7B34Bc006b33") {
          setVaultInfo({ name: "Bong LP", totalSupply: "12 Mln", status: "Available" });
        } else if (targetAddress === "0xb73deE52F38539bA854979eab6342A60dD4C8c03") {
          setVaultInfo({ name: "HONEY-USDC", totalSupply: "10 Mln", status: "Already exists" });
        } else {
          setVaultInfo(null);
        }
      };
      mockFetchVaultInfo();
    } else {
      setVaultInfo(null);
    }
  }, [targetAddress]);

  const handleCreateVault = () => {
    // Logic to create the vault
    console.log("Creating vault for address:", targetAddress);
  };

  return (
    <Card className="w-full max-w-md mx-auto my-12">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create new Reward Vault</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="targetAddress" className="block text-sm font-medium mb-1">
            Target Contract Address
          </label>
          <Input
            id="targetAddress"
            placeholder="Enter the target address"
            value={targetAddress}
            onChange={(e) => setTargetAddress(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Name
              <Tooltip className="ml-1" text="The name of the Reward Vault" />
            </label>
            <span>{vaultInfo?.name || "—"}</span>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Total supply
              <Tooltip className="ml-1" text="The total supply of the Reward Vault" />
            </label>
            <span>{vaultInfo?.totalSupply || "—"}</span>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Status
              <Tooltip className="ml-1" text="The status of the Reward Vault" />
            </label>
            <div className="flex items-center">
              {vaultInfo ? (
                <>
                  <span className={vaultInfo.status === "Available" ? "text-green-500" : "text-red-500"}>
                    {vaultInfo.status}
                  </span>
                  {vaultInfo.status === "Available" && <Icons.checkCircle className="h-4 w-4 text-green-500 ml-1" />}
                  {vaultInfo.status === "Already exists" && <Icons.xCircle className="h-4 w-4 text-red-500 ml-1" />}
                </>
              ) : (
                <span>—</span>
              )}
            </div>
          </div>
        </div>
        <Button 
          className="w-full" 
          onClick={handleCreateVault}
          disabled={!vaultInfo || vaultInfo.status !== "Available"}
        >
          Create Rewards Vault
        </Button>
      </CardContent>
    </Card>
  );
};