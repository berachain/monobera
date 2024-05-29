import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { TokenIconList } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";

export const GeneralInfo = () => {
  const gauges = [
    {
      title: "HONEY / bHONEY",
      bgt: 126.42,
    },
    {
      title: "BERA / ETH",
      bgt: 126.42,
    },
    {
      title: "HONEY / bHONEY",
      bgt: 126.42,
    },
  ];
  const incentives = [
    {
      title: "HONEY",
      amount: 126.42,
    },
    {
      title: "BERA",
      amount: 126.42,
    },
    {
      title: "HONEY",
      amount: 126.42,
    },
  ];

  return (
    <div className="flex gap-6 lg:flex-row flex-col">
      <div className="overflow-hidden relative w-full rounded-md border border-yellow-400 bg-yellow-100 bg-opacity-5 px-4 py-3">
        <div className="text-xs leading-[14px] text-muted-foreground">
          Claimable BGT
        </div>
        <div className="mt-2 flex items-center gap-1 text-3xl font-semibold leading-9">
          469.69 BGT
          <Icons.bgt className="h-8 w-8" />
        </div>
        <div className="leading-4 text-muted-foreground">$26,997.49</div>
        <div className="mt-6 flex flex-col gap-1 relative z-10">
          <div className="text-xs leading-5 text-muted-foreground">
            Gauges Earning you BGT:
          </div>
          {gauges.map((gauge, index) => (
            <div
              className="flex h-6 w-fit items-center gap-1 rounded-full border border-border bg-background px-2"
              key={`gauge-${index}-${gauge}`}
            >
              {/* <TokenIconList size="md" tokenList={[]} /> */}
              <Icons.honey className="h-4 w-4" />
              <span className="text-xs">{gauge.title} </span>
              <span className="text-[10px] text-muted-foreground">
                BGT Earning: {gauge.bgt}
              </span>
            </div>
          ))}
        </div>
        <Image
          src={`${cloudinaryUrl}/BGT/jv9zzejriofscplizebh`}
          width={200}
          height={200}
          className="absolute bottom-0 right-0 z-0"
          alt={"gauge-icon"}
        />
      </div>

      <div className="overflow-hidden relative w-full rounded-md border border-yellow-400 bg-yellow-100 bg-opacity-5 px-4 py-3">
        <div className="text-xs leading-[14px] text-muted-foreground">
          Claimable Incentives
        </div>
        <div className="mt-2 flex items-center gap-1 text-3xl font-semibold leading-9">
          $420.69K <TokenIconList size="xl" tokenList={[]} />
        </div>
        <div className="leading-4 text-muted-foreground">12 Tokens</div>
        <div className="mt-6 flex flex-col gap-1 relative z-10">
          <div className="text-xs leading-5 text-muted-foreground">
            Incentives You’ve Earned:
          </div>
          {incentives.map((incentive, index) => (
            <div
              className="flex h-6 w-fit items-center gap-1 rounded-full border border-border bg-background px-2"
              key={`incentive-${index}-${incentive}`}
            >
              {/* <TokenIconList size="md" tokenList={[]} /> */}
              <Icons.bgt className="h-4 w-4" />
              <span className="text-xs">{incentive.title} </span>
              <span className="text-[10px] text-muted-foreground">
                {incentive.amount}
              </span>
            </div>
          ))}
        </div>
        <Image
          src={`${cloudinaryUrl}/BGT/ajb0q68nv5gcv7e5woaw`}
          width={200}
          height={200}
          className="absolute bottom-0 right-0 z-0"
          alt={"gauge-icon"}
        />
      </div>

      <div className="overflow-hidden relative w-full rounded-md border border-yellow-400 bg-yellow-100 bg-opacity-5 px-4 py-3">
        <div className="text-xs leading-[14px] text-muted-foreground">
          Claimable HONEY
        </div>
        <div className="mt-2 flex items-center gap-1 text-3xl font-semibold leading-9">
          420.69K <Icons.honey className="w-6 h-6" />
        </div>
        <div className="leading-4 text-muted-foreground">$420.96</div>
        <div className="mt-6 flex flex-col gap-1 relative z-10">
          <div className="text-xs leading-5 text-muted-foreground">
            Incentives You’ve Earned:
          </div>
          {incentives.map((incentive, index) => (
            <div
              className="flex h-6 w-fit items-center gap-1 rounded-full border border-border bg-background px-2"
              key={`incentive-${index}-${incentive}-2`}
            >
              <Icons.bgt className="h-4 w-4" />
              <span className="text-xs">{incentive.title} </span>
              <span className="text-[10px] text-muted-foreground">
                {incentive.amount}
              </span>
            </div>
          ))}
        </div>
        <Image
          src={`${cloudinaryUrl}/BGT/ajb0q68nv5gcv7e5woaw`}
          width={200}
          height={200}
          className="absolute bottom-0 right-0 z-0"
          alt={"gauge-icon"}
        />
      </div>
    </div>
  );
};
