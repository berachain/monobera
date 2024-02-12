export const getLTVColor = (ltv: number) => {
  if (ltv < 0) {
    return "success-foreground";
  }
  if (ltv < 1.1) {
    return "destructive-foreground";
  }
  if (ltv < 3) {
    return "warning-foreground";
  }
  return "success-foreground";
};

export const getLTVSpace = (ltv: number) => {
  if (ltv <= 1) {
    return "pl-7";
  }
  if (ltv < 1.1) {
    return "pl-9";
  }
  if (ltv < 3) {
    return "flex justify-center";
  }
  if (ltv < 20) {
    return "flex justify-end pr-9 ";
  }
  return "flex justify-end";
};
