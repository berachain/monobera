import { useEffect, useState } from "react";
import { cn } from "@bera/ui";
import { Input } from "@bera/ui/input";

const InputSelect = ({
  bracket,
  onValueChange,
  variant = "success",
}: {
  bracket: [number, number, number, number, number];
  onValueChange: (percenatge: number) => void;
  variant: "success" | "destructive";
}) => {
  const [percenatge, setPercenatge] = useState<number>(0);
  useEffect(() => {
    onValueChange(percenatge);
  }, [percenatge]);
  return (
    <div className="flex w-full gap-1">
      <Input
        className="h-8 w-full rounded-lg bg-background text-xs lg:w-[102px]"
        placeholder="Amount"
        type={percenatge === 0 ? "text" : "number"}
        value={percenatge === 0 ? "none" : percenatge}
        onChange={(e) =>
          setPercenatge(
            Number(e.target.value) === 0 ? 0 : Number(e.target.value),
          )
        }
        endAdornment="%"
      />
      {bracket.map((amount: number, index: number) => (
        <div
          key={index}
          className={cn(
            "inline-flex h-8 w-[20%] cursor-pointer items-center justify-center rounded-lg px-2 text-xs font-medium lg:w-full",
            amount === percenatge
              ? `bg-${variant} text-${variant}-foreground`
              : `bg-muted text-muted-foreground`,
          )}
          onClick={() => setPercenatge(amount)}
        >
          {amount === 0 ? "None" : `${amount}%`}
        </div>
      ))}
    </div>
  );
};

export function TPSL({
  tpslOnChange,
  className,
}: {
  tpslOnChange?: ({ tp, sl }: { tp: number; sl: number }) => void;
  className?: string;
}) {
  const [tpsl, setTpsl] = useState<{
    tp: number;
    sl: number;
  }>({ tp: 0, sl: 0 });
  useEffect(() => {
    tpslOnChange?.(tpsl);
  }, [tpsl]);
  return (
    <div className={className}>
      <div className="mb-2 text-xs font-medium">Take Profit</div>
      <InputSelect
        bracket={[0, 25, 50, 100, 150]}
        onValueChange={(percenatge: number) =>
          setTpsl({ tp: percenatge, sl: tpsl.sl })
        }
        variant="success"
      />
      <div className="mb-2 mt-4 text-xs font-medium">Stop Loss</div>
      <InputSelect
        bracket={[0, 5, 10, 15, 25]}
        onValueChange={(percenatge: number) =>
          setTpsl({ tp: tpsl.tp, sl: percenatge })
        }
        variant="destructive"
      />
    </div>
  );
}
