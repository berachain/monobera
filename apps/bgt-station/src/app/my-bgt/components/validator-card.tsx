import { useRouter } from "next/navigation";
import { usePollActiveValidators, type Validator } from "@bera/berajs";
import { Tooltip } from "@bera/shared-ui";
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="font-bold">
              validator avatar
            </AvatarFallback>
          </Avatar>
          <div className="text-2xl font-semibold leading-loose text-foreground">
            {validator.validator.description.moniker}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            variant="secondary"
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
            variant="secondary"
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
            variant="secondary"
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
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {valiInfo.map((item, index) => (
            <div
              className="flex flex-col items-center gap-1 px-4 py-2"
              key={index}
            >
              <div className="text-xs font-medium leading-tight text-muted-foreground">
                {item.title}
              </div>
              <div className="w-full text-left text-base font-medium leading-normal">
                {item.value}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4">icon group</div>
      </div>
    </Card>
  );
}
