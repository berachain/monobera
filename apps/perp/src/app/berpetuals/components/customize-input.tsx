import { cn } from "@bera/ui";
import { Input } from "@bera/ui/input";

export function CustomizeInput({
  value,
  onChange,
  endAdornment,
  title,
  disabled,
  subTitle,
  isExceeding = false,
  onSubtitleClick,
}: {
  value?: number | undefined;
  onChange?: (value: number | undefined) => void;
  endAdornment?: any;
  disabled?: boolean;
  isExceeding?: boolean;
  title?: any;
  subTitle?: any;
  onSubtitleClick?: () => void;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-muted p-4">
      <div className="flex h-3 items-center justify-between text-xs text-muted-foreground ">
        <div>{title}</div>{" "}
        <div
          className="hover:underline"
          onClick={() => onSubtitleClick && onSubtitleClick()}
        >
          {subTitle}
        </div>
      </div>
      <Input
        disabled={disabled}
        type="number"
        className={cn(
          "h-7 w-full rounded-none border-none bg-inherit p-0 text-lg font-semibold text-foreground",
          isExceeding && "text-destructive-foreground",
        )}
        placeholder="0.00"
        min={0}
        endAdornment={endAdornment}
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
      />
    </div>
  );
}
