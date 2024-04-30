import * as React from "react";
import { cn } from "@bera/ui";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@bera/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@bera/ui/popover";
import { Separator } from "@bera/ui/separator";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, ChevronDown, XCircle, XIcon } from "lucide-react";

const multiSelectVariants = cva(
  "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
  {
    variants: {
      variant: {
        default:
          "border-foreground/10 drop-shadow-md text-foreground bg-card hover:bg-card/80",
        secondary:
          "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        inverted: "inverted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface MultiSelectFormFieldProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  asChild?: boolean;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  defaultValue?: string[];
  disabled?: boolean;
  placeholder: string;
  className?: string;
  animation?: number;
  onValueChange: (value: string[]) => void;
  numberOfProjects?: number;
}

const MultiSelectFormField = React.forwardRef<
  HTMLButtonElement,
  MultiSelectFormFieldProps
>(
  (
    {
      className,
      variant,
      asChild = false,
      options,
      defaultValue,
      onValueChange,
      disabled,
      placeholder,
      numberOfProjects,
      animation = 0,
      ...props
    },
    ref,
  ) => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(
      defaultValue || [],
    );
    const selectedValuesSet = React.useRef(new Set(selectedValues));
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    React.useEffect(() => {
      setSelectedValues(defaultValue || []);
      selectedValuesSet.current = new Set(defaultValue);
    }, [defaultValue]);

    const handleInputKeyDown = (event: any) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.target.value) {
        selectedValues.pop();
        setSelectedValues([...selectedValues]);
        const lastValue = selectedValues[selectedValues.length - 1];
        if (lastValue !== undefined) {
          selectedValuesSet.current.delete(lastValue);
          onValueChange([...selectedValues]);
        }
      }
    };

    const toggleOption = (value: string) => {
      if (selectedValuesSet.current.has(value)) {
        selectedValuesSet.current.delete(value);
        setSelectedValues(selectedValues.filter((v) => v !== value));
      } else {
        selectedValuesSet.current.add(value);
        setSelectedValues([...selectedValues, value]);
      }
      onValueChange([...selectedValuesSet.current]);
    };
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              {...props}
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              className="flex h-auto min-h-10 w-full items-center justify-between rounded-md border bg-inherit hover:bg-card"
            >
              <div className="mx-auto flex w-full items-center justify-between">
                <span className="text-sm font-normal text-muted-foreground">
                  {placeholder}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <XIcon
                  className="mx-2 h-4 cursor-pointer text-muted-foreground"
                  onClick={(event) => {
                    setSelectedValues([]);
                    selectedValuesSet.current.clear();
                    onValueChange([]);
                    event.stopPropagation();
                  }}
                />
                <Separator
                  orientation="vertical"
                  className="flex h-full min-h-6"
                />
                <ChevronDown className="mx-2 h-4 cursor-pointer text-muted-foreground" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[200px] p-0 drop-shadow-sm"
            align="start"
            onEscapeKeyDown={() => setIsPopoverOpen(false)}
            onInteractOutside={(event) => {
              if (!event.defaultPrevented) {
                setIsPopoverOpen(false);
              }
            }}
          >
            <Command>
              <CommandInput
                placeholder="Search..."
                onKeyDown={handleInputKeyDown}
              />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => {
                    const isSelected = selectedValuesSet.current.has(
                      option.value,
                    );
                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() => toggleOption(option.value)}
                        style={{
                          pointerEvents: "auto",
                          opacity: 1,
                        }}
                        className="cursor-pointer"
                      >
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible",
                          )}
                        >
                          <CheckIcon className="h-4 w-4" />
                        </div>
                        {option.icon && (
                          <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                        )}
                        <span>{option.label}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup>
                  <div className="flex items-center justify-between">
                    {selectedValues.length > 0 && (
                      <>
                        <CommandItem
                          onSelect={() => {
                            setSelectedValues([]);
                            selectedValuesSet.current.clear();
                            onValueChange([]);
                          }}
                          style={{
                            pointerEvents: "auto",
                            opacity: 1,
                          }}
                          className="flex-1 cursor-pointer justify-center"
                        >
                          Clear
                        </CommandItem>
                        <Separator
                          orientation="vertical"
                          className="flex h-full min-h-6"
                        />
                      </>
                    )}
                    <CommandSeparator />
                    <CommandItem
                      onSelect={() => setIsPopoverOpen(false)}
                      style={{
                        pointerEvents: "auto",
                        opacity: 1,
                      }}
                      className="flex-1 cursor-pointer justify-center"
                    >
                      Close
                    </CommandItem>
                  </div>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {selectedValues.length > 0 && (
          <div className="flex w-full flex-row flex-wrap items-center gap-2">
            <div className="font-semibold">
              {numberOfProjects} Projects filtered by:
            </div>
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-wrap items-center">
                {selectedValues.map((value) => {
                  const option = options.find((o) => o.value === value);
                  const IconComponent = option?.icon;
                  return (
                    <Badge
                      key={value}
                      className={cn(
                        multiSelectVariants({ variant, className }),
                      )}
                      style={{
                        animationDuration: `${animation}s`,
                      }}
                    >
                      {IconComponent && (
                        <IconComponent className="mr-2 h-4 w-4" />
                      )}
                      {option?.label}
                      <XCircle
                        className="ml-2 h-4 w-4 cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleOption(value);
                        }}
                      />
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
);

MultiSelectFormField.displayName = "MultiSelectFormField";

export default MultiSelectFormField;
