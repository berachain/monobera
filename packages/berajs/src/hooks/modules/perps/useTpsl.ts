import BigNumber from "bignumber.js";
import { useCallback, useEffect, useState } from "react";
import { usePrevious } from "../../usePrevious";

function atLeastZero(value: string | BigNumber): string {
  return BigNumber(value).lt(0) ? "0" : value.toString(10);
}

type CommonProps = {
  long: boolean;
  leverage: string;
  optionType?: string;
  assetPrice: string;
};
export type useTpslProps = {
  tp: string;
  sl: string;
  maxTpPercent: string;
  maxSlPercent: string;
  onChangeTp: (tp: string) => void;
  onChangeSl: (sl: string) => void;
} & CommonProps;

export type useTpslReturn = {
  setTpPercent: (percent: string) => void;
  setSlPercent: (percent: string) => void;
  tpPercent: string;
  slPercent: string;
  sanitizedTpPercent: string;
  sanitizedSlPercent: string;
  dynamicMaxTpPercent: string;
};

const useValueOrPercentage = ({
  value,
  setValue,
  maxPercentage,
  long,
  leverage,
  assetPrice,
  isNegative,
}: {
  value: string;
  setValue: (value: string) => void;
  maxPercentage: string;
  isNegative: boolean;
} & CommonProps): [string, (v: string) => void, string, string] => {
  const [percent, setPercent] = useState(value ? "" : maxPercentage);
  const [maxTpPercentage, setMaxPercentage] = useState("");

  const onChangePercentage = useCallback(
    (percent: string) => {
      setPercent(percent);

      const sanitizedPercentage = isNegative
        ? Math.max(Number(maxPercentage), Number(percent)).toString()
        : Math.min(Number(maxPercentage), Number(percent)).toString();

      setValue(
        atLeastZero(
          getPriceFromPercent(long, sanitizedPercentage, leverage, assetPrice),
        ),
      );
    },
    [setValue, long, leverage, assetPrice],
  );

  useEffect(() => {
    if (long) {
      setMaxPercentage("");
      return;
    }
    if (leverage === "0" || leverage === "") {
      setMaxPercentage("");
    }

    const perc = getPercentageFromPrice(
      long,
      "0",
      leverage,
      // This is set to 1 because it doesn't matter the price
      // this increases the performance by avoiding useless re-renders
      "1",
    );
    if (perc.isFinite()) {
      setMaxPercentage(
        Math.min(Number(maxPercentage), Math.round(perc.toNumber())).toString(),
      );
    }
  }, [leverage, long]);

  useEffect(() => {
    if (percent && percent !== "") {
      onChangePercentage(percent);
    }
  }, [assetPrice, percent, leverage, long]);

  let realPercentage = "";

  if (value && value !== "") {
    /**
     * A minimum value of 1e-16 is set to detect when it overflows bounds on FE
     */
    if (isNegative) {
      realPercentage = Math.min(
        1e-16,
        Math.max(
          Math.round(
            Number(getPercentageFromPrice(long, value, leverage, assetPrice)) *
              1e2,
          ) / 1e2,
          Number(maxPercentage) - 1e-16,
        ),
      ).toString();
    } else {
      realPercentage = Math.max(
        -1e-16,
        Math.min(
          Math.round(
            Number(getPercentageFromPrice(long, value, leverage, assetPrice)) *
              1e2,
          ) / 1e2,
          Number(maxPercentage) + 1e-16,
        ),
      ).toString();
    }
  }

  return [percent, onChangePercentage, realPercentage, maxTpPercentage];
};

/**
 * TODO: handle tpsl value infinite
 * TODO: handle no asset price yet or no leverage
 * TODO: handle isUpdate
 */
export function useTpsl({
  tp,
  sl,
  long,
  optionType,
  assetPrice,
  leverage,
  maxSlPercent,
  maxTpPercent,
  onChangeTp,
  onChangeSl,
}: useTpslProps): useTpslReturn {
  const previousLeverage = usePrevious(leverage);

  const [
    tpPercent,
    setTpPercent,
    sanitizedTpPercent,
    maxPercentageGivenStrategy,
  ] = useValueOrPercentage({
    value: tp,
    maxPercentage: maxTpPercent,
    setValue: onChangeTp,
    assetPrice,
    leverage,
    long,
    isNegative: false,
    optionType,
  });

  const [slPercent, setSlPercent, sanitizedSlPercent] = useValueOrPercentage({
    value: sl,
    maxPercentage: maxSlPercent,
    setValue: onChangeSl,
    assetPrice,
    leverage,
    long,
    isNegative: true,
    optionType,
  });

  const reset = useCallback(() => {
    setTpPercent("");
    setSlPercent("");
    onChangeTp("");
    onChangeSl("");
  }, [setTpPercent, setSlPercent, onChangeTp, onChangeSl]);

  useEffect(() => {
    if (leverage !== previousLeverage && BigNumber(leverage).lt(2)) {
      reset();
    }
  }, [reset, leverage, previousLeverage]);

  return {
    tpPercent,
    slPercent,
    dynamicMaxTpPercent: maxPercentageGivenStrategy,
    sanitizedTpPercent,
    sanitizedSlPercent,
    setTpPercent,
    setSlPercent,
  };
}

export const getPriceFromPercent = (
  long: boolean,
  percentage: string,
  safeLeverage: string,
  formattedPrice: string,
) => {
  const percentageBN = BigNumber(percentage ?? "0");
  const safeLeverageBN = BigNumber(safeLeverage);
  const formattedPriceBN = BigNumber(formattedPrice);
  const oneBN = BigNumber(1);
  const hundredBN = BigNumber(100);

  if (long) {
    return oneBN
      .plus(percentageBN.div(hundredBN.times(safeLeverageBN)))
      .times(formattedPriceBN);
  }
  return oneBN
    .minus(percentageBN.div(hundredBN.times(safeLeverageBN)))
    .times(formattedPriceBN);
};

export const getPercentageFromPrice = (
  long: boolean,
  tpslPrice: string,
  safeLeverage: string,
  assetPrice: string,
) => {
  const priceBN = BigNumber(tpslPrice);
  const safeLeverageBN = BigNumber(safeLeverage);
  const formattedPriceBN = BigNumber(assetPrice);
  const oneBN = BigNumber(1);
  const hundredBN = BigNumber(100);

  if (long) {
    return priceBN
      .div(formattedPriceBN)
      .minus(oneBN)
      .times(safeLeverageBN.times(hundredBN));
  }
  return oneBN
    .minus(priceBN.div(formattedPriceBN))
    .times(safeLeverageBN.times(hundredBN));
};
