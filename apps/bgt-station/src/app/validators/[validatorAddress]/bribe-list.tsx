import Image from "next/image";
import { Card } from "@bera/ui/card";

const list = [
  {
    amount: 1000,
    usAmount: 32000,
    totalBribes: 10,
    proposalLeft: 6,
    countDown: 1692051635,
  },
  {
    amount: 1000,
    usAmount: 32000,
    totalBribes: 10,
    proposalLeft: 6,
    countDown: 1692051635,
  },
  {
    amount: 1000,
    usAmount: 32000,
    totalBribes: 10,
    proposalLeft: 6,
    countDown: 1692051635,
  },
];

export default function BribeList() {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      {list.map((item, index) => (
        <Card key={index} className="flex flex-1 flex-col gap-3 p-8">
          <div className="flex items-center gap-2">
            <Image
              src={"/icons/bera-icons.svg"}
              alt="bera-icons"
              height={32}
              width={32}
            />
            <div>{item.amount} BERA</div>
          </div>
          <div className=" flex flex-col gap-2 text-sm font-medium leading-tight text-muted-foreground">
            <div>${item.usAmount} ($200 per block)</div>
            <div>{item.totalBribes}% of total bribes</div>
          </div>
          <div className="flex justify-between text-sm font-medium leading-tight text-primary-foreground">
            <div>{item.proposalLeft} proposals left</div>
            <div>{item.countDown}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}
