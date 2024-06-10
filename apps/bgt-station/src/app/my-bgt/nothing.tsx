import Link from "next/link";
import { docsUrl } from "@bera/config";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";

export default function Nothing({ message }: { message: string }) {
  return (
    <div className="container flex max-w-[764px] flex-col gap-8">
      <div className="text-center text-lg font-semibold leading-7 text-muted-foreground sm:text-xl">
        {message}{" "}
      </div>
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Card className="flex-1 px-12 py-8">
          <div className="flex h-12 items-center gap-3 text-lg font-semibold leading-7 text-muted-foreground">
            {" "}
            <div className="text-[31.12px]">📜</div>How to delegate
          </div>
          <div className="mb-8 text-xl font-semibold leading-7">
            Not sure how to get started? We’ll show you how to delegate
          </div>
          <Link href={docsUrl} target="_blank">
            <Button className="w-full"> Checkout Docs</Button>
          </Link>
        </Card>
        <Card className="flex-1 px-12 py-8">
          <div className="flex h-12 items-center gap-3 text-lg font-semibold leading-7 text-muted-foreground">
            {" "}
            <div className="text-[31.12px]">🤝</div>Delegate now
          </div>
          <div className="mb-8 text-xl font-semibold leading-7">
            Already know what to do? Then let’s get you delegating
          </div>
          <Link href="/validators">
            <Button className="w-full" variant="outline">
              {" "}
              See Validators
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
