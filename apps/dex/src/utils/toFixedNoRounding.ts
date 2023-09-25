export function toFixedNoRounding(n: number, p: number): number {
  let result = Number(n.toFixed(p));
  result =
    Math.abs(result) <= Math.abs(n)
      ? result
      : Number((result - Math.sign(n) * Math.pow(0.1, p)).toFixed(p));

  // if you want negative zeros (-0.00), use this instead:
  // return result;

  // fixes negative zeros:
  if (result == 0) return 0;
  else return result;
}
