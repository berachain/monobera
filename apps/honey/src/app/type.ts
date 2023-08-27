export type HoneyEntry = {
  UTCTime: string;
  amount: string;
};

export type HoneyVolume = {
  honeyVolume: HoneyEntry[];
};

export type HoneySupply = {
  honeyTotalSupply: HoneyEntry[];
};
