import Image from "next/image";
import { useValidators } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { type Address } from "viem";

export const ValidatorIcon = ({
  address,
  className,
}: {
  address: Address;
  className?: string;
}) => {
  const validatorInfo = useValidators();
  const validatorImg = validatorInfo?.validatorDictionary
    ? validatorInfo?.validatorDictionary[address]?.logoURI
    : "";
  return (
    <Avatar className={cn("", className)}>
      <AvatarImage src={validatorImg} />
      <AvatarFallback className="font-bold">
        <Image
          src="/icons/validator-icon.png"
          width={100}
          height={100}
          className="h-full w-full"
          alt={"validator-icon"}
        />
      </AvatarFallback>
    </Avatar>
  );
};
