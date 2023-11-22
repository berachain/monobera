export const getLTVColor = (ltv: number) => {
  if (ltv < 1.1) {
    return "destructive-foreground";
  } else if (ltv < 3) {
    return "warning-foreground";
  } else {
    return "success-foreground";
  }
};

export const getLTVSpace = (ltv: number) => {
  if (ltv <= 1) {
    return "pl-7";
  } else if (ltv < 1.1) {
    return "pl-9";
  } else if (ltv < 3) {
    return "flex justify-center";
  } else if (ltv < 20) {
    return "flex justify-end pr-9 ";
  } else {
    return "flex justify-end";
  }
};
