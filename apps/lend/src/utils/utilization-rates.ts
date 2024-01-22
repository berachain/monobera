//https://docs.aave.com/risk/liquidity-risk/borrow-interest-rate#rate-strategy-stable-two

export const OPTIMAL_USAGE_RATE = 0.9;
export const BASE_VARIABLE_BORROW_RATE = 0;
export const VARIABLE_RATE_SLOPE_1 = 0.04;
export const VARIABLE_RATE_SLOPE_2 = 0.6;
export const BASE_STABLE_BORROW_RATE = 0.02;
export const STABLE_RATE_SLOPE_1 = 0.005;
export const STABLE_RATE_SLOPE_2 = 0.6;
// export const OPTIMAL_STABLE_TO_TOTAL_DEBT_RATIO = 0.2;

const resolution = 100;
const step = 100 / resolution;

export type Rate = {
  stableRate: number;
  variableRate: number;
  utilization: number;
};

export function getRates(): Rate[] {
  const rates: Rate[] = [];

  for (let i = 0; i <= resolution; i++) {
    const utilization = (i * step) / 100;
    // When zero
    if (utilization === 0) {
      rates.push({
        stableRate: 0,
        variableRate: 0,
        utilization,
      });
    }
    // When hovering below optimal utilization rate, actual data
    else if (utilization < OPTIMAL_USAGE_RATE) {
      const theoreticalStableAPY =
        BASE_STABLE_BORROW_RATE +
        (STABLE_RATE_SLOPE_1 * utilization) / OPTIMAL_USAGE_RATE;

      const theoreticalVariableAPY =
        BASE_VARIABLE_BORROW_RATE +
        (VARIABLE_RATE_SLOPE_1 * utilization) / OPTIMAL_USAGE_RATE;

      rates.push({
        stableRate: theoreticalStableAPY,
        variableRate: theoreticalVariableAPY,
        utilization,
      });
    }
    // When hovering above optimal utilization rate, hypothetical predictions
    else {
      const excess =
        (utilization - OPTIMAL_USAGE_RATE) / (1 - OPTIMAL_USAGE_RATE);

      const theoreticalStableAPY =
        BASE_STABLE_BORROW_RATE +
        STABLE_RATE_SLOPE_1 +
        STABLE_RATE_SLOPE_2 * excess;

      const theoreticalVariableAPY =
        BASE_VARIABLE_BORROW_RATE +
        VARIABLE_RATE_SLOPE_1 +
        VARIABLE_RATE_SLOPE_2 * excess;

      rates.push({
        stableRate: theoreticalStableAPY,
        variableRate: theoreticalVariableAPY,
        utilization,
      });
    }
  }
  return rates;
}
