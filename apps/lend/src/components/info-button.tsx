import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export default function InfoButton({ address }: { address: string }) {
  const router = useRouter();
  return (
    <Button
      variant={"outline"}
      className="w-fit py-[5px] text-sm leading-5"
      onClick={() => router.push(`/markets/address=${address}`)}
    >
      <Icons.info />
    </Button>
  );
}
