export const getSafeNumber = (value: string | undefined): number => {
  if (!value) return 0;
  return Number(value) > Number.MAX_SAFE_INTEGER
    ? Number.MAX_SAFE_INTEGER
    : Number(value) ?? 0;
};
