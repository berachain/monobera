import { cn } from "@bera/ui";
import { BigNumber } from "bignumber.js";

interface CompactNumberProps {
  value: string | number;
  visibleDecimals?: number;
  roundDown?: boolean;
  compactThreshold?: number;
}

const POSTFIXES = ["", "K", "M", "B", "T", "P", "E", "Z", "Y"];

export type BigNumberValue = string | number | BigNumber;

export function valueToBigNumber(amount: BigNumberValue): BigNumber {
  if (amount instanceof BigNumber) return amount;
  return new BigNumber(amount);
}

export function normalizeBN(n: BigNumberValue, decimals: number): BigNumber {
  return valueToBigNumber(n).shiftedBy(decimals * -1);
}

export const compactNumber = ({
  value,
  visibleDecimals = 2,
  roundDown,
  compactThreshold,
}: CompactNumberProps) => {
  const bnValue = valueToBigNumber(value);

  let integerPlaces = bnValue.toFixed(0).length;
  if (compactThreshold && Number(value) <= compactThreshold) {
    integerPlaces = 0;
  }
  const significantDigitsGroup = Math.min(
    Math.floor(integerPlaces ? (integerPlaces - 1) / 3 : 0),
    POSTFIXES.length - 1,
  );
  const postfix = POSTFIXES[significantDigitsGroup];
  let formattedValue = normalizeBN(
    bnValue,
    3 * significantDigitsGroup,
  ).toNumber();
  if (roundDown) {
    // Truncates decimals after the visible decimal point, i.e. 10.237 with 2 decimals becomes 10.23
    formattedValue =
      Math.trunc(Number(formattedValue) * 10 ** visibleDecimals) /
      10 ** visibleDecimals;
  }
  const prefix = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: visibleDecimals,
    minimumFractionDigits: visibleDecimals,
  }).format(formattedValue);

  return { prefix, postfix };
};

function CompactNumber({
  value,
  visibleDecimals,
  roundDown,
}: CompactNumberProps) {
  const { prefix, postfix } = compactNumber({
    value,
    visibleDecimals,
    roundDown,
  });

  return (
    <>
      {prefix}
      {postfix}
    </>
  );
}

export function FormattedNumber({
  value,
  visibleDecimals = 2,
  symbol,
  compact = true,
  percent,
  colored = false,
  roundDown = false,
  compactThreshold,
  className,
  ...props
}: {
  value: BigNumberValue;
  visibleDecimals?: number;
  compact?: boolean; //'compact' | 'full'
  symbol?: string; // if 'usd' then show $ symbol
  percent?: boolean;
  colored?: boolean; // smol than 0 red, big than 0 green, 0 stays default
  roundDown?: boolean;
  compactThreshold?: number; //function serves to determine when a number should be presented in its compact form (with postfixes like K, M, B for thousands, millions, billions, etc.)
  className?: string;
}) {
  const number = percent ? Number(value) * 100 : Number(value);

  let decimals: number = visibleDecimals ?? 0;
  if (number === 0) {
    decimals = 0;
  } else if (visibleDecimals === undefined) {
    if (number > 1 || percent || symbol === "USD") {
      decimals = 2;
    } else {
      decimals = 7;
    }
  }

  const minValue = 10 ** -(decimals as number);
  const isSmallerThanMin =
    number !== 0 && Math.abs(number) < Math.abs(minValue);
  let formattedNumber = isSmallerThanMin ? minValue : number;
  const forceCompact =
    (compactThreshold && number > compactThreshold) || compact;
  // rounding occurs inside of CompactNumber as the prefix, not base number is rounded
  if (roundDown && !forceCompact) {
    formattedNumber =
      Math.trunc(Number(formattedNumber) * 10 ** decimals) / 10 ** decimals;
  }

  return (
    <div
      className={cn(
        "relative flex inline-flex flex-row items-center text-nowrap",
        className,
        number > 0
          ? "text-success-foreground"
          : number < 0
            ? "text-destructive-foreground"
            : "",
      )}
      {...props}
    >
      {isSmallerThanMin && <span className="mr-0.5">{"<"}</span>}
      {symbol?.toLowerCase() === "usd" && !percent && (
        <span className="mr-0.5">$</span>
      )}
      {!forceCompact ? (
        new Intl.NumberFormat("en-US", {
          maximumFractionDigits: decimals,
          minimumFractionDigits: decimals,
        }).format(formattedNumber)
      ) : (
        <CompactNumber
          value={formattedNumber}
          visibleDecimals={decimals}
          roundDown={roundDown}
          // this is not been used, copied from aave, but wanna keep it in case it get useful someday ;p
          compactThreshold={compactThreshold}
        />
      )}
      {percent && <span className="ml-0.5">%</span>}
      {symbol?.toLowerCase() !== "usd" && typeof symbol !== "undefined" && (
        <span className="ml-0.5">{symbol}</span>
      )}
    </div>
  );
}
