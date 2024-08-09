import { cn } from "@bera/ui";
import { CardTitle } from "@bera/ui/card";
import { SettingsPopover } from "./settings-popover";
import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
export const SwapCardHeader = ({
  isRedeem,
}: {
  isRedeem: boolean;
}) => {
  return (
    <CardTitle className={cn("center flex items-center justify-between mb-4")}>
      <div className="flex flex-col items-start justify-start">
        <span className="text-3xl font-semibold">
          {isRedeem ? "Redeem" : "Swap"}
        </span>
        <span className="font-normal text-muted-foreground mt-2">
          {isRedeem
            ? "Exchange your BGT for BERA at 1:1 ratio. "
            : "Swap your tokens."}
        </span>
      </div>
      {isRedeem ? (
        <Image
          src={`${cloudinaryUrl}/DEX/d7yi5pgfvjtoprlu4sdj`}
          alt={"redeem"}
          height={100}
          width={100}
        />
      ) : (
        <div className="justify-start self-start items-start mt-3">
          <SettingsPopover />
        </div>
      )}
    </CardTitle>
  );
};
