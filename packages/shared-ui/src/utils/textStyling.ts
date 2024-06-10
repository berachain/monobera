export const getPriceImpactColorClass = (
  priceImpact: number | null | undefined,
) => {
  if (!priceImpact) return "";
  let result = "";
  if (priceImpact > 10) {
    result = "text-green-500";
  } else if (priceImpact > 5) {
    result = "text-green-400";
  } else if (priceImpact > 2) {
    result = "text-green-300";
  } else if (priceImpact > -3) {
    result = "text-neutral-400";
  } else if (priceImpact > -5) {
    result = "text-amber-300";
  } else if (priceImpact > -10) {
    result = "text-red-400";
  } else {
    result = "text-red-500";
  }
  return result;
};
