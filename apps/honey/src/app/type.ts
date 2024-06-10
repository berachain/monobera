export type HoneyEntry = {
  timestamp: number;
  amount: string;
};

export type HoneyVolume = {
  honeyVolume: HoneyEntry[];
};

export type HoneySupply = {
  honeyTotalSupply: HoneyEntry[];
};

export enum HoneyTimeFrame {
  HOURLY = "24H",
  WEEKLY = "7D",
  MONTHLY = "30D",
  QUARTERLY = "90D",
}

export type TimeFrameInSeconds = {
  [K in HoneyTimeFrame]: number;
};

export const timeFrameToNumber: TimeFrameInSeconds = {
  [HoneyTimeFrame.HOURLY]: 24 * 3600,
  [HoneyTimeFrame.WEEKLY]: 7 * 24 * 3600,
  [HoneyTimeFrame.MONTHLY]: 30 * 24 * 3600,
  [HoneyTimeFrame.QUARTERLY]: 90 * 24 * 3600,
};

export const barColors = {
  arcade: "#65BAE6",
  arcadeHover: "#0284C7",
  pro: "#4F4946",
  proHover: "#0E0803",
};
