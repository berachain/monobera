import { formatFromBaseUnit } from "./formatBigNumber";

const MAX_BORROWING_FEE_PERCENTAGE = "10000";

export const formatBorrowFee = (borrowFee: string | undefined, dp: number) => {
  let fee = formatFromBaseUnit(borrowFee ?? "0", 10).dp(dp);
  return fee.gt(MAX_BORROWING_FEE_PERCENTAGE)
    ? MAX_BORROWING_FEE_PERCENTAGE
    : fee.toString(10);
};
