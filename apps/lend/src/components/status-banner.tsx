import { formatUsd, formatter } from "@bera/berajs";
import { Icons } from "@bera/ui/icons";
import { formatEther } from "viem";

import { usePollUserAccountData } from "~/hooks/usePollUserAccountData";

export default function StatusBanner() {
  const { useUserAccountData } = usePollUserAccountData();
  const { data, isLoading } = useUserAccountData();

  const status = [
    {
      icon: <Icons.wallet className="h-8 w-8" />,
      title: "Total Sypplied",
      amount: formatUsd(Number(formatEther(data?.totalCollateralBase || "0"))),
    },
    {
      icon: <Icons.lineChart className="h-8 w-8" />,
      title: "Net APY",
      amount: "??.43%",
    },
    {
      icon: <Icons.warning className="h-8 w-8" />,
      title: "Account Health",
      amount: formatter.format(Number(formatEther(data?.healthFactor || "0"))),
    },
  ];
  const info = [
    {
      title: "You can Borrow Upto",
      amount: "$269.69m",
    },
    {
      title: "Funds Eligible for deposit",
      amount: "$420.69m",
    },
  ];

  return (
    <>
      {isLoading ? (
        <div>LOADING</div>
      ) : (
        <div className="border-boder flex w-full flex-col justify-between gap-8 rounded-18 border bg-muted p-4 md:flex-row ">
          <div className="flex flex-col gap-8 md:flex-row ">
            {status.map((item, index) => (
              <div key={index + item.title} className="flex w-fit gap-4">
                <div className="w-fit rounded-lg border p-2 text-muted-foreground">
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <div className="text-sm font-normal leading-normal text-muted-foreground">
                    {item.title}
                  </div>
                  <div className="h-6 text-xl font-semibold md:text-2xl">
                    {item.amount}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 md:hidden">
            {info.map((item, index) => (
              <div key={index + item.title} className="flex flex-col">
                <div className="text-sm font-normal leading-normal text-muted-foreground">
                  {item.title}
                </div>
                <div className="h-6 w-full text-left text-lg font-semibold xl:text-right">
                  {item.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
