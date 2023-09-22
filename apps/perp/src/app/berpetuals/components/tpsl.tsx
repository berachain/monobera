import { useEffect, useState } from "react";
import { cn } from "@bera/ui";
import { Input } from "@bera/ui/input";

const InputSelect = ({
  bracket,
  onValueChange,
  variant = "success",
}: {
  bracket: [number, number, number, number];
  onValueChange: (percenatge: number | undefined) => void;
  variant: "success" | "destructive";
}) => {
  const [percenatge, setPercenatge] = useState<number | undefined>(undefined);
  useEffect(() => {
    onValueChange(percenatge);
  }, [percenatge]);
  return (
    <div className="flex w-full gap-1">
      <Input
        className="h-8 w-full rounded-lg bg-background text-xs lg:w-[102px]"
        placeholder="Amount"
        value={percenatge}
        onChange={(e) =>
          setPercenatge(
            Number(e.target.value) === 0 ? undefined : Number(e.target.value),
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
          {amount}%
        </div>
      ))}
    </div>
  );
};

export function TPSL({
  tpslOnChange,
  className,
}: {
  tpslOnChange?: ({
    tp,
    sl,
  }: {
    tp: number | undefined;
    sl: number | undefined;
  }) => void;
  className?: string;
}) {
  const [tpsl, setTpsl] = useState<{
    tp: number | undefined;
    sl: number | undefined;
  }>({ tp: undefined, sl: undefined });
  useEffect(() => {
    tpslOnChange?.(tpsl);
  }, [tpsl]);
  return (
    <div className={className}>
      <div className="mb-2 text-xs font-medium">Take Profit</div>
      <InputSelect
        bracket={[25, 50, 100, 150]}
        onValueChange={(percenatge: number | undefined) =>
          setTpsl({ tp: percenatge, sl: tpsl.sl })
        }
        variant="success"
      />
      <div className="mb-2 mt-4 text-xs font-medium">Stop Loss</div>
      <InputSelect
        bracket={[5, 10, 15, 25]}
        onValueChange={(percenatge: number | undefined) =>
          setTpsl({ tp: tpsl.tp, sl: percenatge })
        }
        variant="destructive"
      />
    </div>
  );
}
