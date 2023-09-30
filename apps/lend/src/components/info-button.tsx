import React from "react";
import Link from "next/link";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export default function InfoButton({ address }: { address: string }) {
  return (
    <Link href={`/markets/${address}`}>
      <Button variant={"outline"} className="w-fit py-[5px] text-sm leading-5">
        <Icons.info />
      </Button>
    </Link>
  );
}
