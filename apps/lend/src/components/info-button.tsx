import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export default function InfoButton({ address }: { address: string }) {
  const router = useRouter();
  return (
    <Button
      variant={"outline"}
      onClick={() => router.push(`/markets/address=${address}`)}
    >
      <Icons.info />
    </Button>
  );
}
