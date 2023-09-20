import { Input } from "@bera/ui/input";

export function CustomizeInput({
  value,
  onChange,
  endAdornment,
  title,
  subTitle,
}: {
  value?: number | undefined;
  onChange?: (value: number | undefined) => void;
  endAdornment?: any;
  title?: any;
  subTitle?: any;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-muted p-4">
      <div className="flex justify-between text-xs text-muted-foreground">
        <div>{title}</div> <div>{subTitle}</div>
      </div>
      <Input
        type="number"
        className="h-7 w-full rounded-none border-none p-0 text-lg font-semibold text-foreground"
        placeholder="0.00"
        endAdornment={endAdornment}
        value={value}
        onChange={(e) =>
          onChange?.(
            Number(e.target.value) === 0 ? undefined : Number(e.target.value),
          )
        }
      />
    </div>
  );
}
