// import { usePollBgtSupply } from "@bera/berajs";

// import { Card, CardContent, CardHeader } from "@bera/ui/card";

import RT from "../../../components/react-table";
import { global_gauge_weight_columns } from "../columns/global-gauge-weight";

export default function GlobalGaugeWeight() {
  // const { useBgtSupply } = usePollBgtSupply();
  // const bgtSupply = useBgtSupply();
  // const validatorTableData = React.useMemo(() => {
  //   return validators
  //     .filter((validator) => !validator.jailed)
  //     .map((validator) => ({
  //       address: validator.operatorAddress,
  //       delegate: (
  //         <div
  //           className="w-[49px] hover:cursor-pointer"
  //           onClick={() => router.push("/delegate")}
  //         >
  //           <Icons.add className="relative mx-auto flex h-9 w-9 flex-col items-start justify-start rounded border border-border p-1" />
  //         </div>
  //       ),
  //       validator: (
  //         <div className="flex h-full w-[137px] items-center gap-1">
  //           <Avatar className="h-8 w-8">
  //             <AvatarImage src="https://github.com/shadcn.png" />
  //             <AvatarFallback>{validator.description.moniker}</AvatarFallback>
  //           </Avatar>
  //           {validator.description.moniker}
  //         </div>
  //       ),
  //       votingPower: (
  //         <div className="flex h-full w-[96px] items-center justify-center">
  //           {(
  //             (Number(formatUnits(validator.delegatorShares, 18)) * 100) /
  //             totalDelegated
  //           ).toFixed(2)}
  //           %
  //         </div>
  //       ),
  //       commission: (
  //         <div className="flex h-full w-[91px] items-center justify-center">
  //           {(
  //             Number(
  //               formatUnits(validator.commission.commissionRates.rate, 18),
  //             ) * 100
  //           ).toFixed(2)}
  //           %
  //         </div>
  //       ),
  //       vAPY: (
  //         <div className="flex h-full w-[67px] items-center justify-center">
  //           6.9%
  //         </div>
  //       ),
  //       mostWeightedGauge: (
  //         <div className="flex h-full w-[141px] items-center justify-center">
  //           Pool name or address
  //         </div>
  //       ),
  //       bribes: <div className="flex h-full w-[136px] items-center">hi</div>,
  //     }));
  // }, [validators, keyword]);

  return (
    <div>
      <div className="text-center text-5xl font-bold leading-[48px] text-foreground">
        🌎 Global gauge weight
      </div>
      <div className="mt-4 text-center text-xl font-semibold leading-7 text-muted-foreground">
        See what pools validators are incentivizing right now
      </div>
      <div className="mt-8 grid grid-cols-10 gap-4">
        <div className="col-span-4">30</div>
        <div className="col-span-6">
          <RT columns={global_gauge_weight_columns} data={[]} />
        </div>
      </div>
    </div>
  );
}
