import { useRouter } from "next/navigation";
import { usePollActiveValidators, type Validator } from "@bera/berajs";
import { IconList, Tooltip } from "@bera/shared-ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { formatEther } from "viem";

export default function ValidatorCard(validator: { validator: Validator }) {
  const router = useRouter();
  const { useTotalDelegated } = usePollActiveValidators();
  const totalDelegated: number = useTotalDelegated();

  const valiInfo = [
    {
      title: (
        <div>
          BGT Delegated <Tooltip text="hi" />
        </div>
      ),
      value: `${
        Number(formatEther(validator.validator.delegatorShares)) * 100
      }`,
    },
    {
      title: (
        <div>
          Voting power <Tooltip text="hi" />
        </div>
      ),
      value: `${(
        (Number(formatEther(validator.validator.delegatorShares)) * 100) /
        totalDelegated
      ).toFixed(2)}%`,
    },
    {
      title: (
        <div>
          Commision <Tooltip text="hi" />
        </div>
      ),
      value: `${(
        Number(
          formatEther(validator.validator.commission.commissionRates.rate),
        ) * 100
      ).toFixed(2)}%`,
    },
    {
      title: (
        <div>
          vAPY <Tooltip text="hi" />
        </div>
      ),
      value: "6.9%",
    },
  ];

  return (
    <Card className="p-6 ">
      <div className="flex items-center justify-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="font-bold">
              validator avatar
            </AvatarFallback>
          </Avatar>
          <div className="text-lg font-semibold leading-loose text-foreground sm:text-2xl">
            {validator.validator.description.moniker}
          </div>
        </div>
        <div className="hidden items-center gap-4 sm:flex">
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              router.push(
                `/delegate?action=delegate&&validator=${validator.validator.operatorAddress}`,
              )
            }
          >
            Delegate <Icons.add className="relative ml-1 h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              router.push(
                `/delegate?action=redelegate&&validator=${validator.validator.operatorAddress}`,
              )
            }
          >
            Redelegate <Icons.redo className="relative ml-1 h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              router.push(
                `/delegate?action=unbond&&validator=${validator.validator.operatorAddress}`,
              )
            }
          >
            Unbond <Icons.minus className="relative ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex w-full flex-col items-center sm:flex-row sm:gap-4">
          {valiInfo.map((item, index) => (
            <div
              className="flex w-full items-center justify-between gap-1 py-1 sm:w-fit sm:flex-col sm:justify-center sm:px-4 sm:py-2"
              key={index}
            >
              <div className="w-full text-xs font-medium leading-tight text-muted-foreground">
                {item.title}
              </div>
              <div className="text-left text-base font-medium leading-normal sm:w-full">
                {item.value}
              </div>
            </div>
          ))}
        </div>
        <div className="mr-4 flex items-center gap-4">
          <IconList
            size={48}
            iconList={[
              "/icons/eth-icons.svg",
              "/icons/atom-icons.svg",
              "/icons/usdc-icons.svg",
              "/icons/usdt-icons.svg",
              "/icons/btc-icons.svg",
              "/icons/honey-icons.svg",
              "/icons/bera-icons.svg",
            ]}
          />
        </div>
        <div className="flex items-center justify-center gap-4 sm:hidden">
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              router.push(
                `/delegate?action=delegate&&validator=${validator.validator.operatorAddress}`,
              )
            }
          >
            <Icons.add className="relative h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              router.push(
                `/delegate?action=redelegate&&validator=${validator.validator.operatorAddress}`,
              )
            }
          >
            <Icons.redo className="relative h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              router.push(
                `/delegate?action=unbond&&validator=${validator.validator.operatorAddress}`,
              )
            }
          >
            <Icons.minus className="relative h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
