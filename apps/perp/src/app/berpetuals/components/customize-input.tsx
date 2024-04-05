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
  value?: string;
  onChange?: (value: string) => void;
  endAdornment?: any;
  disabled?: boolean;
  isExceeding?: boolean;
  title?: any;
  subTitle?: any;
  onSubtitleClick?: () => void;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-sm bg-muted p-4">
      <div className="flex h-3 items-center justify-between text-xs text-muted-foreground ">
        <div>{title}</div>{" "}
        <div
          className="ml-2 truncate hover:underline"
          onClick={() => onSubtitleClick?.()}
        >
          {subTitle}
        </div>
      </div>
      <div className="relative flex w-full">
        <Input
          disabled={disabled}
          type="number"
          className={cn(
            "h-7 flex-1 rounded-none border-none bg-inherit p-0 text-lg font-semibold text-foreground",
            isExceeding && "text-destructive-foreground",
          )}
          placeholder="0.00"
          min={0}
          value={value}
          onKeyDown={(e) =>
            (e.key === "-" || e.key === "e" || e.key === "E") &&
            e.preventDefault()
          }
          onChange={(e) => onChange?.(e.target.value)}
        />
        {endAdornment}
      </div>
    </div>
  );
}
